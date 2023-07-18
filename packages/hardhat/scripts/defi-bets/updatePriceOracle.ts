import axios, { AxiosResponse } from "axios";
import { ethers } from "hardhat";
import { BTCPriceOracle } from "../../typechain-types";

const BASE_URL = "https://pro-api.coinmarketcap.com";

async function main() {
    const oracleContract = (await ethers.getContract("BTCPriceOracle")) as BTCPriceOracle;

    async function fetchPrice() {
        const apiKey = process.env.COINMARKET_CAP_API;
        const symbol = "BTC";

        const url = `/v1/cryptocurrency/quotes/latest?symbol=${symbol}&CMC_PRO_API_KEY=${apiKey}&convert=USD`; // Replace with your endpoint URL

        try {
            const response: AxiosResponse = await axios.get(BASE_URL + url);

            const data = response.data;
            console.log(data.data.BTC.quote.USD.price);

            const price = data.data.BTC.quote.USD.price;
            const priceBigInt = ethers.utils.parseEther(price.toString());

            console.log("update answer...");
            await oracleContract.updateAnswer(priceBigInt);
            console.log("finished");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("Unknown error occurred");
            }
        }
    }
    setInterval(fetchPrice, 5 * 60 * 1000);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
