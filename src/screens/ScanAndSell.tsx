import React, { useEffect, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaRegCreditCard } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import { FaBackspace } from "react-icons/fa";

type Currency = "INR" | "USDT" | "USDC";

type Pair = {
  from: Currency;
  to: Currency;
};
type Amounts = Record<Currency, string>;

const ScanAndSell: React.FC = () => {
  const [pair, setPair] = useState<Pair>({ from: "USDT", to: "INR" });
  const [amounts, setAmounts] = useState<Amounts>({
    INR: "0",
    USDT: "0",
    USDC: "0",
  });

  useEffect(() => {
    if (amounts[pair.from] == "0") {
      setAmounts((prev) => {
        return {
          ...prev,
          [pair.to]: "",
        };
      });
    } else {
      setAmounts((prev) => {
        return {
          ...prev,
          [pair.to]: parseFloat(amounts[pair.from]) + 1,
        };
      });
    }
  }, [amounts[pair.from]]);

  const handleSwap = () => {
    setPair(({ from, to }) => ({ from: to, to: from }));
  };

  const updateAmount = (value: string) => {
    if (value == "0" && amounts[pair.from] == "0") return;

    if (amounts[pair.from].split("").includes(".") && value == ".") return;

    setAmounts((prev) => {
      const current = prev[pair.from];

      let updated: string;

      if (current === "0" && value === ".") {
        updated = "0.";
      } else if (current === "0") {
        updated = value;
      } else {
        updated = current + value;
      }
      return {
        ...prev,
        [pair.from]: updated,
      };
    });
  };

  function backspace() {
    if (amounts[pair.from] === "0") return;

    if (amounts[pair.from].length == 1) {
      setAmounts((prev) => {
        return {
          ...prev,
          [pair.from]: "0",
        };
      });
      return;
    }

    const editedValue = amounts[pair.from].slice(
      0,
      amounts[pair.from].length - 1
    );
    setAmounts((prev) => {
      return {
        ...prev,
        [pair.from]: editedValue,
      };
    });
  }

  function handleClear() {
    setAmounts((prev) => {
      return {
        ...prev,
        [pair.from]: "0",
      };
    });
  }

  const Keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg overflow-hidden w-full px-2">
        <div className="text-center">
          <div className="font-bold text-xl">
            <span className="text-5xl font-extrabold text-purple-400 ">
              {amounts[pair.from]}
            </span>{" "}
            {pair.from}
          </div>
          <div className="mt-2 text-lg gap-2 w-fit flex mx-auto font-semibold items-center">
            <CgArrowsExchangeAltV
              onClick={handleSwap}
              className="bg-purple-300 cursor-pointer rounded-full p-.5 text-2xl text-purple-700"
            />{" "}
            {amounts[pair.to] !== "0" && amounts[pair.to]} {pair.to}
          </div>
        </div>
        <div className="bg-purple-200 cursor-pointer hover:scale-105 transition ease=in-out duration-300 rounded-lg items-center py-3 px-2 my-8 md:my-10 flex justify-center gap-3">
          <FaRegCreditCard className="text-xl text-purple-800" />
          <span className="font-semibold text-sm">
            Your Transaction Limit :{" "}
            <span className=" text-purple-800">0 USDT/USDC</span>
          </span>
          <FaGreaterThan className="text-sm text-gray-600" />
        </div>
        <div className="grid grid-cols-3 text-center font-semibold text-2xl">
          {Keys.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => updateAmount(item)}
                className="hover:bg-gray-200 cursor-pointer transition ease-in-out duration-300 py-2"
              >
                {item}
              </div>
            );
          })}

          <div
            onClick={backspace}
            className="flex items-center justify-center py-2 hover:bg-gray-200 cursor-pointer transition ease-in-out duration-300"
          >
            <FaBackspace />
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          <button className="cursor-pointer flex-1 text-purple-800 hover:bg-gray-300 py-2 rounded-lg transition ease-in-out duration-300 font-semibold">
            Max
          </button>
          <button
            onClick={handleClear}
            className="cursor-pointer flex-1 text-purple-800 hover:bg-gray-300 py-2 rounded-lg transition ease-in-out duration-300 font-semibold"
          >
            Clear
          </button>
        </div>
        <div>
          <button
            disabled
            className="w-full mt-5 disabled:bg-[#5728A6]/60 disabled:cursor-not-allowed bg-[#5728A6] text-white font-semibold py-4 md:py-3 rounded-lg hover:bg-black transition ease-in-out duration-300 cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanAndSell;
