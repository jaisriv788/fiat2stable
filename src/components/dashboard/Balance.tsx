import React from "react";

const Balance: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-lg font-semibold text-gray-700">
        Available Balance
      </div>
      <div className="font-extrabold text-5xl">$0.00</div>
      <div className="font-semibold text-lg">~ ₹0.00</div>
    </div>
  );
};

export default Balance;
