import { ethers, network } from "hardhat";
import { getNetworkIdFromName } from "../helper-hardhat-config";
import { DefiBetsManager } from "../typechain-types";

async function main() {
    const networkName = network.name;

    const chainId = await getNetworkIdFromName(networkName);

    console.log(`chain id: ${chainId}`);

    if (chainId) {
        const vault = (await ethers.getContract("DefiBetsVault")).address;
        const ivFeed = (await ethers.getContract("ImpliedVolatilityOracle")).address;
        const priceFeed = (await ethers.getContract("BTCPriceOracle")).address;
        const defiBets = (await ethers.getContract("DefiBets")).address;

        const manager = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;

        const tx = await manager.addUnderlyingToken("BTC", priceFeed, defiBets, vault);
        await tx.wait(1);

        const hash = await manager.getUnderlyingByte("BTC");
        await manager.updateIVFeed(hash, ivFeed, 30 * 60 * 60 * 24);
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
