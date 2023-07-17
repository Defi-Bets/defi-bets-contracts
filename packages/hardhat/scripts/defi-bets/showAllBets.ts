import { ethers } from "hardhat";
import { DefiBets } from "../../typechain-types";

async function main() {
    const defiBetsContract = (await ethers.getContract("DefiBets")) as DefiBets;

    let i = 1;
    while (true) {
        try {
            const _owner = await defiBetsContract.ownerOf(i);

            const betInfo = await defiBetsContract.getBetTokenData(i);

            const _expTimeInfo = await defiBetsContract.expTimeInfos(betInfo.expTime);

            console.log("======================================");
            console.log(`Token ID: ${i}`);
            console.log(`Owner is ${_owner}`);
            console.log(`Expiration time: ${new Date(betInfo.expTime.toNumber() * 1000).toLocaleDateString()}`);
            console.log(`Bet size: ${ethers.utils.formatEther(betInfo.betSize)} $`);
            console.log(`Min price: ${ethers.utils.formatEther(betInfo.minPrice)} $`);
            console.log(`Max price: ${ethers.utils.formatEther(betInfo.maxPrice)} $`);
            console.log(`Profit: ${ethers.utils.formatEther(betInfo.profit)} $`);

            if (_expTimeInfo.finished) {
                console.log(`Expiration price: ${ethers.utils.formatEther(_expTimeInfo.expPrice)} $`);
                if (_expTimeInfo.expPrice.lte(betInfo.maxPrice) && _expTimeInfo.expPrice.gte(betInfo.minPrice)) {
                    console.log("This Bet is in profit");
                }
            } else {
                console.log("The exp time is not executed!");
            }
        } catch (e) {
            console.log(e);
            break;
        }

        i++;
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
