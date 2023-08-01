import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { DefiBets, DefiBets__factory, MockManager__factory } from "../typechain-types";

const slot = ethers.utils.parseEther("200");
const minBetDuration = 60 * 60 * 24 * 4;
const maxBetDuration = 60 * 60 * 24 * 30;
const maxLossPerDay = 50000;
const maxWinMultiplier = 40; // maximum win of user can be this * amount

const dateString = Date.now();
const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);

describe("DefiBets Unit test", () => {
    async function deployDefiBetsFixture() {
        const [deployer, user, manager, badActor] = await ethers.getSigners();

        const Manager = (await ethers.getContractFactory("MockManager")) as MockManager__factory;
        const managerContract = await Manager.deploy();

        const DefiBets = (await ethers.getContractFactory("DefiBets")) as DefiBets__factory;
        const defiBets: DefiBets = await DefiBets.deploy("BTC", managerContract.address);

        return { defiBets, deployer, user, manager, badActor, managerContract };
    }

    describe("#initializeData", () => {
        it("Should initialize the data", async () => {
            const { defiBets, managerContract } = await loadFixture(deployDefiBetsFixture);

            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );

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

    describe("#setBetParameter", () => {
        it("should fail when the duration boundries not valid", async () => {
            // const { managerContract } = await loadFixture(deployDefiBetsFixture);
        });
    });

    describe("#stop", () => {
        it("should stop the contract", async () => {
            const { defiBets, deployer } = await loadFixture(deployDefiBetsFixture);

            await defiBets.connect(deployer).stop();

            expect(await defiBets.isActive()).to.be.equal(false);
        });

        it("should fail when the caller is not the owner", async () => {
            const { defiBets, badActor } = await loadFixture(deployDefiBetsFixture);

            await expect(defiBets.connect(badActor).stop()).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("#setBetForAccount", () => {
        it("Should set a new bet for an account", async () => {
            const { defiBets, managerContract, user } = await loadFixture(deployDefiBetsFixture);

            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice,
                maxPrice,
                expTime,
                winning,
            );

            const info = await defiBets.expTimeInfos(expTime);
            expect(info.totalBets).to.be.equal(betSize);

            const playerBet = await defiBets.getBetTokenData(1);

            expect(playerBet.betSize).to.be.equal(betSize);
            expect(playerBet.minPrice).to.be.equal(minPrice);
            expect(playerBet.maxPrice).to.be.equal(maxPrice);
        });

        it("Should fail with DefiBets__NoValidWinningPrice if the total winnings are not allowed", async () => {
            const { defiBets, managerContract, user } = await loadFixture(deployDefiBetsFixture);

            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );
            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(3);

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice,
                maxPrice,
                expTime,
                winning,
            );

            // try to place the same bet on the same place => winnings not allowed

            await expect(
                managerContract.setBetForAccount(
                    defiBets.address,
                    user.address,
                    betSize,
                    minPrice,
                    maxPrice,
                    expTime,
                    winning,
                ),
            ).to.be.revertedWithCustomError(defiBets, "DefiBets__NoValidWinningPrice");
        });

        it("should fail when the exp date is not valid", async () => {
            const { defiBets, managerContract, user } = await loadFixture(deployDefiBetsFixture);

            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );

            const betSize = ethers.utils.parseEther("100");
            const minPrice = ethers.utils.parseEther("20000");
            const maxPrice = ethers.utils.parseEther("25000");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10)).sub(1);

            const winning = betSize.mul(2);

            await expect(
                managerContract.setBetForAccount(
                    defiBets.address,
                    user.address,
                    betSize,
                    minPrice,
                    maxPrice,
                    expTime,
                    winning,
                ),
            ).to.be.revertedWith("DefiBets__NoValidExpTime()");
        });
    });

    describe("#performExpiration", () => {
        it("Should evaluate the winnings and profits", async () => {
            const { managerContract, defiBets, user } = await loadFixture(deployDefiBetsFixture);

            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );
            const betSize = ethers.utils.parseEther("50");
            const minPrice = ethers.utils.parseEther("2000");
            const maxPrice = ethers.utils.parseEther("2400");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice,
                maxPrice,
                expTime,
                winning,
            );

            await managerContract.setBetForAccount(
                defiBets.address,
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

            await managerContract.performExpiration(defiBets.address, expTime, expPrice);

            expect((await defiBets.expTimeInfos(expTime)).deltaValue).to.be.equal(expectedLoss);
        });

        it("should fail if the exp date was not exceeded", async () => {
            const { managerContract, defiBets, user } = await loadFixture(deployDefiBetsFixture);

            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );
            const betSize = ethers.utils.parseEther("50");
            const minPrice = ethers.utils.parseEther("2000");
            const maxPrice = ethers.utils.parseEther("2400");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice,
                maxPrice,
                expTime,
                winning,
            );

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice.add(ethers.utils.parseEther("200")),
                maxPrice.add(ethers.utils.parseEther("200")),
                expTime,
                winning,
            );
            const expPrice = ethers.utils.parseEther("2300");

            await expect(managerContract.performExpiration(defiBets.address, expTime, expPrice)).to.be.revertedWith(
                "DefiBets__NotExecutableTime()",
            );
        });
    });

    describe("#claimForAccount", () => {
        it("should fail when the caller is not the owner", async () => {
            const { defiBets, managerContract, badActor, user } = await loadFixture(deployDefiBetsFixture);

            //initialize the contract
            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );

            //set a user bet
            const betSize = ethers.utils.parseEther("50");
            const minPrice = ethers.utils.parseEther("2000");
            const maxPrice = ethers.utils.parseEther("2400");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice,
                maxPrice,
                expTime,
                winning,
            );

            //execute the expiration date

            await time.increaseTo(expTime.add(1));

            const expPrice = ethers.utils.parseEther("2300");

            await managerContract.performExpiration(defiBets.address, expTime, expPrice);

            //try to claim the winning
            await expect(managerContract.claimForAccount(defiBets.address, badActor.address, 1)).to.be.revertedWith(
                "DefiBets__NotTheTokenOwner()",
            );
        });

        it("should`nt set the profit of the token to true when the bet failed", async () => {
            const { defiBets, managerContract, user } = await loadFixture(deployDefiBetsFixture);

            //initialize the contract
            await managerContract.initialize(
                defiBets.address,
                startExpTime,
                maxLossPerDay,
                minBetDuration,
                maxBetDuration,
                slot,
                maxWinMultiplier,
            );

            //set a user bet
            const betSize = ethers.utils.parseEther("50");
            const minPrice = ethers.utils.parseEther("2000");
            const maxPrice = ethers.utils.parseEther("2400");

            const startTime = await defiBets.getDependentExpTime();
            const deltaTime = await defiBets.timeDelta();

            const expTime = startTime.add(deltaTime.mul(10));

            const winning = betSize.mul(2);

            await managerContract.setBetForAccount(
                defiBets.address,
                user.address,
                betSize,
                minPrice,
                maxPrice,
                expTime,
                winning,
            );

            //execute the expiration date

            await time.increaseTo(expTime.add(1));

            const expPrice = ethers.utils.parseEther("1900");

            await managerContract.performExpiration(defiBets.address, expTime, expPrice);

            await managerContract.performExpiration(defiBets.address, expTime, expPrice);

            await expect(managerContract.claimForAccount(defiBets.address, user.address, 1))
                .to.be.emit(defiBets, "Claimed")
                .withArgs(user.address, 1, false);
        });
    });
});
