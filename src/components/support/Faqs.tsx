import React from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaGreaterThan } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoRocket } from "react-icons/io5";
import { PiHandDepositFill } from "react-icons/pi";
import { SlBadge } from "react-icons/sl";
import { Search } from "lucide-react";

const Data = [
  { icon: IoRocket, tag: "Getting Started" },
  { icon: IoMdSettings, tag: "General" },
  { icon: SlBadge, tag: "My Limits" },
  { icon: PiHandDepositFill, tag: "Deposite & Withdrawals" },
  { icon: GiTwoCoins, tag: "Refer & Earn" },
  { icon: CgArrowsExchangeAltV, tag: "Transactions" },
];

const Faqs: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex justify-between hover:scale-105 transition ease-in-out duration-300 cursor-pointer items-center bg-gray-200 text-gray-600 font-semibold px-3 py-3 rounded-lg">
        Type your question here... <Search size={18} />
      </div>
      {Data.map((item, index) => (
        <div
          key={index}
          className="flex items-center px-2 py-3 rounded justify-between cursor-pointer hover:bg-gray-200 transition ease-in-out duration-300"
        >
          <div className="flex items-center gap-3">
            <item.icon size={20} className="text-[#5728A6]" />
            <div className="text-sm font-semibold">{item.tag}</div>
          </div>
          <FaGreaterThan size={12} className="text-[#5728A6]" />
        </div>
      ))}
    </div>
  );
};

export default Faqs;
