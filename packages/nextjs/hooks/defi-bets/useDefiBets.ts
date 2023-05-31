import { useState } from "react";
import { useDefiBetsContracts } from "./useDefiBetsContracts";
import { useDebounce } from "usehooks-ts";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { convertToBNWithDecimals } from "~~/utils/defi-bets";

export const useDefiBets = (underlying: string, expTime: number) => {
  const [betSize, setBetSize] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number[]>([20000, 25000]);

  const debouncedBetSize = useDebounce(betSize, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  const [vaultIsApproved, setVaultIsApproved] = useState(false);

  const { contractAbis, contractAddresses } = useDefiBetsContracts();

  const { config } = usePrepareContractWrite({
    address: contractAddresses["DefiBetsManager"],
    abi: contractAbis["DefiBetsManager"],
    functionName: "setBet",
    args: [
      convertToBNWithDecimals(debouncedBetSize),
      convertToBNWithDecimals(debouncedPriceRange[0]),
      convertToBNWithDecimals(debouncedPriceRange[1]),
      expTime,
      underlying,
    ],
    enabled: vaultIsApproved && Boolean(debouncedBetSize),
    onError: e => {
      console.log(e);
    },
  });

  const { data, write: setBet } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    setBet,
    setBetSize,
    setPriceRange,
    isLoading,
    isSuccess,
    setVaultIsApproved,
    betSize,
    priceRange,
    vaultIsApproved,
  };
};
