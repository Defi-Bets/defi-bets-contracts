import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import {
    DefiBetsManager__factory,
    DefiBetsPayoutRatio__factory,
    DefiBetsVault__factory,
    DefiBets__factory,
    ImpliedVolatilityOracle__factory,
    LiquidityPool__factory,
    MathLibraryDefibets__factory,
    MockV3Aggregator,
    MockV3Aggregator__factory,
} from "../typechain-types";
import { Block } from "@ethersproject/providers";

const slot = ethers.utils.parseEther("100");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const dateString = Date.now();
const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);
const priceAnswer = ethers.utils.parseEther("30000");
const feePpm = 20000; // 2% Fee
const MILLION = 1000000;
const maxWinMultiplier = 40; // maximum win of user can be this * amount
const maxLossPerTime = 50000;
const startPayoutFactor = 90;
const moduloDays = 30;
const targetPayoutRatio = 90;

describe("DefiBetsManager unit test", () => {
    async function deployDefiBetsManagerFixture() {
        const [deployer, user, lpStaker] = await ethers.getSigners();

        const ImpliedVolatilityOracle = (await ethers.getContractFactory(
            "ImpliedVolatilityOracle",
        )) as ImpliedVolatilityOracle__factory;

        const ivOracle = await ImpliedVolatilityOracle.deploy(4, "IV Oracle", 1, "BTC", 30 * 60 * 60 * 24);
        await ivOracle.updateAnswer(4601);

        const MathLibraryDefiBets = (await ethers.getContractFactory(
            "MathLibraryDefibets",
        )) as MathLibraryDefibets__factory;
        const mathLibraryDefiBets = await MathLibraryDefiBets.deploy();

        const DefiBetsManager = (await ethers.getContractFactory("DefiBetsManager", {
            libraries: {
                MathLibraryDefibets: mathLibraryDefiBets.address,
            },
        })) as DefiBetsManager__factory;
        const managerContract = await DefiBetsManager.deploy(feePpm, startPayoutFactor);

        const MockDUSD = await ethers.getContractFactory("MockDUSD");
        const mockDUSD = await MockDUSD.deploy();

        const DefiBets = (await ethers.getContractFactory("DefiBets")) as DefiBets__factory;
        const defiBets = await DefiBets.deploy("BTC", managerContract.address);

        const DefiBetsVault = (await ethers.getContractFactory("DefiBetsVault")) as DefiBetsVault__factory;
        const vault = await DefiBetsVault.deploy(managerContract.address, mockDUSD.address);

        const LiquidityPool = (await ethers.getContractFactory("LiquidityPool")) as LiquidityPool__factory;
        const liquidityPool = await LiquidityPool.deploy(
            managerContract.address,
            mockDUSD.address,
            vault.address,
            maxLossPerTime,
        );

        const PriceFeed = (await ethers.getContractFactory("MockV3Aggregator")) as MockV3Aggregator__factory;
        const priceFeed = await PriceFeed.deploy(8, priceAnswer);

        const now = (await ethers.provider.getBlock("latest")) as Block;
        const DefiBetsPayoutRatio = (await ethers.getContractFactory(
            "DefiBetsPayoutRatio",
        )) as DefiBetsPayoutRatio__factory;
        const defiBetsPayoutRatio = await DefiBetsPayoutRatio.deploy(
            managerContract.address,
            moduloDays,
            targetPayoutRatio,
            now.timestamp,
        );

        await managerContract.setAddresses(liquidityPool.address, defiBetsPayoutRatio.address);

        await managerContract.addUnderlyingToken("BTC", priceFeed.address, defiBets.address, vault.address);
        const underlyingHash = await managerContract.getUnderlyingByte("BTC");
        await managerContract.updateIVFeed(underlyingHash, ivOracle.address, 30 * 60 * 60 * 24);

        await managerContract.setFeesPpm(feePpm);

        const lpAmount = ethers.utils.parseEther("100000");
        await mockDUSD.connect(lpStaker).mint(lpStaker.address, lpAmount);
        await mockDUSD.connect(lpStaker).approve(liquidityPool.address, lpAmount);
        await managerContract.connect(lpStaker).provideLP(lpAmount);

        const hash = await managerContract.getUnderlyingByte("BTC");
        await managerContract
            .connect(deployer)
            .initializeBets(hash, startExpTime, minBetDuration, maxBetDuration, slot, maxWinMultiplier);

        return {
            deployer,
            user,
            lpStaker,
            managerContract,
            defiBets,
            mockDUSD,
            vault,
            liquidityPool,
            priceFeed,
            ivOracle,
            mathLibraryDefiBets,
        };
    }

    describe("#setFeesPpm", () => {
        it("Should set the fee to explicit percent", async () => {
            const { managerContract } = await loadFixture(deployDefiBetsManagerFixture);

            // set the fee to 4%
            const _newFee = 40000;

            await managerContract.setFeesPpm(_newFee);

            expect(await managerContract.feePpm()).to.be.equal(_newFee);
        });

        it("Should fail when the new fee is higher than the max allowed fee", async () => {
            const { managerContract } = await loadFixture(deployDefiBetsManagerFixture);

            const maxFee = await managerContract.MAX_FEE_PPM();

            await expect(managerContract.setFeesPpm(maxFee.mul(2))).to.be.revertedWithCustomError(
                managerContract,
                "DefiBetsManager__FeeNotAllowed",
            );
        });
    });

    describe("#calculateFee", () => {
        it("Should return the right amount in fee", async () => {
            const { managerContract } = await loadFixture(deployDefiBetsManagerFixture);

            const amount = ethers.utils.parseEther("100");

            expect(await managerContract.calculateFee(amount)).to.be.equal(amount.mul(feePpm).div(1000000));
        });

        it("Should return zero if the fee is set to zero", async () => {
            const { managerContract } = await loadFixture(deployDefiBetsManagerFixture);

            await managerContract.setFeesPpm(0);

            const amount = ethers.utils.parseEther("100");

            expect(await managerContract.calculateFee(amount)).to.be.equal(0);
        });
    });

    describe("#provideLP", () => {
        it("Should provide LP", async () => {
            const { managerContract, lpStaker, mockDUSD, liquidityPool } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const totalSupply = await liquidityPool.totalTokenSupply();

            const value = ethers.utils.parseEther("100");

            await mockDUSD.mint(lpStaker.address, value);
            await mockDUSD.connect(lpStaker).approve(liquidityPool.address, value);

            await managerContract.connect(lpStaker).provideLP(value);

            expect(await liquidityPool.balanceOf(lpStaker.address)).to.be.equal(value.add(totalSupply));
            expect(await liquidityPool.totalTokenSupply()).to.be.equal(value.add(totalSupply));
        });
    });

    describe("#setBet", () => {
        it("Should set a new bet", async () => {
            const { managerContract, user, defiBets, mockDUSD, vault } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(15));

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("19000");
            const maxPrice = ethers.utils.parseEther("21000");

            const _fees = await managerContract.calculateFee(betSize);

            await mockDUSD.connect(user).mint(user.address, betSize.add(_fees));
            await mockDUSD.connect(user).approve(vault.address, betSize.add(_fees));

            await managerContract.connect(user).setBet(betSize, minPrice, maxPrice, expTime, "BTC");

            expect((await defiBets.getBetTokenData(1)).betSize).to.be.equal(betSize);
        });
        it("Should fail because min bigger than max price", async () => {
            const { managerContract, user, defiBets, mockDUSD, vault } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(15));

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("25000");
            const maxPrice = ethers.utils.parseEther("20000");
            const expectedFeeAmount = betSize.mul(feePpm).div(MILLION);

            await mockDUSD.connect(user).mint(user.address, betSize.add(expectedFeeAmount));
            await mockDUSD.connect(user).approve(vault.address, betSize.add(expectedFeeAmount));

            expect(
                managerContract.connect(user).setBet(betSize, minPrice, maxPrice, expTime, "BTC"),
            ).to.be.revertedWith("DefiBets__NoValidPrice");
        });

        it("it should set a bet error #1", async () => {
            const { managerContract, defiBets, ivOracle, priceFeed, mathLibraryDefiBets, user, mockDUSD, vault } =
                await loadFixture(deployDefiBetsManagerFixture);

            //set bet before
            const minRangeB = ethers.utils.parseEther("25000");
            const maxRangeB = ethers.utils.parseEther("25600");
            const betSizeB = ethers.utils.parseEther("19.5");

            const vola = 4493;
            const minRange = ethers.utils.parseEther("27800");
            const maxRange = ethers.utils.parseEther("29600");
            const betSize = ethers.utils.parseEther("20");
            const price = ethers.utils.parseEther("30007");

            const _fees = await managerContract.calculateFee(betSizeB.add(betSize));

            await mockDUSD.connect(user).mint(user.address, betSize.add(betSizeB).add(_fees));
            await mockDUSD.connect(user).approve(vault.address, betSize.add(betSizeB).add(_fees));

            const blockTime = (await ethers.provider.getBlock("latest")).timestamp;
            const date = blockTime + 60 * 60 * 24 * 7;

            const dependentTimestamp = await defiBets.getDependentExpTime();

            const days = Math.ceil((date - dependentTimestamp.toNumber()) / (60 * 60 * 24));

            const expTime = dependentTimestamp.toNumber() + days * 60 * 60 * 24;

            await priceFeed.updateAnswer(price);
            await ivOracle.updateAnswer(vola);
            console.log(expTime);

            const prob = await mathLibraryDefiBets.calculateProbabilityRange(
                minRange,
                maxRange,
                price,
                vola,
                30 * 60 * 60 * 24,
                expTime - blockTime,
            );
            console.log(prob.toNumber());

            const hash = await managerContract.getUnderlyingByte("BTC");
            const winning = await managerContract.calculateWinning(price, betSize, minRange, maxRange, expTime, hash);
            console.log(winning);

            await managerContract.connect(user).setBet(betSizeB, minRangeB, maxRangeB, expTime, "BTC");

            await managerContract.connect(user).setBet(betSize, minRange, maxRange, expTime, "BTC");
        });
    });
    describe("#executeExpiration", () => {
        it("Should execute the expiration after passing the timestamp", async () => {
            const { managerContract, defiBets } = await loadFixture(deployDefiBetsManagerFixture);

            const lastActiveExpTime = await defiBets.lastActiveExpTime();

            const underlyingByte = await managerContract.getUnderlyingByte("BTC");
            const _priceFeedAddress = await managerContract.underlyingPriceFeeds(underlyingByte);

            const priceFeed = (await ethers.getContractAt("MockV3Aggregator", _priceFeedAddress)) as MockV3Aggregator;

            const answer = await priceFeed.latestRoundData();

            //increase the time and pass the first exp time
            await time.increaseTo(lastActiveExpTime.add(1));
            await managerContract.executeExpiration(lastActiveExpTime, "BTC", answer.roundId);

            expect((await defiBets.expTimeInfos(lastActiveExpTime)).finished).to.be.equal(true);
        });

        it("should execute when the lp lost", async () => {
            const { managerContract, defiBets, deployer, mockDUSD, vault } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const lastActiveExpTime = await defiBets.lastActiveExpTime();

            const underlyingByte = await managerContract.getUnderlyingByte("BTC");

            const _priceFeedAddress = await managerContract.underlyingPriceFeeds(underlyingByte);

            const priceFeed = (await ethers.getContractAt("MockV3Aggregator", _priceFeedAddress)) as MockV3Aggregator;

            const priceRange = [ethers.utils.parseEther("29000"), ethers.utils.parseEther("29600")];

            const betSize = ethers.utils.parseEther("22");

            const fee = await managerContract.calculateFee(betSize);

            await mockDUSD.connect(deployer).mint(deployer.address, ethers.utils.parseEther("100"));
            await mockDUSD.connect(deployer).approve(vault.address, betSize.add(fee));

            await managerContract
                .connect(deployer)
                .setBet(betSize, priceRange[0], priceRange[1], lastActiveExpTime, "BTC");

            const expPrice = ethers.utils.parseEther("29516");
            await priceFeed.updateAnswer(expPrice);
            const roundData = await priceFeed.latestRoundData();
            console.log(ethers.utils.formatEther(roundData.answer));

            await time.increaseTo(lastActiveExpTime.add(1));

            await managerContract.executeExpiration(lastActiveExpTime, "BTC", roundData.roundId);

            const payoutFactor = await managerContract.payoutFactor();
            console.log(payoutFactor.toNumber());
        });
    });

    describe("#createNewExpTime", () => {
        it("Should create a new Expiration Time", async () => {
            const { managerContract, defiBets } = await loadFixture(deployDefiBetsManagerFixture);

            const lastExpTime = await defiBets.lastActiveExpTime();

            const maxDuration = await defiBets.maxBetDuration();

            const delta = await defiBets.timeDelta();

            const blockNo = await ethers.provider.getBlockNumber();
            const block = await ethers.provider.getBlock(blockNo);

            if (maxDuration.add(block.timestamp).lt(lastExpTime.add(delta))) {
                await time.increaseTo(lastExpTime.add(delta).sub(maxBetDuration).add(1));
            }

            const hash = await managerContract.getUnderlyingByte("BTC");
            await managerContract.createNewExpTime(hash);

            expect(await defiBets.lastActiveExpTime()).to.be.equal(lastExpTime.add(delta));
        });
    });

    describe("#claimWinnings", () => {
        it("Should transfer the winnings to the user", async () => {
            const { managerContract, user, mockDUSD, vault, defiBets, priceFeed } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            // First set a new bet for the last exp time
            const betSize = ethers.utils.parseEther("100");
            const _fees = await managerContract.calculateFee(betSize);

            await mockDUSD.mint(user.address, betSize.add(_fees));
            await mockDUSD.connect(user).approve(vault.address, betSize.add(_fees));

            const minBoundary = ethers.utils.parseEther("20000");
            const maxBoundary = ethers.utils.parseEther("35000");
            const lastActiveExpTime = await defiBets.lastActiveExpTime();

            await managerContract.connect(user).setBet(betSize, minBoundary, maxBoundary, lastActiveExpTime, "BTC");

            await priceFeed.updateAnswer(ethers.utils.parseEther("21300"));

            const expProfit = (await defiBets.getBetTokenData(1)).profit;

            await time.increaseTo(lastActiveExpTime.add(1));

            const answer = await priceFeed.latestRoundData();

            await managerContract.executeExpiration(lastActiveExpTime, "BTC", answer.roundId);

            const hash = await managerContract.getUnderlyingByte("BTC");
            await managerContract.connect(user).claimWinnings(1, hash);

            expect(await mockDUSD.balanceOf(user.address)).to.be.equal(expProfit);
        });

        it("should fail, if the exp time is not finished", async () => {
            const { managerContract, user, mockDUSD, vault, defiBets } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const betSize = ethers.utils.parseEther("100");
            const _fees = await managerContract.calculateFee(betSize);

            const minBoundary = ethers.utils.parseEther("20000");
            const maxBoundary = ethers.utils.parseEther("35000");
            const lastActiveExpTime = await defiBets.lastActiveExpTime();

            await mockDUSD.mint(user.address, betSize.add(_fees));
            await mockDUSD.connect(user).approve(vault.address, betSize.add(_fees));

            await managerContract.connect(user).setBet(betSize, minBoundary, maxBoundary, lastActiveExpTime, "BTC");

            await time.increaseTo(lastActiveExpTime.add(1));

            const hash = await managerContract.getUnderlyingByte("BTC");
            await expect(managerContract.connect(user).claimWinnings(1, hash)).to.be.revertedWith(
                "DefiBets__NotEpxired()",
            );
        });
    });

    describe("#calculateWinning", () => {
        it("should calculate the correct winning if the range is above the current price", async () => {
            const { managerContract, defiBets } = await loadFixture(deployDefiBetsManagerFixture);

            const hash = await managerContract.getUnderlyingByte("BTC");

            const _betSize = ethers.utils.parseEther("5");
            const _minPrice = ethers.utils.parseEther("21000");
            const _maxPrice = ethers.utils.parseEther("24000");
            const lastActiveExpTime = await defiBets.lastActiveExpTime();

            const now = Math.ceil(Date.now() / 1000);
            const _delta = lastActiveExpTime.sub(now);
            console.log(_delta.toNumber());

            const implVol = await managerContract.getImplVol(hash);
            console.log(`Impl. Vol.: ${implVol.toNumber()}`);

            const payoutFactor = await managerContract.payoutFactor();
            console.log(`Payout Factor: ${payoutFactor.toNumber()}`);

            const winning = await managerContract.calculateWinning(
                priceAnswer,
                _betSize,
                _minPrice,
                _maxPrice,
                lastActiveExpTime,
                hash,
            );

            console.log(`Winning: ${ethers.utils.formatEther(winning)}`);
        });
    });
});
