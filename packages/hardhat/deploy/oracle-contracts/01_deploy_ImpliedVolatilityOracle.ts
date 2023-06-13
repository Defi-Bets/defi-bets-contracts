import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";

const deployImpliedVolatilityOracle: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const version = 1;
        const underlying = "BTC";
        const description = "Implied Volatility 30days";

        const decimals = networkConfig[chainId].decimalsIV;
        const initialAnswerIV = networkConfig[chainId].initialAnswerIV;
        const period = networkConfig[chainId].periodIV;

        await deploy("ImpliedVolatilityOracle", {
            from: deployer,
            args: [decimals, initialAnswerIV, description, version, underlying, period],
            log: true,
            autoMine: true,
        });
    } else {
        console.log("Missing parameters in hardhat helper config...");
    }
};

deployImpliedVolatilityOracle.tags = ["oracle"];

export default deployImpliedVolatilityOracle;
