import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router";
import { transactionFaq } from "@/Data/faq";

const Transaction: React.FC = () => {
  const data = [];
  const navigate = useNavigate();

  return (
    <div className="mt-24 sm:mt-30 px-2 flex flex-col gap-2 max-w-lg mx-auto">
      <div className="card border-b-2 border-r border-[#5728A6]  bg-[#ebe5f7] shadow-xl rounded-lg">
        <div className="bg-[#c3afec] px-3 md:px-5 rounded-lg py-5">
          <div className="font-semibold text-lg">Your Activity</div>
          <p className="text-xs text-gray-700 font-semibold txt">
            Non-cancelled transactions from this month
          </p>
        </div>
        <div className="px-3 md:px-5 rounded-lg py-3 flex justify-evenly text-center">
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
            <div className="text-xs font-semibold text-gray-600">
              Buy Volume USDC
            </div>
          </div>
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
            <div className="text-xs font-semibold text-gray-600">
              Sell & Pay Volume USDC
            </div>
          </div>
          <div>
            <div className="font-extrabold text-4xl text-[#5728A6]">0</div>
            <div className="text-xs font-semibold text-gray-600">
              Completed Transactions
            </div>
          </div>
        </div>
      </div>

      {data.length == 0 ? (
        <div className="my-18 text-center">No transaction found</div>
      ) : (
        <Table className="my-10">
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

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
          {transactionFaq.slice(0, 3).map((item) => (
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

export default Transaction;
