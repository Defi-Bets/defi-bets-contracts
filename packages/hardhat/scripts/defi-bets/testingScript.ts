import { ethers } from "hardhat";
import { DefiBets, LiquidityPool } from "../../typechain-types";

async function main() {
    const defiBetsContract = (await ethers.getContract("DefiBets")) as DefiBets;
    const liquidityPool = (await ethers.getContract("LiquidityPool")) as LiquidityPool;

    const minPrice = ethers.utils.parseEther("27800");
    const maxPrice = ethers.utils.parseEther("29700");
    const winning = ethers.utils.parseEther("152.67");
    const betSize = ethers.utils.parseEther("20");

    const totalBets = (await defiBetsContract.expTimeInfos(1690354343)).totalBets;

    const maxUserWinnings = await defiBetsContract.calculateMaxUserWinnings(1690354343, minPrice, maxPrice, winning);
    console.log(ethers.utils.formatEther(maxUserWinnings));

    const maxLPLoss = await defiBetsContract.calculateMaxLPLoss(maxUserWinnings, totalBets.add(betSize));
    console.log(ethers.utils.formatEther(maxLPLoss));

    const totalSupply = await liquidityPool.totalSupply();
    console.log(ethers.utils.formatEther(totalSupply.mul(50000).div(1000000)));
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
