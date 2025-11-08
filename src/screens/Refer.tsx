import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router";
import { referAndEarnFaq } from "@/Data/faq";
import { Spinner } from "@/components/ui/spinner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Copy } from "lucide-react";

const Refer: React.FC = () => {
  const [generateLink, setGenerateLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state: RootState) => state.user.userData);

  const navigate = useNavigate();

  const handleGenerateLink = () => {
    setLoading(true);

    setTimeout(() => {
      setGenerateLink(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mt-24 px-2 flex flex-col gap-2 max-w-lg mx-auto">
      <div className="text-xl font-bold">
        Refer your friends & Earn {userData.refre_earn}% of their volume
      </div>

      <div className="card mt-6 px-3 md:px-5 border-b-2 border-r border-[#4D43EF] py-5  bg-linear-to-br from-[#7728E2] via-[#5C5AD7] to-[#22BDCF] shadow-xl rounded-lg">
        <div className="font-semibold text-lg text-white">Refer & Earn</div>
        <p className="text-xs text-white font-semibold txt">
          Share your referral link with friends and earn {userData.refre_earn}% every time they
          trade.
        </p>
        <div className="py-3 px-3 mt-3 bg-white rounded-lg">
          <div className="font-bold text-sm">Invite via referral link</div>
          {generateLink ? (
            <div className="flex justify-between text-sm font-semibold mt-3 py-2 bg-[#d7d5fd]  px-2 rounded-lg items-center">
              https://worldofsoftware.in/fiat/{userData.id}{" "}
              <Copy
                className="cursor-pointer hover:text-[#4D43EF] transition ease-in-out duration-300"
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      userData?.id
                        ? String(
                            `https://worldofsoftware.in/fiat/${userData.id}`
                          )
                        : ""
                    )
                    .then(() => {
                      alert("Link copied to clipboard!");
                    })
                    .catch((err) => {
                      console.error("Failed to copy: ", err);
                    });
                }}
                size={15}
              />
            </div>
          ) : (
            <button
              onClick={handleGenerateLink}
              disabled={loading}
              className="bg-[#4D43EF] font-semibold cursor-pointer text-white w-full py-2 rounded-lg mt-3 hover:bg-[#4D43EF]/70 transition ease-in-out duration-300"
            >
              {loading ? (
                <Spinner className="size-6 mx-auto" />
              ) : (
                "Generate Link"
              )}
            </button>
          )}
        </div>
        <div className="py-3 px-3 bg-white rounded-lg mt-3 flex items-center">
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-700">
              Claimable Rewards
            </div>
            <div className="text-[#4D43EF] font-extrabold text-lg">0 USDC</div>
          </div>
          <button className="bg-[#4D43EF] font-semibold cursor-pointer text-white  py-1.5 px-3 rounded-lg hover:bg-[#4D43EF]/70 transition ease-in-out duration-300">
            Claim USDC
          </button>
        </div>
        <div className="py-3 px-3 bg-white rounded-lg mt-3 flex items-center">
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-700">
              Claimable Rewards
            </div>
            <div className="text-[#4D43EF] font-extrabold text-lg">0 USDT</div>
          </div>
          <button className="bg-[#4D43EF] font-semibold cursor-pointer text-white  py-1.5 px-3 rounded-lg hover:bg-[#4D43EF]/70 transition ease-in-out duration-300">
            Claim USDT
          </button>
        </div>
      </div>

      <div className="mt-5 mb-10">
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">FAQs</div>
          <div
            onClick={() => navigate("/support")}
            className="text-[#4D43EF] underline hover:text-blue-800 transition ease-in-out duration-300 font-semibold cursor-pointer"
          >
            See all
          </div>
        </div>{" "}
        <Accordion type="single" collapsible>
          {referAndEarnFaq.slice(0, 3).map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Refer;
