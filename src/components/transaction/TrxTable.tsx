import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { Spinner } from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

interface Transaction {
  amount: number; //
  type: string; //
  trans_id: string; //
  transaction_type: "USDT" | "USDC";
  transaction_hash: string;
  payment_method: string;
}

const TrxTable: React.FC = () => {
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(1);
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const baseUrl = useSelector((state: RootState) => state?.consts?.baseUrl);
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const token = useSelector((state: RootState) => state?.user?.token);

  async function fetchTransactions() {
    try {
      setloading(true);
      const response = await axios.post(
        `${baseUrl}/transactions-list`,
        {
          user_id: userData?.id,
          count,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);

      if (response.data.status == "false") {
        setTransaction([]);
        return;
      }

      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [count]);

  return (
    <div
      className={`flex flex-col  gap-2 overflow-hidden my-15 ${transaction.length !== 10 ? "h-fit":"min-h-118"}`}
    >
      {loading ? (
        <div className="h-full flex-1 bg-gray-200 rounded-lg flex justify-center items-center gap-2 py-30">
          <Spinner className="size-6" /> Loading...
        </div>
      ) : transaction.length == 0 ? (
        <div className="h-full bg-gray-200 flex-1 flex justify-center rounded-lg items-center gap-2">
          No Data Found.
        </div>
      ) : (
        <div className="max-h-130 border rounded-lg overflow-x-auto">
          <Table className="">
            <TableCaption>
              <div className="flex justify-between mx-1 mb-2">
                <button
                  onClick={() => {
                    setCount((prev) => prev - 1);
                  }}
                  disabled={count == 1}
                  className="border-2 px-3 rounded cursor-pointer border-[#5728A6] hover:bg-black hover:border-black disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:border-[#5728A6] disabled:hover:bg-[#5728A6] text-white bg-[#5728A6] transtion ease-in-out duration-300"
                >
                  Prev
                </button>
                <div>A list of your recent transactions.</div>
                <button
                  disabled={transaction.length !== 10}
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}
                  className="border-2 px-3 rounded cursor-pointer border-[#5728A6] hover:bg-black hover:border-black disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:border-[#5728A6] disabled:hover:bg-[#5728A6] text-white bg-[#5728A6] transtion ease-in-out duration-300"
                >
                  Next
                </button>
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Trx Id</TableHead>
                <TableHead>Trx Type</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaction.map((item, index) => {
                return (
                  <TableRow className="odd:bg-gray-200" key={index}>
                    <TableCell>{item?.trans_id ?? "-"}</TableCell>
                    <TableCell>
                      {item?.payment_method?.toString()?.toUpperCase() ?? "-"}
                    </TableCell>
                    <TableCell>
                      {item?.type[0].toUpperCase() + item?.type.slice(1)}
                    </TableCell>
                    <TableCell>${item?.amount ?? "-"}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      {item?.transaction_hash && <ExternalLink size={14} />}
                      {item?.transaction_hash
                        ? item?.transaction_hash.slice(0, 6) +
                          "..." +
                          item?.transaction_hash.slice(-6)
                        : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TrxTable;
