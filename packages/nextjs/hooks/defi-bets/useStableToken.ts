import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { convertToBNWithDecimals } from "~~/utils/defi-bets";

export const useStableToken = (address: string, vault: string) => {
  const [value, setValue] = useState<number>(0);
  const debouncedValue = useDebounce(value, 500);

  const { config: approveConfig } = usePrepareContractWrite({
    address: address,
    abi: erc20ABI,
    functionName: "approve",
    args: [vault, convertToBNWithDecimals(debouncedValue)],
    enabled: Boolean(debouncedValue),
    onSuccess: () => {
      console.log(`Approve ${debouncedValue} to Vault`);
    },
  });

  const { address: accountAddress } = useAccount();

  const { data: approveData, write: approve } = useContractWrite(approveConfig);

  const { data: allowance } = useContractRead({
    address: address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [accountAddress ? accountAddress : "0x", vault],
    watch: true,
  });

  const { data: userAmount } = useContractRead({
    address: address,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [accountAddress ? accountAddress : "0x"],
    watch: true,
  });

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: approveData?.hash });

  return { setValue, isLoading, isSuccess, approve, allowance, userAmount };
};
