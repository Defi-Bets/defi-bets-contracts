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

  return { managerContract, underlyingAddress: _underlyingAddress as string };
}
