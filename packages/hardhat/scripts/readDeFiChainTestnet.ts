import { ethers } from "hardhat";

async function main() {
    const blockNumber = await ethers.provider.getBlockNumber();

    console.log(`DMC Testnet latest block number ${blockNumber}`);

    const gasPrice = await ethers.provider.getGasPrice();
    console.log(`🛢️ gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")}`);

    const network = await ethers.provider.getNetwork();

    console.log(`⛓️ chain ID: ${network.chainId}`);

    const block = await ethers.provider.getBlock(blockNumber);
    console.log(block);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
