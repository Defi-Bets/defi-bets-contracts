import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSetBet } from "~~/hooks/defi-bets";
import { useDefiBetsContracts } from "~~/hooks/defi-bets/useDefiBetsContracts";
import { useStableToken } from "~~/hooks/defi-bets/useStableToken";
import { convertToBNWithDecimals } from "~~/utils/defi-bets";

interface BettingModalProps {
  expTime: number;
  underlying: string;
}

export const BettingModal: React.FC<BettingModalProps> = ({ expTime, underlying }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    setBet,
    setBetSize,
    betSize,
    priceRange,
    setPriceRange,
    setVaultIsApproved,
    vaultIsApproved,
    isSuccess: isSuccesSetBet,
  } = useSetBet(underlying, expTime);

  const { contractAddresses } = useDefiBetsContracts();

  const { approve, isSuccess, setValue, allowance } = useStableToken(
    contractAddresses["MockDUSD"],
    contractAddresses["DefiBetsVault"],
  );

  useEffect(() => {
    console.log(`Bet Size is: ${convertToBNWithDecimals(betSize).toString()}`);
    console.log(`Allowance is ${allowance?.toString()}`);
    console.log(priceRange);

    if (allowance?.gte(convertToBNWithDecimals(betSize))) {
      console.log("allowance is greater");
      setVaultIsApproved(true);
    } else {
      console.log("allowance is lower");
      setVaultIsApproved(false);
    }
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log("Transaction");
    if (vaultIsApproved && setBet) {
      console.log("Set Bet");
      setBet();
    } else {
      if (approve) {
        console.log("Approve");
        approve();
      }
    }
  };

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setPriceRange([values[0], values[1]]);
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
        setPriceRange([parseFloat(value), priceRange[1]]);
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
        setBetSize(parseFloat(value));
        setValue(parseFloat(value));
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

  return (
    <>
      <label
        // htmlFor="betting-modal"
        className="btn"
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
      >
        Place Bet
      </label>
      <input type="checkbox" id="betting-modal" className="modal-toggle" />
      <div className={`modal modal-bottom sm:modal-middle ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Place your price bet!</h3>
          <p className="py-4">Choose the price range and the bet size.</p>
          <form className="form-control mx-4 space-y-4 w-7/8">
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
                    value={priceRange[0]}
                    onChange={handleMinPrice}
                  />
                </label>
                <label className="input-group input-group-xs ">
                  <span>Max.</span>
                  <input
                    type="text"
                    placeholder="24000"
                    className="input input-bordered input-xs"
                    value={priceRange[1]}
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
                  value={priceRange}
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
          </form>

          <div className="modal-action">
            <label
              className="btn "
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              Quit
            </label>
            <button className={`btn btn-primary `} onClick={handleSubmit}>
              {vaultIsApproved ? "Bet !" : "Approve Bet"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
