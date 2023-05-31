import { useContractRead } from "wagmi";
import { useDefiBetsContracts } from "./useDefiBetsContracts";

export const useDefiBetsVault = (contractAddress: string) => {
  const { contractAbis } = useDefiBetsContracts();

  const { data: totalFees } = useContractRead({
    abi: contractAbis["DefiBetsVault"],
    address: contractAddress,
    functionName: "totalFees",
    watch: true,
  });

  return { totalFees };
};
