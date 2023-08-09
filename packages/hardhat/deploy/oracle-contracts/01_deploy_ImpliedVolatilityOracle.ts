import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName, developmentChains } from "../../helper-hardhat-config";
import { ImpliedVolatilityOracle } from "../../typechain-types";
import verify from "../../helper-functions";

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

        const args = [decimals, description, version, underlying, period];

        await deploy("ImpliedVolatilityOracle", {
            from: deployer,
            args: args,
            log: true,
            autoMine: true,
            waitConfirmations: networkConfig[chainId].confirmations,
        });

        const oracleContract = (await hre.ethers.getContract("ImpliedVolatilityOracle")) as ImpliedVolatilityOracle;
        console.log("Updating the initial answer...");
        const trx = await oracleContract.updateAnswer(initialAnswerIV);
        await trx.wait(1);
        console.log("finished!");

        if (!developmentChains.includes(hre.network.name)) {
            await verify(oracleContract.address, args);
        }
    } else {
        console.log("Missing parameters in hardhat helper config...");
    }
};

deployImpliedVolatilityOracle.tags = ["oracle"];

export default deployImpliedVolatilityOracle;
