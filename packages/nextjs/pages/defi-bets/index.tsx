import { useEffect, useState } from "react";
import Image from "next/image";
import { BigNumber, ethers } from "ethers";
import { NextPage } from "next";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { ExpTimeSelector } from "~~/components/defi-bets/ExpTimeSelector";
import Modal from "~~/components/ui/Modal";
import { useBettingContract, useManagerContract } from "~~/hooks/defi-bets";

const DefiBets: NextPage = () => {
  const [activeExpTime, setActiveExpTime] = useState<number>();

  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(prev => !prev);

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
    <>
      <div className="mt-4 bg-base-100 min-w-1/2 mx-auto rounded-xl shadow-sm p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-primary font-semibold text-2xl">Underlying Overview</h1>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text ">Expiration Date</span>
            </label>
            <ExpTimeSelector activeValue={activeExpTime} onChange={setActiveExpTime} expTimes={expTimes} />
          </div>
        </div>
        {/* TODO: Remove the stat page to a single component */}
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
          <button className="btn join-item" onClick={handleToggle}>
            Place Bet
          </button>
          <button className="btn join-item">Execute Expiration</button>
        </div>
      </div>
      <Modal open={open}>
        <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
        <p className="py-4">
          You havve been selected for a chance to get one year of subscription to use Wikipedia for free!
        </p>
        <div className="modal-action">
          {/* closes the modal */}
          <button className="btn btn-primary" onClick={handleToggle}>
            Yay!
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DefiBets;
