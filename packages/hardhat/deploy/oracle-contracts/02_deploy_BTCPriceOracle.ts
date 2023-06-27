import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";
import { BTCPriceOracle } from "../../typechain-types";

const deployBTCPriceOracle: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const version = 1;
        const underlying = "BTC";
        const description = "Price Oracle";

        const decimals = networkConfig[chainId].decimalsPriceFeed;
        const initialAnswerPrice = networkConfig[chainId].initialAnswerPrice;

        await deploy("BTCPriceOracle", {
            from: deployer,
            args: [decimals, description, version, underlying],
            log: true,
            autoMine: true,
        });

        const oracleContract = (await hre.ethers.getContract("BTCPriceOracle")) as BTCPriceOracle;
        console.log("Updating the initial answer...");
        await oracleContract.updateAnswer(initialAnswerPrice);
        console.log("finished!");
    } else {
        console.log("Missing parameters in hardhat helper config...");
    }
};

deployBTCPriceOracle.tags = ["oracle"];

export default deployBTCPriceOracle;
