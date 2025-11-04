import type { RootState } from "@/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Activity {
  buy_volume_usdc: string;
  buy_volume_usdt: string;
  complete_transaction: string;
  sell_pay_volume_usdc: string;
  sell_pay_volume_usdt: string;
}

const TrxCard: React.FC = () => {
  const [data, setData] = useState<Activity | null>(null);

  const baseUrl = useSelector((state: RootState) => state?.consts?.baseUrl);
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const token = useSelector((state: RootState) => state?.user?.token);

  async function fetchActivity() {
    try {
      const response = await axios.post(
        `${baseUrl}/user-current-volume`,
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
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="card border-b-2 border-r border-[#5728A6]  bg-[#ebe5f7] shadow-xl rounded-lg">
      <div className="bg-[#c3afec] px-3 md:px-5 rounded-lg py-5">
        <div className="font-semibold text-lg">Your Activity</div>
        <p className="text-xs text-gray-700 font-semibold txt">
          Non-cancelled transactions from this month
        </p>
      </div>
      <div className="px-3 md:px-5 rounded-lg py-3 text-center grid grid-cols-3">
        <div className="col-span-2 grid grid-cols-2">
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">
              {data ? data.buy_volume_usdt : "0"}
            </div>
            <div className="text-xs font-semibold text-gray-600">
              Buy Volume USDT
            </div>
          </div>
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">
              {data ? data.sell_pay_volume_usdt : "0"}
            </div>
            <div className="text-xs font-semibold text-gray-600">
              Sell & Pay Volume USDT
            </div>
          </div>
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">
              {data ? data.buy_volume_usdc : "0"}
            </div>
            <div className="text-xs font-semibold text-gray-600">
              Buy Volume USDC
            </div>
          </div>
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">
              {data ? data.sell_pay_volume_usdc : "0"}
            </div>
            <div className="text-xs font-semibold text-gray-600">
              Sell & Pay Volume USDC
            </div>
          </div>
        </div>
        <div>
          <div className="font-extrabold text-4xl text-[#5728A6]">
            {data ? data.complete_transaction : "0"}
          </div>
          <div className="text-xs font-semibold text-gray-600">
            Successful USDC Trx.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrxCard;
