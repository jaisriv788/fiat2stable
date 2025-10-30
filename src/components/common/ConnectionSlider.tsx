import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { setConnectionSlider } from "@/store/slices/modelSlice";
import { AnimatePresence, motion } from "motion/react";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const ConnectionSlider: React.FC = () => {
  const isOnline = useOnlineStatus();

  const isConnectionSliderVisible = useSelector(
    (state: RootState) => state.model.showConnectionSlider
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleClose() {
    dispatch(setConnectionSlider({ showConnectionSlider: false }));
  }

  return (
    <AnimatePresence mode="wait">
      {isConnectionSliderVisible && (
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
            className="absolute py-4 md:py-5 px-5 bg-gray-100 border-t-2 rounded-t-xl border-gray-300 z-50 w-full bottom-0"
          >
            <div>
              {isOnline ? (
                <div>
                  <div className="text-center text-lg font-bold flex items-center gap-2 justify-center">
                    You Are Connected
                    <div
                      className={`w-3 h-3 bg-green-300 rounded-full flex items-center justify-center`}
                    >
                      <div
                        className={`w-2 h-2 bg-green-600 rounded-full animate-ping`}
                        style={{ animationDuration: "1.4s" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-semibold text-gray-800">
                    You are connected & everything's working great.
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center text-lg font-bold flex items-center gap-2 justify-center">
                    You Are Disconnected
                    <div
                      className={`w-3 h-3 bg-red-300 rounded-full flex items-center justify-center`}
                    >
                      <div
                        className={`w-2 h-2 bg-red-600 rounded-full animate-ping`}
                        style={{ animationDuration: "1.4s" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-semibold text-gray-800">
                    You are disconnected. Please Connect To Internet.
                  </div>
                </div>
              )}
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

export default ConnectionSlider;
