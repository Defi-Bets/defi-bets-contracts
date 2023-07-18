import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBetsManager, FakeDUSD } from "../typechain-types";

task("provide-lp", "Add Stabletokens to the Liquidity Pool")
    .addParam("amount", "Amount of Stabletokens")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const { ethers } = hre;

        const amount = ethers.utils.parseEther(taskArgs.amount);

        const fDUSD = (await ethers.getContract("FakeDUSD")) as FakeDUSD;
        const managerContract = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;

        const lpAddress = await managerContract.liquidityPool();

        console.log(`Approve ${taskArgs.amount} fDUSD for transfer...`);

        let tx = await fDUSD.approve(lpAddress, amount);
        await tx.wait(1);
        console.log("Aprroval finished!");

        console.log("Provide liquidity...");

        tx = await managerContract.provideLP(amount);
        await tx.wait(1);

        console.log("Finished!!!");
    });
