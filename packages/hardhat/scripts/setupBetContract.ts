import { ethers, network } from "hardhat";
import { networkConfig, getNetworkIdFromName } from "../helper-hardhat-config";
import { DefiBets } from "../typechain-types";

async function main() {
    const networkName = network.name;

    const chainId = await getNetworkIdFromName(networkName);

    console.log(`chain id: ${chainId}`);

    if (chainId) {
        const minDuration = networkConfig[chainId].minDuration;
        const maxDuration = networkConfig[chainId].maxDuration;
        const slot = networkConfig[chainId].slot;
        const maxLoss = networkConfig[chainId].maxLossPerDay;

        const defiBetContract = (await ethers.getContract("DefiBets")) as DefiBets;

        console.log("🎛️  Setup the defi-bets contract...");

        const tx = await defiBetContract.setBetParamater(maxLoss, minDuration, maxDuration, slot);
        await tx.wait();

        console.log("🎟️  finished. you can start betting.");
    } else {
        console.log("🛑  You don't have setup the parameters in the config for this chain!");
        console.log("You can set the paramaters in [helper-hardhat-config.ts]");
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
