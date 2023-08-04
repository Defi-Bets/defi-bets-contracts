import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../../helper-hardhat-config";
import verify from "../../helper-functions";

const deployFakeDUSD: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    const token = await deploy("FakeDUSD", {
        from: deployer,
        // Contract constructor arguments
        args: [],
        log: true,
        // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
        // automatically mining the contract deployment transaction. There is no effect on live networks.
        autoMine: true,
    });

    if (!developmentChains.includes(hre.network.name)) {
        await verify(token.address, []);
    }
};

deployFakeDUSD.tags = ["token"];

export default deployFakeDUSD;
