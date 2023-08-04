import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBetsPayoutRatio } from "../typechain-types";

task("set-adj-factor", "Set a new adjustment factor for the payout calculation")
    .addParam("factor", "The new faktor")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const payoutContract = (await hre.ethers.getContract("DefiBetsPayoutRatio")) as DefiBetsPayoutRatio;

        const tx = await payoutContract.setAdjustmentFactor(hre.ethers.utils.parseEther(taskArgs.factor));
        await tx.wait(1);
        console.log(`Set new adjustment factor to ${taskArgs.factor}`);
    });
