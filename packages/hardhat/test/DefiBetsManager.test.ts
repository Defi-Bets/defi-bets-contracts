import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import {
    DefiBetsManager__factory,
    DefiBetsVault__factory,
    DefiBets__factory,
    LiquidityPool__factory,
    MathLibraryDefibets__factory,
    MockV3Aggregator,
    MockV3Aggregator__factory,
} from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const dateString = Date.now();
const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);
const priceAnswer = ethers.utils.parseEther("20000");
const feePpm = 20000; // 2% Fee
const MILLION = 1000000;
const maxWinMultiplier = 40; // maximum win of user can be this * amount
const maxLossPerTime = 50000;

describe("DefiBetsManager unit test", () => {
    async function deployDefiBetsManagerFixture() {
        const [deployer, user, lpStaker] = await ethers.getSigners();

        const MathLibraryDefiBets = (await ethers.getContractFactory(
            "MathLibraryDefibets",
        )) as MathLibraryDefibets__factory;
        const mathLibraryDefiBets = MathLibraryDefiBets.deploy();

        const DefiBetsManager = (await ethers.getContractFactory("DefiBetsManager", {
            libraries: {
                MathLibraryDefibets: (await mathLibraryDefiBets).address,
            },
        })) as DefiBetsManager__factory;
        const managerContract = await DefiBetsManager.deploy();

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

        await managerContract.setAddresses(liquidityPool.address);

        await managerContract.addUnderlyingToken("BTC", priceFeed.address, defiBets.address, vault.address);

        await managerContract.setFeesPpm(feePpm);

        const lpAmount = ethers.utils.parseEther("100000");
        await mockDUSD.connect(lpStaker).mint(lpStaker.address, lpAmount);
        await mockDUSD.connect(lpStaker).approve(liquidityPool.address, lpAmount);
        await managerContract.connect(lpStaker).provideLP(lpAmount);

        const hash = await managerContract.getUnderlyingByte("BTC");
        await managerContract
            .connect(deployer)
            .initializeBets(hash, startExpTime, minBetDuration, maxBetDuration, slot, maxWinMultiplier);

        return { deployer, user, lpStaker, managerContract, defiBets, mockDUSD, vault, liquidityPool, priceFeed };
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

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(15));

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");
            const expectedFeeAmount = betSize.mul(feePpm).div(MILLION);

            await mockDUSD.connect(user).mint(user.address, betSize);
            await mockDUSD.connect(user).approve(vault.address, betSize);

            await managerContract.connect(user).setBet(betSize, minPrice, maxPrice, expTime, "BTC");

            expect((await defiBets.getBetTokenData(1)).betSize).to.be.equal(betSize.sub(expectedFeeAmount));
        });
        it("Should fail because min bigger than max price", async () => {
            const { managerContract, user, defiBets, mockDUSD, vault } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(15));

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("25000");
            const maxPrice = ethers.utils.parseEther("20000");
            //const expectedFeeAmount = betSize.mul(feePpm).div(MILLION);

            await mockDUSD.connect(user).mint(user.address, betSize);
            await mockDUSD.connect(user).approve(vault.address, betSize);

            expect(
                managerContract.connect(user).setBet(betSize, minPrice, maxPrice, expTime, "BTC"),
            ).to.be.revertedWith("DefiBets__NoValidPrice");
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

            await mockDUSD.mint(user.address, betSize);
            await mockDUSD.connect(user).approve(vault.address, betSize);

            const minBoundary = ethers.utils.parseEther("20000");
            const maxBoundary = ethers.utils.parseEther("25000");
            const lastActiveExpTime = await defiBets.lastActiveExpTime();
            console.log(lastActiveExpTime.toString());

            await managerContract.connect(user).setBet(betSize, minBoundary, maxBoundary, lastActiveExpTime, "BTC");

            await priceFeed.updateAnswer(ethers.utils.parseEther("21300"));

            const expProfit = (await defiBets.getBetTokenData(1)).profit;

            await time.increaseTo(lastActiveExpTime.add(1));

            const answer = await priceFeed.latestRoundData();
            console.log(answer.updatedAt.toString());

            await managerContract.executeExpiration(lastActiveExpTime, "BTC", answer.roundId);

            const hash = await managerContract.getUnderlyingByte("BTC");
            await managerContract.connect(user).claimWinnings(1, hash);

            expect(await mockDUSD.balanceOf(user.address)).to.be.equal(expProfit);
        });
    });
});
