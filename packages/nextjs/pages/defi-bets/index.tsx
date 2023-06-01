import { useEffect, useState } from "react";
import Image from "next/image";
import { BigNumber, ethers } from "ethers";
import { NextPage } from "next";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useBettingContract, useManagerContract } from "~~/hooks/defi-bets";

const DefiBets: NextPage = () => {
  const [activeExpTime, setActiveExpTime] = useState<number>();

  const { underlyingAddress } = useManagerContract("BTC");

  const { expTimes, totalBets, maxLossLimit, maxUserWinning } = useBettingContract(underlyingAddress, activeExpTime);

  useEffect(() => {
    console.log(totalBets?.toString());
  }, [activeExpTime, totalBets]);

  function formatNumberWithSuffix(valueBig: BigNumber): string {
    const suffixes = [" ", " K", " M"];
    let suffixIndex = 0;

    let value: number = parseFloat(ethers.utils.formatEther(valueBig));

    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
      value /= 1000;
      suffixIndex++;
    }

    return value.toFixed(1) + suffixes[suffixIndex];
  }

  return (
    <div className="mt-4 bg-base-100 min-w-1/2 mx-auto rounded-xl shadow-sm p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-primary font-semibold text-2xl">Underlying Overview</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text ">Expiration Date</span>
          </label>
          <select
            className="select select-primary w-full max-w-xs"
            onChange={e => setActiveExpTime(parseInt(e.target.value))}
            value={activeExpTime}
          >
            {expTimes?.map(time => {
              const date = new Date(time * 1000);
              const formatDate = date.toLocaleDateString();

              return (
                <option key={time} value={time}>
                  {formatDate}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow items-start mb-4  ">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar  ">
              <div className="w-16 rounded-full">
                <Image src="/assets/coin-logos/BTC.svg" alt="BTC Logo" width={12} height={12} />
              </div>
            </div>
          </div>
          <div className="stat-value">25.60 K $</div>
          <div className="stat-title">Price</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary">
            <CurrencyDollarIcon className="h-8 w-8" />
          </div>
          <div className="stat-title">Total Bets</div>
          <div className="stat-value text-primary">{totalBets ? formatNumberWithSuffix(totalBets) : "0.0"} $</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-success">
            <CurrencyDollarIcon className="h-8 w-8" />
          </div>
          <div className="stat-title">Max Winning Chance</div>
          <div className="stat-value text-success">
            {maxUserWinning ? formatNumberWithSuffix(maxUserWinning) : "0.0"} $
          </div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <CurrencyDollarIcon className="h-8 w-8" />
          </div>
          <div className="stat-title">LP Max Loss</div>
          <div className="stat-value text-error">{maxLossLimit ? formatNumberWithSuffix(maxLossLimit) : "0.0"} $</div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>
      </div>

      <div className="flex flex-start space-x-4">
        <button className="btn join-item">Place Bet</button>
        <button className="btn join-item">Execute Expiration</button>
      </div>
    </div>
  );
};

export default DefiBets;
