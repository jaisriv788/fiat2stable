import React from "react";
import { TypingAnimation } from "../ui/typing-animation";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { useNavigate } from "react-router";

const TrxCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 mx-2 px-3 md:px-5 border-b-2 border-r border-purple-900 py-5 bg-purple-50 shadow-xl rounded-lg">
      <div className="font-semibold text-lg">Transaction Limit</div>
      <p className="text-xs text-gray-700 font-semibold">
        This is the maximum amount you can buy, sell, or pay in one order.
        Increase limit for larger transactions in{" "}
        <TypingAnimation words={["USDC.", "USDT."]} loop />
      </p>
      <div className="flex mt-8">
        <div className="flex-1 flex gap-3">
          <div className="bg-white w-15 flex items-center justify-center rounded-full aspect-square p-2">
            <RiLuggageDepositFill className="text-4xl text-[#5728A6]" />
          </div>
          <div className="">
            <div className="font-semibold">Buy</div>
            <div className="font-extrabold text-3xl bg-linear-to-b from-purple-900 to-purple-300 text-transparent bg-clip-text">
              $100
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-3">
          <div className="bg-white w-15 flex items-center justify-center rounded-full aspect-square p-2">
            <BiMoneyWithdraw className="text-4xl text-[#5728A6]" />
          </div>
          <div className="">
            <div className="font-semibold">Sell/Pay</div>
            <div className="font-extrabold text-3xl bg-linear-to-b from-purple-900 to-purple-300 text-transparent bg-clip-text">
              $100
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/limit")}
        className="mt-3 w-full bg-[#5728A6] py-2 rounded-lg font-bold text-white hover:bg-black transition ease-in-out duration-300 cursor-pointer"
      >
        Increase Transaction Limit
      </button>
    </div>
  );
};

export default TrxCard;
