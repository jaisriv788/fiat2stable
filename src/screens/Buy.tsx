import React, { useEffect, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaRegCreditCard } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import Keypad from "@/components/common/Keypad";
import { useNavigate } from "react-router";
// import { QRCodeCanvas } from "qrcode.react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useShowError } from "@/hooks/useShowError";
import { useShowSuccess } from "@/hooks/useShowSuccess";

// const upiString =
//   "upi://pay?pa=jaisrivastava788@okhdfcbank&pn=Jai%20Srivastava&cu=INR";

type Currency = "INR" | "USDT" | "USDC";

type Pair = {
  from: Currency;
  to: Currency;
};
type Amounts = Record<Currency, string>;

const Buy: React.FC = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState("usdt");
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [order_id, setOrder_Id] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [liveMerchants, setLiveMerchants] = useState(0);
  const { showSuccess } = useShowSuccess();
  const { showError } = useShowError();

  const pair: Pair = { from: token.toUpperCase() as Currency, to: "INR" };
  const [amounts, setAmounts] = useState<Amounts>({
    INR: "0",
    USDT: "0",
    USDC: "0",
  });

  const currentAmount = amounts[pair.from];

  const buyingPrice = useSelector((state: RootState) =>
    token == "usdt" ? state.price.buyingPriceUSDT : state.price.buyingPriceUSDC
  );
  const limit = useSelector((state: RootState) => state.price.limit);
  const baseUrl = useSelector((state: RootState) => state.consts.baseUrl);
  const userData = useSelector((state: RootState) => state.user.userData);
  const tkn = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (amounts[pair.from] == "0") {
      setAmounts((prev) => {
        return {
          ...prev,
          [pair.to]: "",
        };
      });
    } else {
      // console.log(typeof amounts[pair.from], typeof buyingPrice);
      // console.log(parseFloat(amounts[pair.from]) * parseFloat(buyingPrice));

      const price = parseFloat(amounts[pair.from]) * parseFloat(buyingPrice);

      setAmounts((prev) => {
        return {
          ...prev,
          [pair.to]: price,
        };
      });
    }
  }, [currentAmount, token]);

  function formatTime(seconds: number) {
    if (seconds === 0) {
      setOpen(false);
      return;
    }
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    let interval: any;

    if (open) {
      setTimeLeft(300); // reset timer to 5 mins

      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setOpen(false); // auto-close when time ends (optional)
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    let interval: any;

    if (open) {
      interval = setInterval(async () => {
        // console.log(order_id);
        const response = await axios.get(
          `${baseUrl}/check-order-status/${order_id}`,
          {
            headers: {
              Authorization: `Bearer ${tkn}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        if (response.data.order_status == 1) {
          setOpen(false);
          setAmounts({ INR: "0", USDT: "0", USDC: "0" });
          // setToken("usdt");
          showSuccess("Buy Successful.", "")
        }
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [open, order_id]);

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

  async function handleBuy() {
    try {
      setloading(true);
      const response = await axios.post(
        `${baseUrl}/buy-order`,
        {
          user_id: userData?.id,
          amount: amounts[pair.from],
          inr_amount: amounts[pair.to],
          type: token,
        },
        {
          headers: {
            Authorization: `Bearer ${tkn}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setOrder_Id(response?.data?.order_id);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    const fetchLiveMerchants = async () => {
      try {
        const response = await axios.get(`${baseUrl}/live-merchants`);
        setLiveMerchants(response.data.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLiveMerchants();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg overflow-hidden w-full px-2">
        <div className="text-center">
          <div className="flex justify-center gap-3 items-center font-bold text-xl">
            <p className="text-5xl pb-1 font-extrabold text-[#847ef1] ">
              {amounts[pair.from]}
            </p>{" "}
            <Select value={token} onValueChange={setToken}>
              <SelectTrigger className="w-[100px] text-lg">
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="usdt">USDT</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2 text-lg gap-2 w-fit flex mx-auto font-semibold items-center">
            <CgArrowsExchangeAltV
              // onClick={handleSwap}
              className="bg-[#e0defa] cursor-pointer rounded-full p-.5 text-2xl text-[#4D43EF]"
            />{" "}
            {amounts[pair.to] !== "0" && amounts[pair.to]
              ? parseFloat(amounts[pair.to]).toFixed(4)
              : ""}{" "}
            {pair.to}
          </div>
        </div>
        <div className="flex  items-center  gap-2 mt-3 mx-auto w-fit px-6 py-2 rounded-full bg-[#4D43EF]/10 border border-[#4D43EF]/40 font-bold text-[#4D43EF] relative overflow-hidden">
          <div
            className={`w-4 h-4  bg-green-300
               rounded-full flex items-center justify-center`}
          >
            <div
              className={`w-2.5 h-2.5 bg-green-600
                 rounded-full animate-ping`}
              style={{ animationDuration: "1.4s" }}
            ></div>
          </div>
          <span className="animate-[shine_2s_linear_infinite] absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
          <span className="relative z-10">Live Merchants – {liveMerchants}</span>
        </div>

        <style>
          {`
@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`}
        </style>

        <div
          onClick={() => {
            navigate("/limit");
          }}
          className="card bg-[#e0defa] relative cursor-pointer hover:scale-105 transition ease=in-out duration-300 rounded-lg items-center py-3 px-2 my-4 md:my-6 flex justify-center gap-3"
        >
          <FaRegCreditCard className="text-xl text-[#4D43EF]" />
          <span className="font-semibold text-sm">
            Your Buy Limit :{" "}
            <span className=" text-[#4D43EF]">
              {limit?.buy_limit} USDT/USDC
            </span>
          </span>
          <FaGreaterThan
            size={10}
            className="text-sm text-gray-600 absolute right-10"
          />
        </div>

        <Keypad updateAmount={updateAmount} backspace={backspace} />

        <div className="flex gap-3 mt-3">
          {/* <button className="cursor-pointer flex-1 text-purple-800 hover:bg-gray-300 py-2 rounded-lg transition ease-in-out duration-300 font-semibold">
            Max
          </button> */}
          <button
            onClick={handleClear}
            className="cursor-pointer bg-gray-200 flex-1 text-[#4D43EF] hover:bg-gray-300 py-4 md:py-3 rounded-lg transition ease-in-out duration-300 font-semibold"
          >
            Clear
          </button>
        </div>
        <div>
          <button
            disabled={
              // parseFloat(limit?.buy_limit) < 1 ||
              (amounts["USDT"] === "0" && amounts["USDC"] === "0")
            }
            onClick={handleBuy}
            className="w-full mt-5 disabled:bg-[#4D43EF]/60 disabled:cursor-not-allowed bg-[#4D43EF] text-white font-semibold py-4 md:py-3 rounded-lg hover:bg-[#4D43EF]/70 transition ease-in-out duration-300 cursor-pointer"
          >
            {loading ? "Buying..." : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Buy);
