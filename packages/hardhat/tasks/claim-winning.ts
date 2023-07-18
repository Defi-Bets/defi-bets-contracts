import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBets, DefiBetsManager } from "../typechain-types";

task("claim-winning", "claim your winnings for a finished bet")
    .addParam("id", "The token id of your bet")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const { ethers } = hre;

        const managerContract = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;
        const defiBets = (await ethers.getContract("DefiBets")) as DefiBets;

        const hash = await managerContract.getUnderlyingByte("BTC");

        const owner = await defiBets.ownerOf(parseInt(taskArgs.id));
        const signer = (await ethers.getSigners())[0];

        if (owner === signer.address) {
            console.log("Claim winnings...");
            await managerContract.claimWinnings(parseInt(taskArgs.id), hash);
            console.log("finished!!!");
        }
    });
