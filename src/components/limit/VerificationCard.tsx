import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaSquareInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Data = [
  { icon: FaXTwitter, tag: "X", price: "50", bonus: "0.5 " },
  { icon: FaSquareInstagram, tag: "Instagram", price: "50 ", bonus: "0.5" },
  { icon: FaFacebook, tag: "Facebook", price: "50 ", bonus: "0.5" },
  { icon: FaLinkedinIn, tag: "LinkedIn", price: "100 ", bonus: "2" },
  { icon: FaGithub, tag: "GitHub", price: "100 ", bonus: "2" },
];
const VerificationCard: React.FC = () => {
  return (
    <div className="mt-10 flex flex-col gap-5">
      {Data.map((item, index) => (
        <div
          key={index}
          className="border border-gray-400 py-4 px-3 rounded-lg flex items-start"
        >
          <div className="flex-1 flex items-center gap-3">
            <div className="text-[#5728A6] bg-[#e5d7fd] p-3 rounded-full">
              <item.icon size={20} />
            </div>
            <span className="font-semibold text-lg">{item.tag}</span>
          </div>
          <div className="text-right flex flex-col gap-5">
            <div>
              <div className="text-xs font-semibold">
                <span className="text-xl font-bold">${item.price}</span> Limit
              </div>
              <div className="text-xs font-semibold">
                +{item.bonus} USDC/USDT Reward
              </div>
            </div>
            <div>
              <button className="text-sm font-bold border-2 px-7 py-2 rounded-lg text-[#5728A6] border-[#5728A6] cursor-pointer hover:text-white hover:bg-[#5728A6] transition ease-in-out duration-300">
                Get Verified
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerificationCard;
