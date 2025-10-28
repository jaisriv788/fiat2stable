import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextAnimate } from "../ui/text-animate";
import { ShimmerButton } from "../ui/shimmer-button";

const Navbar: React.FC = () => {
  const [showSelling, setShowSelling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowSelling((prev) => !prev), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shadow-md shadow-[#ddd4ee] fixed top-0 left-0 bg-white w-full z-50">
      <div className="max-w-lg mx-auto py-4 px-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold flex gap-1 items-center">
          <img
            className="logo rotate-15"
            src="/login/icon2.svg"
            alt="icon"
            width={30}
          />
          <TextAnimate>XYZ.Me</TextAnimate>
        </div>

        {/* Shimmer Button */}
        <ShimmerButton disabled className="shadow-2xl flex gap-1 items-center relative overflow-hidden">
          {/* Ping dot */}
          <div className="w-4 h-4 bg-purple-50 rounded-full flex items-center justify-center">
            <div
              className="w-2 h-2 bg-[#5728A6] rounded-full animate-ping"
              style={{ animationDuration: "1.4s" }}
            ></div>
          </div>

          {/* Animated price text */}
          <div className="relative w-[120px] h-5 overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
              {showSelling ? (
                <motion.span
                  key="selling"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute text-center text-sm leading-none font-medium tracking-tight text-white lg:text-base"
                >
                  Selling Price - ₹88
                </motion.span>
              ) : (
                <motion.span
                  key="buying"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute text-center text-sm leading-none font-medium tracking-tight text-white lg:text-base"
                >
                  Buying Price - ₹60
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </ShimmerButton>
      </div>
    </div>
  );
};

export default Navbar;
