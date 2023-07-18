import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBets } from "../typechain-types";

task("show-bet-info", "show the information about a special bet")
    .addParam("id", "The token id of the bet")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const { ethers } = hre;

        const defiBets = (await ethers.getContract("DefiBets")) as DefiBets;

        const owner = await defiBets.ownerOf(parseInt(taskArgs.id));
        const info = await defiBets.getBetTokenData(parseInt(taskArgs.id));

        console.log(`Token ID: ${taskArgs.id}`);
        console.log(`Owner is ${owner}`);
        console.log(`Expiration time: ${new Date(info.expTime.toNumber() * 1000).toLocaleDateString()}`);
        console.log(`Bet size: ${ethers.utils.formatEther(info.betSize)} $`);
        console.log(`Min price: ${ethers.utils.formatEther(info.minPrice)} $`);
        console.log(`Max price: ${ethers.utils.formatEther(info.maxPrice)} $`);
        console.log(`Profit: ${ethers.utils.formatEther(info.profit)} $`);
    });
