import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { MathLibraryDefibets__factory, UseMathLibraryDefibets__factory } from "../typechain-types";

describe("MathlibaryDefibets unit test", () => {
    async function deployMathlibaryFixture() {
        const [user] = await ethers.getSigners();

        const MathLibraryDefiBets = (await ethers.getContractFactory(
            "MathLibraryDefibets",
        )) as MathLibraryDefibets__factory;
        const mathLibraryDefiBets = MathLibraryDefiBets.deploy();

        const UseMathLibaryDefibets = (await ethers.getContractFactory("UseMathLibraryDefibets", {
            libraries: {
                MathLibraryDefibets: (await mathLibraryDefiBets).address,
            },
        })) as UseMathLibraryDefibets__factory;
        const useContract = await UseMathLibaryDefibets.deploy();

        return { useContract };
    }

    it("should return a probability", async () => {
        const { useContract } = await loadFixture(deployMathlibaryFixture);

        const prob = await useContract.calculateProbabilityRange();
        console.log(prob.toString());
    });
});
