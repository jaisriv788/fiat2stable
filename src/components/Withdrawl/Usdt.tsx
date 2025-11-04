import React from "react";
import { Input } from "../ui/input";

interface UsdtProps {
  usdt: string;
  assetsData: {
    total_usdt: string;
    total_usdc: string;
  } | null;
  receiverAddress: string;
  setUsdt: React.Dispatch<React.SetStateAction<string>>;
  setReceiverAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Usdt: React.FC<UsdtProps> = ({
  setUsdt,
  usdt,
  assetsData,
  receiverAddress,
  setReceiverAddress,
}) => {
  return (
    <div>
      <div>
        <img src="usdt.svg" className="w-15 mt-3 aspect-square mx-auto" />
      </div>
      <div className="flex md:flex-row flex-col mt-3 gap-2 px-5 py-3 bg-[#eae2f8] rounded-lg">
        <div className="flex-1">
          <div className="font-semibold">Enter Amount</div>
          <Input
            value={usdt}
            onChange={(e) => setUsdt(e.target.value)}
            placeholder="Enter the amount"
            type="number"
            className="w-full border-gray-400 text-[#5728A6] font-semibold"
          />
          <div className="mt-3 font-semibold text-sm">
            USDT Balance:{" "}
            <span>{parseFloat(assetsData?.total_usdt ?? "0").toFixed(2)}</span>
          </div>{" "}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <button
              onClick={() => {
                const val = parseFloat(assetsData?.total_usdt ?? "0") / 2;
                setUsdt(val.toString());
              }}
              className="md:flex-none flex-1 transition h-fit ease-in-out duration-300 font-semibold bg-white px-5 hover:bg-gray-300 py-2 md:py-1 rounded-lg cursor-pointer "
            >
              50%
            </button>
            <button
              onClick={() => {
                setUsdt(assetsData?.total_usdt ?? "0");
              }}
              className="md:flex-none flex-1 transition h-fit ease-in-out duration-300 font-semibold bg-white px-5 hover:bg-gray-300 py-2 md:py-1 rounded-lg cursor-pointer "
            >
              Max
            </button>
          </div>
          <div className="hidden md:flex  self-center  gap-2 items-center font-bold text-lg">
            <img className="aspect-square w-12" src="usdt.svg" />
            USDT
          </div>
        </div>
      </div>
      <div className="mt-3 bg-[#eae2f8] px-2 py-3 rounded-lg">
        <Input
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          placeholder="Enter the Receiver Address ..."
          className="border-gray-400 text-[#5728A6] font-semibold"
        />
      </div>
    </div>
  );
};

export default Usdt;
