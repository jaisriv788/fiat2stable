import React from "react";
// import { useParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { Copy } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const OrderDetails: React.FC = () => {
  // const { order_id } = useParams<{ order_id: string }>();

  return (
    <div className="mt-24 px-2 flex flex-col gap-2 max-w-lg mx-auto">
      <FaCheckCircle className="text-[110px] mx-auto text-[#493FEE]" />
      <p className="mx-auto font-semibold text-[50px] text-[#493FEE]">₹1.00</p>
      <div className="mt-5 flex flex-col gap-1 border-2 py-3 px-5 rounded-lg">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Order ID</p>
          <p>267117</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Type</p>
          <p>PAY</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">You send</p>
          <p>0.136 USDC</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Fee</p>
          <p>0.125 USDC</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">You receive</p>
          <p>₹1.00</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Paid By</p>
          <p className="flex items-center gap-2">
            teja.e3-1@oksbi{" "}
            <Copy
              size={15}
              className="cursor-pointer hover:text-gray-500 transition ease-in-out duration-300"
            />
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Paid To</p>
          <p className="flex items-center gap-2">
            6393117559sumit@axl{" "}
            <Copy
              size={15}
              className="cursor-pointer hover:text-gray-500 transition ease-in-out duration-300"
            />
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Completed in</p>
          <p>1m30s</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Completed at</p>
          <p>01 Dec 2025, 05:32 PM</p>
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            The shopkeeper is asking to see the payment – what should I do?
          </AccordionTrigger>
          <AccordionContent>
            1. Copy the merchant's UPI ID from your order.
            <br /> 2. Paste it in your UPI app to see their name. <br /> 3. Tell
            the shopkeeper: "You should've received ₹XXXX from [Name]." <br />{" "}
            4. If they still deny it, contact support — we'll send you a
            screenshot to show them.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex">
        <Button className="flex-1 bg-[#493FEE] hover:bg-[#493FEE]/80 cursor-pointer transition ease-in-out duration-300 ">Return Home</Button>
      </div>
    </div>
  );
};

export default OrderDetails;
