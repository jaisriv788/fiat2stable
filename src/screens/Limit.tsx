import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { Progress } from "@/components/ui/progress";
import Verification from "@/components/limit/Verification";
import { useNavigate } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { myLimitsFaq } from "@/Data/faq";

const Limit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-24 sm:mt-30 px-2 flex flex-col gap-2 max-w-lg mx-auto">
      <div className="text-center text-lg font-bold">
        Per Transaction Limits
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex-1  justify-center flex gap-2 md:gap-3">
          <div className="bg-[#f4effd] w-15 flex items-center justify-center rounded-full aspect-square p-2">
            <RiLuggageDepositFill className="text-4xl text-[#5728A6]" />
          </div>
          <div className="">
            <div className="font-semibold">Buy</div>
            <div className="font-extrabold text-3xl bg-linear-to-b from-[#5728A6] to-[#c9b4ee] text-transparent bg-clip-text">
              $100
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center gap-2 md:gap-3">
          <div className="bg-[#eee5fd] w-15 flex items-center justify-center rounded-full aspect-square p-2">
            <BiMoneyWithdraw className="text-4xl text-[#5728A6]" />
          </div>
          <div className="">
            <div className="font-semibold">Sell/Pay</div>
            <div className="font-extrabold text-3xl bg-linear-to-b from-[#5728A6] to-[#c9b4ee] text-transparent bg-clip-text">
              $100
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 px-3 md:px-5 border-b-2 border-r border-[#5728A6] py-5 bg-[#ebe5f7] shadow-xl rounded-lg">
        <div className="font-semibold text-lg">
          Verify at least one social account
        </div>
        <p className="text-xs text-gray-700 font-semibold mt-3">
          Verify at least one social account to grow your limits, unlock ZK
          Aadhaar verification, and keep increasing limits as you complete
          transactions.
        </p>
        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-700">
            Verified socials to unlock
          </p>
          <div className="flex items-center gap-2 mt-3">
            <p className="bg-[#5728A6] text-white font-semibold px-5 rounded-full">
              0/1
            </p>
            <Progress value={0} className="" />
          </div>
        </div>
      </div>
      <Verification />
      <div className="mt-5">
        <div className="font-semibold text-lg">Limit Updates</div>
        <div className="h-30 flex items-center font-semibold text-gray-700">
          No task ledger entries found
        </div>
      </div>

      <div className="mt-5 mb-10">
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">FAQs</div>
          <div
            onClick={() => navigate("/support")}
            className="text-blue-800 underline hover:text-blue-700 transition ease-in-out duration-300 font-semibold cursor-pointer"
          >
            See all
          </div>
        </div>{" "}
        <Accordion type="single" collapsible>
          {myLimitsFaq.slice(0, 3).map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Limit;
