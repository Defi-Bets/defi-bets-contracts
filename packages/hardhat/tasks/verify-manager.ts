import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("verify-manager", "try to verify the contract at the blockexplorer").setAction(
    async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        await hre.run("verify:verify", {
            address: "0xeE5c0F71A21524089115FDB47180850aA0bAAc49",
            constructorArguments: [20000, 90],
            libraries: {
                MathLibraryDefibets: "0x1a1E229b33FAa5f22B27d21CE632D483C4A9bEe6",
            },
        });
    },
);
