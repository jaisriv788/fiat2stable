import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaWallet } from "react-icons/fa6";

import { IoMdArrowRoundBack } from "react-icons/io";
import WalletModelMainView from "./WalletModelMainView";
import WalletModelTransactionView from "./WalletModelTransactionView";
import WalletModelAssetsView from "./WalletModelAssetsView";
import Send from "./WalletModelWalletManageView";
import Buy from "./Buy";
import Receive from "./Receive";

const WalletModel: React.FC = () => {
  const [view, setView] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setOpen(false);
          setTimeout(() => {
            setView(0);
          }, 500);
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="border-2 card1 hover:scale-110 hover:rotate-6 hover:bg-purple-50 transition-all ease-in-out duration-300 border-[#5728A6] cursor-pointer text-[#5728A6] hover:scale rounded-md p-3">
          <FaWallet className="text-2xl" />
        </div>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e: Event) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center font-bold gap-2">
            {view == 0 && "App Wallet"}
            {view == 1 && (
              <div className="flex gap-2 items-center">
                <IoMdArrowRoundBack
                  className="cursor-pointer hover:text-[#5728A6] transition ease-in-out duration-300"
                  onClick={() => setView(0)}
                />
                <div>Transactions</div>
              </div>
            )}
            {view == 2 && (
              <div className="flex gap-2 items-center">
                <IoMdArrowRoundBack
                  className="cursor-pointer hover:text-[#5728A6] transition ease-in-out duration-300"
                  onClick={() => setView(0)}
                />
                <div>Assets</div>
              </div>
            )}
            {view == 3 && (
              <div className="flex gap-2 items-center">
                <IoMdArrowRoundBack
                  className="cursor-pointer hover:text-[#5728A6] transition ease-in-out duration-300"
                  onClick={() => setView(0)}
                />
                <div>Send</div>
              </div>
            )}
            {view == 4 && (
              <div className="flex gap-2 items-center">
                <IoMdArrowRoundBack
                  className="cursor-pointer hover:text-[#5728A6] transition ease-in-out duration-300"
                  onClick={() => setView(0)}
                />
                <div>Receive</div>
              </div>
            )}
            {view == 5 && (
              <div className="flex gap-2 items-center">
                <IoMdArrowRoundBack
                  className="cursor-pointer hover:text-[#5728A6] transition ease-in-out duration-300"
                  onClick={() => setView(0)}
                />
                <div>Buy</div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        {view == 0 && <WalletModelMainView setView={setView} />}
        {view == 1 && <WalletModelTransactionView />}
        {view == 2 && <WalletModelAssetsView />}
        {view == 3 && <Send />}
        {view == 4 && <Receive />}
        {view == 5 && <Buy />}
      </DialogContent>
    </Dialog>
  );
};

export default WalletModel;
