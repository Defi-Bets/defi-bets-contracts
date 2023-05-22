import React, { useState } from "react";
import { BigNumber, ethers } from "ethers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

const SetBetForm: React.FC = () => {
  const [betSize, setBetSize] = useState("0");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");
  const [expTime, setExpTime] = useState<Date | null>();
  const [expTimeValue, setExpTimeValue] = useState<BigNumber>(ethers.constants.Zero);
  const [underlying, setUnderlying] = useState("");

  const args: [BigNumber, BigNumber, BigNumber, BigNumber, string] = [
    ethers.utils.parseEther(betSize),
    ethers.utils.parseEther(minPrice),
    ethers.utils.parseEther(maxPrice),
    expTimeValue,
    underlying,
  ];

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("DefiBetsManager");

  const { config } = usePrepareContractWrite({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi,
    functionName: "setBet",
    args: args,
    onError: e => {
      console.log(e);
    },
  });

  const { data: trxResult, isLoading, isSuccess, isError, write: setBet } = useContractWrite(config);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert string inputs to appropriate data types

    console.log(args);
    // Call the setBet function with the form values
    if (setBet) {
      setBet();
    }
  };

  const onExpTimeChange = (date: Date | null) => {
    if (date) {
      console.log("change exp time");
      setExpTime(date);
      const _expTime = Math.floor(date.getTime() / 1000).toString();
      setExpTimeValue(BigNumber.from(_expTime));
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Set Bet</h2>
      <div className="mb-4">
        <label htmlFor="betSize" className="block text-gray-700 font-medium mb-2">
          Bet Size
        </label>
        <input
          type="number"
          id="betSize"
          className="w-full border-gray-300 rounded-md p-2"
          value={betSize}
          onChange={e => setBetSize(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="minPrice" className="block text-gray-700 font-medium mb-2">
          Minimum Price
        </label>
        <input
          type="range"
          id="minPrice"
          className="w-full"
          min={0}
          max={1000}
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="maxPrice" className="block text-gray-700 font-medium mb-2">
          Maximum Price
        </label>
        <input
          type="range"
          id="maxPrice"
          className="w-full"
          min={0}
          max={1000}
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expTime" className="block text-gray-700 font-medium mb-2">
          Expiration Time
        </label>
        <DatePicker
          id="expTime"
          selected={expTime}
          onChange={(date: Date | null) => onExpTimeChange(date)}
          className="w-full border-gray-300 rounded-md p-2"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="underlying" className="block text-gray-700 font-medium mb-2">
          Underlying Asset
        </label>
        <input
          type="text"
          id="underlying"
          className="w-full border-gray-300 rounded-md p-2"
          value={underlying}
          onChange={e => setUnderlying(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default SetBetForm;
