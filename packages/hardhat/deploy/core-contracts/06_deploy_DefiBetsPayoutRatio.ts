import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBetsManager } from "../../typechain-types";
import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";

const deployDefiBetsContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const moduloDays = networkConfig[chainId].moduloDays;
        const targetPayoutRatio = networkConfig[chainId].targetPayoutRatio;
        console.log(moduloDays, targetPayoutRatio, managerContractAddress);

        const now = Date.now();
        const nextDate = new Date(now);

        nextDate.setDate(nextDate.getDate() + 1);

        nextDate.setHours(0);
        nextDate.setMinutes(0);
        nextDate.setSeconds(0);
        nextDate.setMilliseconds(0);

        console.log(`${nextDate.toLocaleDateString()} , ${nextDate.toLocaleTimeString()}`);

        const PayoutRatioContract = await deploy("DefiBetsPayoutRatio", {
            from: deployer,
            log: true,
            args: [managerContractAddress, moduloDays, targetPayoutRatio, nextDate.getTime() / 1000],
            autoMine: true,
            waitConfirmations: 1,
        });

        const lpPoolContract = (await get("LiquidityPool")).address;

        const managerContract: DefiBetsManager = await hre.ethers.getContract("DefiBetsManager");
        const tx = await managerContract.setAddresses(lpPoolContract, PayoutRatioContract.address);
        await tx.wait(1);
    }
};

deployDefiBetsContract.tags = ["core"];

export default deployDefiBetsContract;
