import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { DefiBets, DefiBets__factory } from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const maxLossPerDay = ethers.utils.parseEther("300");
const maxWinMultiplier = 40; // maximum win of user can be this * amount

const dateString = Date.now();
const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);

describe("DefiBets Unit test", () => {
    async function deployDefiBetsFixture() {
        const [deployer, user, manager, badActor] = await ethers.getSigners();

        const DefiBets = (await ethers.getContractFactory("DefiBets")) as DefiBets__factory;
        const defiBets: DefiBets = await DefiBets.deploy("BTC", manager.address);

        return { defiBets, deployer, user, manager, badActor };
    }

    describe("#initializeData", () => {
        it("Should initialize the data", async () => {
            const { defiBets, manager } = await loadFixture(deployDefiBetsFixture);

            await defiBets
                .connect(manager)
                .initializeData(startExpTime, maxLossPerDay, minBetDuration, maxBetDuration, slot, maxWinMultiplier);

            expect(await defiBets.maxBetDuration()).to.be.equal(maxBetDuration);
            expect(await defiBets.minBetDuration()).to.be.equal(minBetDuration);
            expect(await defiBets.slot()).to.be.equal(slot);
        });

        it("Should fail with DefiBets__Forbidden when the parameter already initialized", async () => {
            const { defiBets, badActor } = await loadFixture(deployDefiBetsFixture);

            expect(
                defiBets
                    .connect(badActor)
                    .initializeData(
                        startExpTime,
                        maxLossPerDay,
                        maxBetDuration,
                        minBetDuration,
                        slot,
                        maxWinMultiplier,
                    ),
            ).to.be.revertedWith("DefiBets__Forbidden");
        });
    });

    describe("#setBetForAccount", () => {
        it("Should set a new bet for an account", async () => {
            const { defiBets, manager, user } = await loadFixture(deployDefiBetsFixture);

            await defiBets
                .connect(manager)
                .initializeData(startExpTime, maxLossPerDay, minBetDuration, maxBetDuration, slot, maxWinMultiplier);

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.EXP_TIME_DELTA();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await defiBets
                .connect(manager)
                .setBetForAccount(user.address, betSize, minPrice, maxPrice, expTime, winning);

            const info = await defiBets.expTimeInfos(expTime);
            expect(info.totalBets).to.be.equal(betSize);

            const playerBet = await defiBets.getBetTokenData(1);

            expect(playerBet.betSize).to.be.equal(betSize);
            expect(playerBet.minPrice).to.be.equal(minPrice);
            expect(playerBet.maxPrice).to.be.equal(maxPrice);
        });

        it("Should fail with DefiBets__NoValidWinningPrice if the total winnings are not allowed", async () => {
            const { defiBets, manager, user } = await loadFixture(deployDefiBetsFixture);

            await defiBets
                .connect(manager)
                .initializeData(startExpTime, maxLossPerDay, minBetDuration, maxBetDuration, slot, maxWinMultiplier);
            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.EXP_TIME_DELTA();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(3);

            await defiBets
                .connect(manager)
                .setBetForAccount(user.address, betSize, minPrice, maxPrice, expTime, winning);

            // try to place the same bet on the same place => winnings not allowed

            await expect(
                defiBets.connect(manager).setBetForAccount(user.address, betSize, minPrice, maxPrice, expTime, winning),
            ).to.be.revertedWith("DefiBets__NoValidWinningPrice");
        });
    });

    describe("#performExpiration", () => {
        it("Should evaluate the winnings and profits", async () => {
            const { manager, defiBets, user } = await loadFixture(deployDefiBetsFixture);

            await defiBets
                .connect(manager)
                .initializeData(startExpTime, maxLossPerDay, minBetDuration, maxBetDuration, slot, maxWinMultiplier);
            const betSize = ethers.utils.parseEther("50");
            const minPrice = ethers.utils.parseEther("2000");
            const maxPrice = ethers.utils.parseEther("2400");

            const startTime = await defiBets.getStartExpTime();
            const deltaTime = await defiBets.EXP_TIME_DELTA();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await defiBets
                .connect(manager)
                .setBetForAccount(user.address, betSize, minPrice, maxPrice, expTime, winning);

            await defiBets
                .connect(manager)
                .setBetForAccount(
                    user.address,
                    betSize,
                    minPrice.add(ethers.utils.parseEther("200")),
                    maxPrice.add(ethers.utils.parseEther("200")),
                    expTime,
                    winning,
                );

            const expectedLoss = winning.mul(2).sub(betSize.mul(2));

            await time.increaseTo(expTime.add(1));

            const expPrice = ethers.utils.parseEther("2300");

            await defiBets.connect(manager).performExpiration(expTime, expPrice);

            expect((await defiBets.expTimeInfos(expTime)).deltaValue).to.be.equal(expectedLoss);
        });
    });
});
