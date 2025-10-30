import React from "react";
import { FaWallet } from "react-icons/fa6";
import { PiHandWithdrawFill } from "react-icons/pi";
import { PiHandDepositFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import {
  setDepositeSlider,
  setWithdrawSlider,
} from "@/store/slices/modelSlice";
import WalletModel from "./WalletModel";

const Action: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const Data = [
    {
      id: 1,
      icon: FaWallet,
      tag: "Wallet",
      click: () => {
        console.log("Wallet");
      },
    },
    {
      id: 2,
      icon: PiHandDepositFill,
      tag: "Deposite",
      click: () => {
        dispatch(setDepositeSlider({ showDepositeSlider: true }));
      },
    },
    {
      id: 3,
      icon: PiHandWithdrawFill,
      tag: "Withdraw",
      click: () => {
        dispatch(setWithdrawSlider({ showWithdrawSlider: true }));
      },
    },
    {
      id: 4,
      icon: BiSupport,
      tag: "Support",
      click: () => {
        console.log("Support");
      },
    },
  ];

  return (
    <div className="flex justify-between mx-2  max-w-lg  md:gap-10 mt-10">
      {Data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={item.click}
            className="flex flex-col gap-1 items-center"
          >
            {item.id == 1 ? (
              <WalletModel />
            ) : (
              <div className="border-2 hover:scale-110 hover:rotate-6 hover:bg-purple-50 transition-all ease-in-out duration-300 border-[#5728A6] cursor-pointer text-[#5728A6] hover:scale rounded-md p-3">
                <item.icon className="text-2xl" />
              </div>
            )}
            <div className="font-semibold">{item.tag}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Action;
