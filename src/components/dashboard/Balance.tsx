import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";

const Balance: React.FC = () => {
  const baseUrl = useSelector((state: RootState) => state.consts.baseUrl);
  const userData = useSelector((state: RootState) => state.user.userData);
  const token = useSelector((state: RootState) => state?.user?.token);

  const fetchBalance = async () => {
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

    console.log(response.data);
  };
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="txt text-lg font-semibold text-gray-700">
        Available Balance
      </div>
      <div className="font-extrabold text-5xl">$0.00</div>
      <div className="font-semibold text-lg">~ ₹0.00</div>
    </div>
  );
};

export default Balance;
