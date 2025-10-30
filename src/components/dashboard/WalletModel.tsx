import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaWallet } from "react-icons/fa6";
import { Copy } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import { BiSolidWallet } from "react-icons/bi";

const Data = [
  { id: 1, tag: "Transactions", icon: IoMenu },
  { id: 2, tag: "View Assets", icon: LuTimerReset },
  { id: 3, tag: "Manage Wallet", icon: BiSolidWallet },
];

const WalletModel: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-2 hover:scale-110 hover:rotate-6 hover:bg-purple-50 transition-all ease-in-out duration-300 border-[#5728A6] cursor-pointer text-[#5728A6] hover:scale rounded-md p-3">
          <FaWallet className="text-2xl" />
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        <form>
          <DialogHeader>
            <DialogTitle className="flex items-center font-bold gap-2">
              App Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex gap-3 ">
              <div className="aspect-square w-10 text-lg rounded-full flex items-center justify-center font-semibold text-white bg-[#5728A6]">
                T
              </div>
              <div>
                <div className="font-semibold flex items-center gap-3">
                  0xA958...85E8{" "}
                  <Copy
                    size={15}
                    className="text-gray-700 cursor-pointer transition ease-in-out duration-300 hover:text-gray-500"
                  />
                </div>
                <div className="text-xs text-gray-700">Smart Account</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {Data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-3 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded transition ease-in-out duration-300"
                  >
                    <item.icon className="text-2xl text-[#5728A6]" />
                    <div className="font-semibold">{item.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModel;
