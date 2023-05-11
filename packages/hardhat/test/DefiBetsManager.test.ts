import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { DefiBetsManager, DefiBetsVault__factory, DefiBets__factory, LiquidityPool__factory } from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const maxLossPerDay = ethers.utils.parseEther("300");
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
        const defiBets = await DefiBets.deploy(managerContract.address);

        await defiBets.initializeData(startExpTime, maxLossPerDay, minBetDuration, maxBetDuration, slot);

        const DefiBetsVault = (await ethers.getContractFactory("DefiBetsVault")) as DefiBetsVault__factory;
        const vault = await DefiBetsVault.deploy(managerContract.address, mockDUSD.address);

        const LiquidityPool = (await ethers.getContractFactory("LiquidityPool")) as LiquidityPool__factory;
        const liquidityPool = await LiquidityPool.deploy(managerContract.address, mockDUSD.address);

        await managerContract.setAddresses(liquidityPool.address, defiBets.address, mockMath.address, vault.address);

        return { deployer, user, lpStaker, managerContract, defiBets, mockDUSD, vault };
    }

    describe("#setBet", () => {
        it("successfull set a new bet", async () => {
            const { managerContract, user, defiBets, mockDUSD, vault } = await loadFixture(
                deployDefiBetsManagerFixture,
            );

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.EXP_TIME_DELTA();

            const expTime = startTime.add(deltaTime.mul(15));

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            await mockDUSD.connect(user).mint(user.address, betSize);
            await mockDUSD.connect(user).approve(vault.address, betSize);

            await managerContract.connect(user).setBet(betSize, minPrice, maxPrice, expTime);

            expect((await defiBets.getBetTokenData(1)).betSize).to.be.equal(betSize);
        });
    });
});
