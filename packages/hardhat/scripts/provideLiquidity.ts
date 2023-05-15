import { ethers } from "hardhat";
import { DefiBetsManager, LiquidityPool, MockDUSD } from "../typechain-types";

async function main() {
    const [lpProvider] = await ethers.getSigners();

    const stableToken = (await ethers.getContract("MockDUSD")) as MockDUSD;
    const liquidityPool = (await ethers.getContract("LiquidityPool")) as LiquidityPool;
    const manager = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;

    const value = ethers.utils.parseEther("100000");

    await stableToken.connect(lpProvider).mint(lpProvider.address, value);
    await stableToken.connect(lpProvider).approve(liquidityPool.address, value);

    //Provide LP

    await manager.connect(lpProvider).provideLP(value);

    console.log("🤑 Provided liquidity to the pool!");
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
