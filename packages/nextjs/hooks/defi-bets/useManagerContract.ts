import { ethers } from "ethers";
import { useDefiBetsContracts } from "./useDefiBetsContracts";
import { useContract, useContractRead, useSigner } from "wagmi";

export type UnderlyingData = { address: string; name: string; vaultAddress: string; hash?: string };

export function useManagerContract(underlying: string) {
  const { contractAbis, contractAddresses } = useDefiBetsContracts();

  const contractConfig = {
    abi: contractAbis["DefiBetsManager"],
    address: contractAddresses["DefiBetsManager"],
  };

  const { data: signer } = useSigner();

  const managerContract = useContract({
    ...contractConfig,
    signerOrProvider: signer,
  });

  const { data: underlyingHash } = useContractRead({
    ...contractConfig,
    functionName: "getUnderlyingByte",
    args: [underlying],
  });

  const { data: _underlyingAddress } = useContractRead({
    ...contractConfig,
    functionName: "defiBetsContracts",
    args: [underlyingHash],
    enabled: Boolean(underlyingHash),
  });

  const { data: priceOracleAddress } = useContractRead({
    ...contractConfig,
    functionName: "underlyingPriceFeeds",
    args: [underlyingHash],
    enabled: Boolean(underlyingHash),
  });

  const { data: priceData } = useContractRead({
    abi: contractAbis["BTCPriceOracle"],
    address: "0xF62E4eA5E6c0d3aD7f8069Ac78715556752F262e",
    functionName: "latestRoundData",
    enabled: Boolean(priceOracleAddress),
  });

  return {
    managerContract,
    underlyingAddress: _underlyingAddress as string,
    underlyingPrice: priceData,
    priceOracleAddress,
  };
}
