import { ethers } from "hardhat";
import { BTCPriceOracle, DefiBets, DefiBetsManager } from "../../typechain-types";
import { BigNumber } from "ethers";

async function main() {
    const defiBetsContract = (await ethers.getContract("DefiBets")) as DefiBets;
    const managerContract = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;
    const priceOracle = (await ethers.getContract("BTCPriceOracle")) as BTCPriceOracle;

    const filter = defiBetsContract.filters.EpxirationTimeCreated();
    console.log(filter);

    // const logs = await ethers.provider.getLogs(filter);
    // console.log(logs);

    const dependentTimeStamp: BigNumber = await defiBetsContract.getDependentExpTime();
    const delta: BigNumber = await defiBetsContract.timeDelta();
    console.log(`Time Delta: ${delta.toNumber() / 24 / 60 / 60} days`);
    const maxBetDuration: BigNumber = await defiBetsContract.maxBetDuration();
    console.log(`Max Bet Duration: ${maxBetDuration.toNumber() / 24 / 60 / 60} days`);
    const minBetDuration: BigNumber = await defiBetsContract.minBetDuration();
    console.log(`Min Bet Duration: ${minBetDuration.toNumber() / 24 / 60 / 60} days`);

    console.log("=============================");
    console.log("Active Exp Times:");

    //calculate maximum exp time
    const now = Math.ceil(Date.now() / 1000);

    const maxExpTime = maxBetDuration.add(now);
    console.log(new Date(maxExpTime.toNumber() * 1000));

    const maxActiveExpTimeSteps = maxExpTime.sub(dependentTimeStamp).div(delta);

    console.log(`Max active exp timestamps: ${maxActiveExpTimeSteps.toNumber()}`);

    const lastTime = dependentTimeStamp.add(delta.mul(maxActiveExpTimeSteps));
    console.log(new Date(lastTime.toNumber() * 1000));

    const hash = await managerContract.getUnderlyingByte("BTC");
    const latestRoundId = (await priceOracle.latestRoundData()).roundId;

    const expTimes = [];
    for (let i = 0; i <= maxActiveExpTimeSteps.toNumber(); i++) {
        const _expTime: BigNumber = dependentTimeStamp.add(delta.mul(i));

        const _info = await defiBetsContract.expTimeInfos(_expTime);

        const _infoDate = new Date(_expTime.toNumber() * 1000);
        console.log(i);
        if (_info.init) {
            console.log(`Expiration time: ${_infoDate.toLocaleDateString()} , ${_expTime} `);
            console.log(`Total bets ${ethers.utils.formatEther(_info.totalBets)}`);
            console.log(`Max loss Limit: ${_info.maxLossLimit}`);
            console.log(`Finished: ${_info.finished}`);

            expTimes.push(_info);
        } else {
            console.log("Create a new ExpTime...");
            try {
                const tx = await managerContract.createNewExpTime(hash);
                await tx.wait(1);
                console.log("new exp time created!");
            } catch (e) {
                console.log(e);
            }
        }

        if (_expTime.toNumber() < now && _info.finished === false) {
            let _id = latestRoundId.toNumber();
            let _timeStamp = await priceOracle.getTimestamp(_id);
            while (_timeStamp > _expTime) {
                _id--;
                _timeStamp = await priceOracle.getTimestamp(_id);
                console.log(`Timestamp: ${new Date(_timeStamp.toNumber() * 1000)}; ID: ${_id}`);
            }
            console.log(`The round ID for ${new Date(_expTime.toNumber() * 1000)} is ${_id}`);

            console.log("Execute exp time ...");
            await managerContract.executeExpiration(_expTime, "BTC", _id);
            console.log("Executed!!");
        }
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
