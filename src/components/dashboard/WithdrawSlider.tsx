import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { setWithdrawSlider } from "@/store/slices/modelSlice";
import { AnimatePresence, motion } from "motion/react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const WithdrawSlider: React.FC = () => {
  const isWithdrawSliderVisible = useSelector(
    (state: RootState) => state.model.showWithdrawSlider
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleClose() {
    dispatch(setWithdrawSlider({ showWithdrawSlider: false }));
  }

  return (
    <AnimatePresence mode="wait">
      {isWithdrawSliderVisible && (
        <motion.div
          key="sidebar-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="absolute inset-0 z-50 bg-black/40 backdrop-blur-md"
        >
          <motion.div
            key="sidebar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="absolute py-4 md:py-5 px-5 slider bg-gray-100 border-t-2 rounded-t-xl border-gray-300 z-50 w-full bottom-0"
          >
            <div className="">
              <div className="font-bold text-lg flex items-center justify-between">
                Withdraw Fund{" "}
                <IoCloseCircleSharp
                  onClick={handleClose}
                  className="text-xl hover:text-red-700 transition ease-in-out duration-300 cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-900 txt">
                Send funds from your in app wallet.
              </p>
            </div>

            <div className="flex items-center mt-5 gap-3 md:gap-5 border border-gray-300 p-3 rounded-lg hover:bg-gray-300 transition ease-in-out duration-300 cursor-pointer">
              <FaCircleDollarToSlot className="text-[#5728A6] text-2xl" />
              <div>
                <div className="font-semibold">Withdraw USDT/USDC</div>
                <div className="text-sm txt text-gray-700">
                  Withdraw USDT/USDC from your in app wallet
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="mt-5 bg-[#5728A6] font-semibold text-white w-full py-2 rounded-lg hover:bg-black cursor-pointer transition ease-in-out"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WithdrawSlider;
