import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployMockContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const network = hre.network.name;

    if (developmentChains.includes(network)) {
        const { deployer } = await hre.getNamedAccounts();
        const { deploy } = hre.deployments;

        await deploy("MockDUSD", {
            from: deployer,
            // Contract constructor arguments
            args: [],
            log: true,
            // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
            // automatically mining the contract deployment transaction. There is no effect on live networks.
            autoMine: true,
        });

        await deploy("MockV3Aggregator", {
            from: deployer,
            args: [8, ethers.utils.parseEther("25000")],
            log: true,
            autoMine: true,
        });
    }
};

export default deployMockContracts;

deployMockContracts.tags = ["mocks"];
