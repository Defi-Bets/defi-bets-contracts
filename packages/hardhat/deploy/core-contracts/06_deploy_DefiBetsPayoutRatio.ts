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

        const PayoutRatioContract = await deploy("DefiBetsPayoutRatio", {
            from: deployer,
            log: true,
            args: [managerContractAddress, moduloDays, targetPayoutRatio],
            autoMine: true,
        });

        const lpPoolContract = (await get("LiquidityPool")).address;

        const managerContract: DefiBetsManager = await hre.ethers.getContract("DefiBetsManager");

        await managerContract.setAddresses(lpPoolContract, PayoutRatioContract.address);
    }
};

deployDefiBetsContract.tags = ["core"];

export default deployDefiBetsContract;
