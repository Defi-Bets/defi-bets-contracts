import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { FakeDUSD } from "../typechain-types";

task("mint-fDUSD", "Mint new Fake DUSD")
    .addParam("amount", "Amount of Tokens to mint")
    .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const { ethers } = hre;

        const amount = ethers.utils.parseEther(taskArgs.amount);

        const fDUSD = (await ethers.getContract("FakeDUSD")) as FakeDUSD;

        const signer = (await ethers.getSigners())[0];

        console.log(`Minting ${taskArgs.amount} tokens...`);
        const trx = await fDUSD.mint(signer.address, amount);

        await trx.wait(1);

        console.log("finish minting!!!");
    });
