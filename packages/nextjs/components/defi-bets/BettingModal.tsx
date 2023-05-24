import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useManagerContract } from "~~/hooks/defi-bets";
import { BigNumber, ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

interface BettingModalProps {
  expTime: number;
  hash: string;
}

export const BettingModal: React.FC<BettingModalProps> = ({ expTime, hash }) => {
  const [rangeValues, setRangeValues] = useState<[number, number]>([24000, 26000]);
  const [betSize, setBetsize] = useState<number>(0);

  const { address, abi } = useManagerContract();

  const { config } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: "setBet",
    args: [
      ethers.utils.parseEther(betSize.toString()),
      ethers.utils.parseEther(rangeValues[0].toString()),
      ethers.utils.parseEther(rangeValues[1].toString()),
      expTime ? BigNumber.from(expTime) : ethers.constants.Zero,
      "BTC",
    ],
  });

  const { writeAsync: writeBet } = useContractWrite(config);

  const handleTransaction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (writeBet) {
      await writeBet();
    }
  };

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setRangeValues([values[0], values[1]]);
    }
  };

  const handleMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Check if the value is a valid number with optional decimal point
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) || value === "") {
      // Check if the value is within the desired range
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 50000) {
        setRangeValues([parseFloat(value), rangeValues[1]]);
      }
    }
  };

  const handleBetSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Check if the value is a valid number with optional decimal point
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) || value === "") {
      // Check if the value is within the desired range
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 50000) {
        setBetsize(parseFloat(value));
      }
    }
  };

  const marks = {
    20000: <strong className="text-primary">20k $</strong>,
    22000: "22k $",
    24000: "24k $",
    26000: "26k $",
    28000: "28k $",
    30000: "30k $",
    32000: "32k $",
    34000: "34k $",
    36000: {
      style: { padding: "0 0 4px 0", "white-space": "nowrap" },
      label: <strong className="text-primary">36k $</strong>,
    },
  };

  useEffect(() => {
    console.log(expTime);
    console.log(rangeValues);
  }, [rangeValues]);

  return (
    <>
      <label htmlFor="betting-modal" className="btn">
        Place Bet
      </label>
      <input type="checkbox" id="betting-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label htmlFor="betting-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="font-bold text-lg">Place your price bet!</h3>
          <p className="py-4">Choose the price range and the bet size.</p>
          <div className="form-control mx-4 space-y-4 w-7/8">
            <label className="label">
              <span className="label-text">BetSize</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="0.01"
                value={betSize}
                onChange={handleBetSize}
                className="input input-bordered appearance-none"
              />
              <span>DUSD</span>
            </label>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Your Price Range</span>
              </label>
              <div className="flex w-full justify-between  my-4 space-x-4">
                <label className="input-group input-group-xs ">
                  <span>Min.</span>
                  <input
                    type="text"
                    placeholder="20000"
                    className="input input-bordered input-xs"
                    value={rangeValues[0]}
                    onChange={handleMinPrice}
                  />
                </label>
                <label className="input-group input-group-xs ">
                  <span>Max.</span>
                  <input
                    type="text"
                    placeholder="24000"
                    className="input input-bordered input-xs"
                    value={rangeValues[1]}
                  />
                </label>
              </div>
              <div className=" my-8  ">
                <Slider
                  range
                  min={20000}
                  max={36000}
                  step={200}
                  marks={marks}
                  allowCross={false}
                  value={rangeValues}
                  onChange={handleRangeChange}
                  className="px-4 ml-1 w-full "
                  trackStyle={{ backgroundColor: "hsl(var(--p))" }}
                  railStyle={{ backgroundColor: "hsl(var(--a))" }}
                  dotStyle={{ backgroundColor: "hsl(var(--a))" }}
                  activeDotStyle={{ backgroundColor: "hsl(var(--p))" }}
                  handleStyle={{ backgroundColor: "hsl(var(--a))" }}
                />
              </div>
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="betting-modal" className="btn ">
              Quit
            </label>
            <button className="btn btn-primary" onClick={handleTransaction}>
              Bet !
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
