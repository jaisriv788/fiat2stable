import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router";
import { referAndEarnFaq } from "@/Data/faq";

const Refer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-24 sm:mt-30 px-2 flex flex-col gap-2 max-w-lg mx-auto">
      <div className="text-xl font-bold">
        Refer your friends & Earn 1% of their volume
      </div>

      <div className="card mt-6 px-3 md:px-5 border-b-2 border-r border-[#5728A6] py-5 bg-[#ebe5f7] shadow-xl rounded-lg">
        <div className="font-semibold text-lg">Refer & Earn</div>
        <p className="text-xs text-gray-700 font-semibold txt">
          Share your referral link with friends and earn 1% every time they
          trade.
        </p>
        <div className="py-3 px-3 mt-3 bg-white rounded-lg">
          <div className="font-semibold text-sm">Invite via referral link</div>
          <button className="bg-[#5728A6] font-semibold cursor-pointer text-white w-full py-2 rounded-lg mt-3 hover:bg-black transition ease-in-out duration-300">
            Generate Link
          </button>
        </div>
        <div className="py-3 px-3 bg-white rounded-lg mt-3 flex items-center">
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-700">
              Claimable Rewards
            </div>
            <div className="text-[#5728A6] font-extrabold text-lg">0 USDC</div>
          </div>
          <button className="bg-[#5728A6] font-semibold cursor-pointer text-white  py-1.5 px-3 rounded-lg hover:bg-black transition ease-in-out duration-300">
            Claim
          </button>
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
          {referAndEarnFaq.slice(0, 3).map((item) => (
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

export default Refer;
