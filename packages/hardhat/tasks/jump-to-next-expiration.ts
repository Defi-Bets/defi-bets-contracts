import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBets } from "../typechain-types";
import { time } from "@nomicfoundation/hardhat-network-helpers";

task("jump", "jump to the next expiration and execute the expDate").setAction(
    async (taskArgs, hre: HardhatRuntimeEnvironment) => {
        const { ethers, network } = hre;

        if (network.name === "localhost") {
            const defiBets = (await ethers.getContract("DefiBets")) as DefiBets;

            const eventFilter = defiBets.filters.EpxirationTimeCreated();

            const events = await defiBets.queryFilter(eventFilter);

            const now = (await ethers.provider.getBlock("latest")).timestamp;
            let nextExpTime = 0;
            let index = 0;
            while (now > nextExpTime) {
                nextExpTime = events[index].args.expTime.toNumber();
                index++;
            }
            if (nextExpTime > 0) {
                await time.increaseTo(nextExpTime + 10);
            }
            console.log(
                `The blockchain jump to following date: ${new Date(
                    nextExpTime * 1000,
                ).toLocaleDateString()}, ${new Date(nextExpTime * 1000).toLocaleTimeString()} `,
            );
        } else {
            console.log("You are not able to jump in the time");
        }
    },
);
