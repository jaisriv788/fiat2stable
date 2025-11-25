import React, { useEffect, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaRegCreditCard } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Keypad from "@/components/common/Keypad";
import { useNavigate } from "react-router";
import axios from "axios";

type Currency = "INR" | "USDT" | "USDC";

type Pair = {
  from: Currency;
  to: Currency;
};
interface Assets {
  total_usdt: string;
  total_usdc: string;
}

type Amounts = Record<Currency, string>;

const ScanAndSell: React.FC = () => {
  const navigate = useNavigate();
  const pair: Pair = { from: "USDT", to: "INR" };
  const [amounts, setAmounts] = useState<Amounts>({
    INR: "0",
    USDT: "0",
    USDC: "0",
  });
  const [assetsData, setAssetsData] = useState<Assets | null>(null);
  //@ts-ignorets ignore
  const [refresh, setRefresh] = useState<boolean>(false);

  const currentAmount = amounts[pair.from];

  const sellingPrice = useSelector(
    (state: RootState) => state.price.sellingPrice
  );
  const limit = useSelector((state: RootState) => state.price.limit);
  const baseUrl = useSelector((state: RootState) => state?.consts?.baseUrl);
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const token = useSelector((state: RootState) => state?.user?.token);

  async function fetchBalance() {
    try {
      const response = await axios.post(
        `${baseUrl}/user-currency-list`,
        {
          user_id: userData?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAssetsData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, [refresh]);

  useEffect(() => {
    if (amounts[pair.from] == "0") {
      setAmounts((prev) => {
        return {
          ...prev,
          [pair.to]: "",
        };
      });
    } else {
      const price = parseFloat(amounts[pair.from]) * parseFloat(sellingPrice);

      setAmounts((prev) => {
        return {
          ...prev,
          [pair.to]: price,
        };
      });
    }
  }, [currentAmount]);

  // const handleSwap = () => {
  //   setPair(({ from, to }) => ({ from: to, to: from }));
  // };

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg overflow-hidden w-full px-2 mt-9">
        <div className="card flex items-center justify-center gap-3 bg-[#e0defa] rounded-lg py-3 font-semibold text-sm">
          <div
            className={`w-4 h-4 bg-indigo-300 rounded-full flex items-center justify-center`}
          >
            <div
              className={`w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping`}
              style={{ animationDuration: "1.4s" }}
            ></div>
          </div>
          Please ask the vendor for the bill amount first.
        </div>

        <div className=" text-center mt-1">
          <div className="font-bold text-xl">
            <span className="text-5xl font-extrabold text-[#847ef1] ">
              {amounts[pair.from]}
            </span>{" "}
            {pair.from}
          </div>
          <div className="mt-2 text-lg gap-2 w-fit flex mx-auto font-semibold items-center">
            <CgArrowsExchangeAltV
              // onClick={handleSwap}
              className="bg-[#e0defa] cursor-pointer rounded-full p-.5 text-2xl text-[#4D43EF]"
            />{" "}
            {amounts[pair.to] !== "0" && amounts[pair.to]} {pair.to}
          </div>
          <div className="font-semibold text-gray-600 mt-3 txt">
            Available Balance:{" "}
            <span className="font-bold text-[#4D43EF]">
              {assetsData?.total_usdt ?? "00.00"} USDT
            </span>
          </div>
        </div>

        <div
          onClick={() => {
            navigate("/limit");
          }}
          className="card bg-[#e0defa] cursor-pointer hover:scale-105 transition ease=in-out duration-300 rounded-lg items-center py-3 px-2 my-2 md:my-3 flex justify-center gap-3"
        >
          <FaRegCreditCard className="text-xl text-[#4D43EF]" />
          <span className="font-semibold text-sm">
            Your Transaction Limit :{" "}
            <span className=" text-[#4D43EF]">
              {limit?.sell_limit} USDT/USDC
            </span>
          </span>
          <FaGreaterThan className="text-sm text-gray-600" />
        </div>

        <Keypad updateAmount={updateAmount} backspace={backspace} />

        <div className="flex gap-3 mt-2">
          <button className="cursor-pointer flex-1 text-[#4D43EF] hover:bg-gray-300 py-2 rounded-lg transition ease-in-out duration-300 font-semibold">
            Max
          </button>
          <button
            onClick={handleClear}
            className="cursor-pointer flex-1 text-[#4D43EF] hover:bg-gray-300 py-2 rounded-lg transition ease-in-out duration-300 font-semibold"
          >
            Clear
          </button>
        </div>

        <div>
          <button
            disabled={
              parseFloat(limit?.buy_limit) < 1 ||
              (amounts["USDT"] == "0" && amounts["USDC"] == "0")
            }
            className="w-full mt-2 disabled:bg-[#4D43EF]/60 disabled:cursor-not-allowed bg-[#4D43EF] text-white font-semibold py-4 md:py-3 rounded-lg hover:bg-[#4D43EF]/70 transition ease-in-out duration-300 cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanAndSell;
