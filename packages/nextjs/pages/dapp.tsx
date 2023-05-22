import { NextPage } from "next";
import SetBetForm from "~~/components/defi-bets/SetBetForm";

export const Dapp: NextPage = () => {
  return (
    <div className="flex flex-col gapy-6 py-8 justify-center items-center">
      <SetBetForm />
    </div>
  );
};

export default Dapp;
