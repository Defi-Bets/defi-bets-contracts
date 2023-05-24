import Image from "next/image";
import { CurrencyDollarIcon, HashtagIcon } from "@heroicons/react/24/outline";

const DefiBetsStat = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow items-start mx-4 ">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar  ">
            <div className="w-16 rounded-full">
              <Image src="/assets/coin-logos/BTC.svg" alt="BTC Logo" width={28} height={28} />
            </div>
          </div>
        </div>
        <div className="stat-value">25600 $</div>
        <div className="stat-title">Price</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-primary">
          <HashtagIcon className="h-8 w-8" />
        </div>
        <div className="stat-title">Total Bets</div>
        <div className="stat-value text-primary">25.6K</div>
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <CurrencyDollarIcon className="h-8 w-8" />
        </div>
        <div className="stat-title">Vault Deposit</div>
        <div className="stat-value text-secondary">2.6M $</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
    </div>
  );
};

export default DefiBetsStat;
