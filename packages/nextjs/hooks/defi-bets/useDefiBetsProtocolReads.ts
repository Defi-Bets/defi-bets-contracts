import { useDefiBetsContracts } from "./useDefiBetsContracts";
import { useContractRead } from "wagmi";

export const useDefiBetsProtocolReads = (underlyingHash?: string) => {
  const { contractAbis, contractAddresses } = useDefiBetsContracts();

  const managerContract = {
    address: contractAddresses["DefiBetsManager"],
    abi: contractAbis["DefiBetsManager"],
  };

  const { data: vaultAddress } = useContractRead({
    ...managerContract,
    functionName: "vault",
    args: [underlyingHash],
  });

  return { vaultAddress };
};
