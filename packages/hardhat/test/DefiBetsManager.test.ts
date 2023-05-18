import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import {
    DefiBetsManager__factory,
    DefiBetsVault__factory,
    DefiBets__factory,
    LiquidityPool__factory,
    MockV3Aggregator__factory,
} from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const dateString = Date.now();
const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);
const priceAnswer = ethers.utils.parseEther("20000");
const feePpm = 20000;   // 2% Fee
const MILLION = 1000000;

describe("DefiBetsManager unit test", () => {
    async function deployDefiBetsManagerFixture() {
        const [deployer, user, lpStaker] = await ethers.getSigners();

        const DefiBetsManager = (await ethers.getContractFactory("DefiBetsManager")) as DefiBetsManager__factory;
        const managerContract = await DefiBetsManager.deploy();

        const MockDUSD = await ethers.getContractFactory("MockDUSD");
        const mockDUSD = await MockDUSD.deploy();

        const MockMath = await ethers.getContractFactory("MockMath");
        const mockMath = await MockMath.deploy();

        const DefiBets = (await ethers.getContractFactory("DefiBets")) as DefiBets__factory;
        const defiBets = await DefiBets.deploy("BTC", managerContract.address);

        const DefiBetsVault = (await ethers.getContractFactory("DefiBetsVault")) as DefiBetsVault__factory;
        const vault = await DefiBetsVault.deploy(managerContract.address, mockDUSD.address);

        const transactionCount = await deployer.getTransactionCount();
        const redeemVaultAddress = ethers.utils.getContractAddress({
            from: deployer.address,
            nonce: transactionCount + 1,
        });

        const LiquidityPool = (await ethers.getContractFactory("LiquidityPool")) as LiquidityPool__factory;
        const liquidityPool = await LiquidityPool.deploy(
            managerContract.address,
            mockDUSD.address,
            vault.address,
            redeemVaultAddress,
        );

        const PriceFeed = (await ethers.getContractFactory("MockV3Aggregator")) as MockV3Aggregator__factory;
        const priceFeed = await PriceFeed.deploy(8, priceAnswer);

        await managerContract.setAddresses(liquidityPool.address, mockMath.address);

        await managerContract.addUnderlyingToken("BTC", priceFeed.address, defiBets.address, vault.address);

        await managerContract.setFeesPpm(feePpm);

        const lpAmount = ethers.utils.parseEther("100000");
        await mockDUSD.connect(lpStaker).mint(lpStaker.address, lpAmount);
        await mockDUSD.connect(lpStaker).approve(liquidityPool.address, lpAmount);
        await managerContract.connect(lpStaker).provideLP(lpAmount);

        const hash = await managerContract.getUnderlyingByte("BTC");
        await managerContract
            .connect(deployer)
            .initializeBets(hash, startExpTime, minBetDuration, maxBetDuration, slot);

        return { deployer, user, lpStaker, managerContract, defiBets, mockDUSD, vault, liquidityPool };
    }

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
            const deltaTime = await defiBets.EXP_TIME_DELTA();

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
    });
});
