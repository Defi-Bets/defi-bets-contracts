import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBets, DefiBetsManager, FakeDUSD } from "../typechain-types";

task("set-bet", "Description of my task")
    .addParam("amount", "Bet amount in Dollar")
    .addParam("exptime", "Expiration timestamp ")
    .addParam("minrange", "Minimum range in 50$ steps")
    .addParam("maxrange", "Maximum range in 50$ steps")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const { ethers } = hre;

        console.log(taskArgs);

        const managerContract = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;
        const fDUSD = (await ethers.getContract("FakeDUSD")) as FakeDUSD;
        const defiBets = (await ethers.getContract("DefiBets")) as DefiBets;

        const underlyingHash = await managerContract.getUnderlyingByte("BTC");

        const _amount = ethers.utils.parseEther(taskArgs.amount);
        const _expTime = parseInt(taskArgs.exptime);
        const _minRange = ethers.utils.parseEther(taskArgs.minrange);
        const _maxRange = ethers.utils.parseEther(taskArgs.maxrange);

        const expTimeInfo = await defiBets.expTimeInfos(_expTime);

        console.log(expTimeInfo);

        // First approve the bet amount
        console.log(`Approve ${taskArgs.amount} fDUSD for transfer...`);

        const vault = await managerContract.vaults(underlyingHash);

        const fee = await managerContract.calculateFee(_amount);

        let tx = await fDUSD.approve(vault, _amount.add(fee));
        await tx.wait(1);
        console.log("Aprroval finished!");

        console.log("Set the bet...");

        tx = await managerContract.setBet(_amount, _minRange, _maxRange, _expTime, "BTC");
        await tx.wait(1);

        console.log("Bet was succesfully set!!!");
    });
