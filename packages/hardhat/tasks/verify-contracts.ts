import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BTCPriceOracle, ImpliedVolatilityOracle } from "../typechain-types";
import { getNetworkIdFromName, networkConfig } from "../helper-hardhat-config";

task("verify-contracts", "try to verify the contracts at the blockexplorer").setAction(
    async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        // await hre.run("verify:verify", {
        //     address: "0xeE5c0F71A21524089115FDB47180850aA0bAAc49",
        //     constructorArguments: [20000, 90],
        //     libraries: {
        //         MathLibraryDefibets: "0x1a1E229b33FAa5f22B27d21CE632D483C4A9bEe6",
        //     },
        // });

        const { ethers, network } = hre;
        const networkName = network.name;
        const chainId = await getNetworkIdFromName(networkName);

        const priceOracle = (await ethers.getContract("BTCPriceOracle")) as BTCPriceOracle;
        const implVolOracle = (await ethers.getContract("ImpliedVolatilityOracle")) as ImpliedVolatilityOracle;

        const version = 1;
        const underlying = "BTC";
        const description = "Price Oracle";

        if (chainId) {
            const decimals = networkConfig[chainId].decimalsPriceFeed;

            const args = [decimals, description, version, underlying];

            try {
                await hre.run("verify:verify", {
                    address: priceOracle.address,
                    constructorArguments: args,
                });
            } catch (e) {
                console.log(e);
            }

            //deploy implied vol oracle
            const versionIV = 1;
            const underlyingIV = "BTC";
            const descriptionIV = "Implied Volatility 30days";

            const decimalsIV = networkConfig[chainId].decimalsIV;

            const periodIV = networkConfig[chainId].periodIV;

            const implVolArgs = [decimalsIV, descriptionIV, versionIV, underlyingIV, periodIV];

            await hre.run("verify:verify", {
                address: implVolOracle.address,
                constructorArguments: implVolArgs,
            });
        }
    },
);
