import { expect } from "chai";
import { ethers } from "hardhat";
import { DefiBetsPayoutRatio__factory, MockManager__factory } from "../typechain-types";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { Block } from "@ethersproject/providers";

const moduloDays = 30;
const targetPayout = 90;

describe("DefiBetsPayoutRatio Unit test", () => {
    async function deployPayoutRatioFixture() {
        const [deployer] = await ethers.getSigners();

        const Manager = (await ethers.getContractFactory("MockManager")) as MockManager__factory;

        const manager = await Manager.deploy();

        const DefiBetsPayoutRatio = (await ethers.getContractFactory(
            "DefiBetsPayoutRatio",
        )) as DefiBetsPayoutRatio__factory;

        const now = (await ethers.provider.getBlock("latest")) as Block;

        const payoutRatio = await DefiBetsPayoutRatio.deploy(manager.address, moduloDays, targetPayout, now.timestamp);

        return { deployer, payoutRatio, manager };
    }

    describe("#updateLPProfit", () => {
        it("should successfull update the profit", async () => {
            const { manager, payoutRatio } = await loadFixture(deployPayoutRatioFixture);

            const startTimestamp = await payoutRatio.startTimestamp();
            const delta = await payoutRatio.delta();
            const expTime = startTimestamp.add(delta.mul(2));

            const profit = ethers.utils.parseEther("200");
            await manager.updateLPProfit(payoutRatio.address, profit, expTime);

            expect(await payoutRatio.totalProfitLP(expTime)).to.be.equal(profit);
            expect(await payoutRatio.currProfitsPeriodLP()).to.be.equal(0);
        });
    });

    describe("#updatePlayerProfit", () => {
        it("should update the profit and payouts", async () => {
            const { manager, payoutRatio } = await loadFixture(deployPayoutRatioFixture);

            const startTimestamp = await payoutRatio.startTimestamp();
            const delta = await payoutRatio.delta();
            const expTime = startTimestamp.add(delta.mul(2));

            const profit = ethers.utils.parseEther("200");
            await manager.updateLPProfit(payoutRatio.address, profit, expTime);

            await time.increase(delta.mul(15));

            const profitPlayer = ethers.utils.parseEther("100");
            console.log(startTimestamp.toNumber());
            await manager.updatePlayerProfit(payoutRatio.address, 90, profitPlayer, startTimestamp.add(delta.mul(14)));

            expect(await payoutRatio.currProfitsPeriodPlayer()).to.be.equal(profitPlayer);
        });
    });
});
