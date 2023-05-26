import { BigNumber } from "ethers";

export const convertToBNWithDecimals = (value: number, decimal = 18) => {
  const bigNumberValue = BigNumber.from(value).mul(BigNumber.from(10).pow(decimal));

  return bigNumberValue;
};
