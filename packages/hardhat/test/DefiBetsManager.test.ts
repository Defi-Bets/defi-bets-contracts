import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { DefiBetsManager, DefiBets__factory, LiquidityPool__factory } from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const maxLossPerDay = 500;
const dateString = Date.now();
const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);

describe("DefiBetsManager unit test", () => {
    async function deployDefiBetsManagerFixture() {
        const [deployer, user, lpStaker] = await ethers.getSigners();

        const DefiBetsManager = await ethers.getContractFactory("DefiBetsManager");
        const managerContract = (await DefiBetsManager.deploy()) as DefiBetsManager;

        const MockDUSD = await ethers.getContractFactory("MockDUSD");
        const mockDUSD = await MockDUSD.deploy();

        const MockMath = await ethers.getContractFactory("MockMath");
        const mockMath = await MockMath.deploy();

        const DefiBets = (await ethers.getContractFactory("DefiBets")) as DefiBets__factory;
        const defiBets = await DefiBets.deploy(managerContract.address, startExpTime);

        await defiBets.setBetParamater(maxLossPerDay, minBetDuration, maxBetDuration, slot);

        const LiquidityPool = (await ethers.getContractFactory("LiquidityPool")) as LiquidityPool__factory;
        const liquidityPool = await LiquidityPool.deploy(managerContract.address, mockDUSD.address);

        await managerContract.setAddresses(liquidityPool.address, defiBets.address, mockMath.address);

        return { deployer, user, lpStaker, managerContract, defiBets };
    }

    describe("#setBet", () => {
        it("successfull set a new bet", async () => {
            const { managerContract, user, defiBets } = await loadFixture(deployDefiBetsManagerFixture);

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.EXP_TIME_DELTA();

            const expTime = startTime.add(deltaTime.mul(10));

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            await managerContract.connect(user).setBet(betSize, minPrice, maxPrice, expTime);

            expect((await defiBets.playerBets(expTime, user.address)).betSize).to.be.equal(betSize);
        });
    });
});
