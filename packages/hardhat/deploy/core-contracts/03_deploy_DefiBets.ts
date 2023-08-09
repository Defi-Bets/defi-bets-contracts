import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import verify from "../../helper-functions";
import { developmentChains, getNetworkIdFromName, networkConfig } from "../../helper-hardhat-config";

const deployDefiBetsContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const args = ["BTC", managerContractAddress];

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const bets = await deploy("DefiBets", {
            from: deployer,
            log: true,
            args: args,
            autoMine: true,
            waitConfirmations: networkConfig[chainId].confirmations,
        });

        if (!developmentChains.includes(hre.network.name)) {
            await verify(bets.address, args);
        }
    }
};

deployDefiBetsContract.tags = ["core"];

export default deployDefiBetsContract;
