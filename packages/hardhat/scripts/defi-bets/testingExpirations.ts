import { ethers } from "hardhat";
import { BTCPriceOracle, DefiBets, DefiBetsManager } from "../../typechain-types";
import { time } from "@nomicfoundation/hardhat-network-helpers";

async function main() {
    const priceOracle = (await ethers.getContract("BTCPriceOracle")) as BTCPriceOracle;

    const managerContract = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;
    const defiBets = (await ethers.getContract("DefiBets")) as DefiBets;

    const nextExpTime = (await defiBets.getBetTokenData(3)).expTime;

    const price = ethers.utils.parseEther("28050");

    await priceOracle.updateAnswer(price);

    await time.increaseTo(nextExpTime.sub(30));
    await priceOracle.updateAnswer(price.add(ethers.utils.parseEther("54")));
    await time.increase(2);
    await priceOracle.updateAnswer(price.sub(ethers.utils.parseEther("100")));
    const roundId = (await priceOracle.latestRoundData()).roundId;

    await time.increaseTo(nextExpTime.add(20));

    await priceOracle.updateAnswer(price.sub(ethers.utils.parseEther("52")));
    await time.increase(2);
    await priceOracle.updateAnswer(price.add(ethers.utils.parseEther("244")));
    await time.increase(2);
    await managerContract.executeExpiration(nextExpTime, "BTC", roundId);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
