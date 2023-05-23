import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { useManagerContract } from "~~/hooks/defi-bets";

export const Dapp: NextPage = () => {
  const { underlyings } = useManagerContract();

  return (
    <div className="flex flex-col gapy-6 py-8 justify-center items-center">
      {underlyings?.map(underlying => {
        return (
          <div key={underlying.hash} className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <Image src="/assets/btc-bg.jpg" alt="Shoes" fill />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Underlying: {underlying.name}</h2>
              <p>Actual Price: 25400 $</p>
              <div className="card-actions justify-end">
                <Link href={`/dapp/${underlying.hash}`}>
                  <button className="btn btn-primary">Show Bets!</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dapp;
