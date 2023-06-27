import { ethers, network } from "hardhat";
import { networkConfig, getNetworkIdFromName } from "../helper-hardhat-config";
import { DefiBetsManager } from "../typechain-types";

async function main() {
    const networkName = network.name;

    const chainId = await getNetworkIdFromName(networkName);

    console.log(`chain id: ${chainId}`);

    if (chainId) {
        const minDuration = networkConfig[chainId].minDuration;
        const maxDuration = networkConfig[chainId].maxDuration;
        const slot = networkConfig[chainId].slot;

        const manager = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;

        console.log("🎛️  Setup the defi-bets contract...");
        const owner = (await ethers.getSigners())[0];

        const dateString = Date.now();
        const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);

        const hash = await manager.getUnderlyingByte("BTC");
        console.log(hash);
        if (hash) {
            const tx = await manager
                .connect(owner)
                .initializeBets(hash, startExpTime, minDuration, maxDuration, slot, 2);
            await tx.wait();

            console.log("🎟️  finished. you can start betting.");
        }
    } else {
        console.log("🛑  You don't have setup the parameters in the config for this chain!");
        console.log("You can set the paramaters in [helper-hardhat-config.ts]");
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
