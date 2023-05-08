import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { DefiBets, DefiBets__factory, MockMath, MockMath__factory } from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const maxLossPerDay = 500;

describe("DefiBets Unit test", () => {
    async function deployDefiBetsFixture() {
        const [deployer, user, manager, badActor] = await ethers.getSigners();

        const MockMath = (await ethers.getContractFactory("MockMath")) as MockMath__factory;
        const mockMath: MockMath = await MockMath.deploy();

        const DefiBets = (await ethers.getContractFactory("DefiBets")) as DefiBets__factory;
        const defiBets: DefiBets = await DefiBets.deploy(manager.address, mockMath.address);

        return { defiBets, deployer, user, manager, badActor };
    }

    describe("#setBetParamater", () => {
        it("successfull set the parameter", async () => {
            const { defiBets, manager } = await loadFixture(deployDefiBetsFixture);

            await defiBets.connect(manager).setBetParamater(maxLossPerDay, minBetDuration, maxBetDuration, slot);

            expect(await defiBets.maxBetDuration()).to.be.equal(maxBetDuration);
            expect(await defiBets.minBetDuration()).to.be.equal(minBetDuration);
            expect(await defiBets.slot()).to.be.equal(slot);
            expect(await defiBets.maxLossPerDay()).to.be.equal(maxLossPerDay);
        });

        it("failed when the caller is not the manager", async () => {
            const { defiBets, badActor } = await loadFixture(deployDefiBetsFixture);

            expect(
                defiBets.connect(badActor).setBetParamater(maxLossPerDay, minBetDuration, maxBetDuration, slot),
            ).to.be.revertedWith("DefiBets__Forbidden");
        });
    });

    describe("#initializeExpTimes", () => {
        it("successfull initialize the expiration times", async () => {
            const { defiBets, manager } = await loadFixture(deployDefiBetsFixture);

            await defiBets.connect(manager).setBetParamater(maxLossPerDay, minBetDuration, maxBetDuration, slot);

            await defiBets.connect(manager).initializeExpTimes();

            const blockNumber = await ethers.provider.getBlockNumber();
            const block = await ethers.provider.getBlock(blockNumber);

            const timestamp = block.timestamp;

            const expTime = timestamp + 60 * 60 * 24 * 30;

            expect(await defiBets.getMaxExpTime()).to.be.equal(expTime);

            const firstValidExpTime = expTime - 60 * 60 * 24 * 26;

            expect(await defiBets.isExpTimeValid(firstValidExpTime)).to.be.equal(true);
        });
    });

    describe("#setBetForAccount", () => {
        it("successfull set a new bet for an account", async () => {
            const { defiBets, manager, user } = await loadFixture(deployDefiBetsFixture);

            await defiBets.connect(manager).setBetParamater(maxLossPerDay, minBetDuration, maxBetDuration, slot);

            await defiBets.connect(manager).initializeExpTimes();

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");
            const blockNumber = await ethers.provider.getBlockNumber();
            const block = await ethers.provider.getBlock(blockNumber);

            const timestamp = block.timestamp;

            const expTime = timestamp + 60 * 60 * 24 * 10;

            await defiBets.connect(manager).setBetForAccount(user.address, betSize, minPrice, maxPrice, expTime);

            const info = await defiBets.bets(expTime);
            expect(info.totalBets).to.be.equal(betSize);

            const playerBet = await defiBets.playerBets(expTime, user.address);

            expect(playerBet.betSize).to.be.equal(betSize);
            expect(playerBet.minPrice).to.be.equal(minPrice);
            expect(playerBet.maxPrice).to.be.equal(maxPrice);
        });
    });
});
