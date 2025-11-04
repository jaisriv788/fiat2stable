import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";

interface Balance {
  total_usdt: string;
  total_inr: string;
}
const Balance: React.FC = () => {
  const [balance, setBalance] = useState<Balance | null>(null);

  const baseUrl = useSelector((state: RootState) => state.consts.baseUrl);
  const userData = useSelector((state: RootState) => state.user.userData);
  const token = useSelector((state: RootState) => state?.user?.token);

  const fetchBalance = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/user-available-balance`,
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

      setBalance(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="txt text-lg font-semibold text-gray-700">
        Available Balance
      </div>
      <div className="font-extrabold text-5xl">
        {" "}
        ${balance ? parseFloat(balance.total_usdt).toFixed(2) : "0.00"}
      </div>
      <div className="font-semibold text-lg">
        ~ ₹{balance ? parseFloat(balance.total_inr).toFixed(2) : "0.00"}
      </div>
    </div>
  );
};

export default Balance;
