import React from "react";

const TrxCard: React.FC = () => {
  return (
    <div className="card border-b-2 border-r border-[#5728A6]  bg-[#ebe5f7] shadow-xl rounded-lg">
      <div className="bg-[#c3afec] px-3 md:px-5 rounded-lg py-5">
        <div className="font-semibold text-lg">Your Activity</div>
        <p className="text-xs text-gray-700 font-semibold txt">
          Non-cancelled transactions from this month
        </p>
      </div>
      <div className="px-3 md:px-5 rounded-lg py-3 text-center grid grid-cols-3">
        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
          <div className="text-xs font-semibold text-gray-600">
            Buy Volume USDT
          </div>
        </div>
        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
          <div className="text-xs font-semibold text-gray-600">
            Sell & Pay Volume USDT
          </div>
        </div>
        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
          <div className="text-xs font-semibold text-gray-600">
            Successful USDT Trx.
          </div>
        </div>

        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
          <div className="text-xs font-semibold text-gray-600">
            Buy Volume USDC
          </div>
        </div>
        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
          <div className="text-xs font-semibold text-gray-600">
            Sell & Pay Volume USDC
          </div>
        </div>
        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
          <div className="text-xs font-semibold text-gray-600">
            Successful USDC Trx.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrxCard;
