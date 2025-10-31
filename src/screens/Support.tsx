import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import Faqs from "@/components/support/Faqs";

const Support: React.FC = () => {
  return (
    <div className="mt-24 sm:mt-30 px-2 flex flex-col gap-7 max-w-lg mx-auto">
      <div>
        <div className="font-bold mb-2 text-lg">FAQs</div>
        <Faqs />
      </div>

      <div className="flex items-center text-sm justify-between bg-gray-200 px-3 py-3 rounded-lg">
        <div className="font-bold ">Need Help?</div>
        <button
          onClick={() => {
            window.open("https://telegram.org/", "_");
          }}
          className="font-semibold cursor-pointer transition ease-in-out duration-300 hover:bg-[#5728A6] hover:text-white hover:border-[#5728A6] text-[#5728A6] flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[#5728A6]"
        >
          <IoChatbubbleEllipses /> Chat with us. →
        </button>
      </div>

      <div>
        <div className="font-semibold">Find us on</div>
        <div className="flex gap-3 mt-2">
          <RiTwitterXFill
            onClick={() => window.open("https://x.com/", "_")}
            className="text-2xl cursor-pointer text-[#5728A6] hover:text-black transition ease-in-out duration-300"
          />
          <FaTelegramPlane
            onClick={() => window.open("https://telegram.org/", "_")}
            className="text-2xl cursor-pointer text-[#5728A6] hover:text-black transition ease-in-out duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
