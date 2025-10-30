import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextAnimate } from "../ui/text-animate";
import { ShimmerButton } from "../ui/shimmer-button";
import { useNavigate } from "react-router";
import { Menu } from "lucide-react";
import { setSidebar } from "@/store/slices/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

const Navbar: React.FC = () => {
  const [showSelling, setShowSelling] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.model.showSidebar
  );

  useEffect(() => {
    const interval = setInterval(() => setShowSelling((prev) => !prev), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shadow-md shadow-[#ddd4ee] fixed top-0 left-0 bg-white w-full z-30">
      <div className="max-w-lg mx-auto py-4 px-2 flex justify-between items-center">
        {" "}
        <div className="text-xl font-bold flex gap-1 items-center relative">
          <Menu
            onClick={() => {
              dispatch(setSidebar({ showSidebar: !isSidebarVisible }));
            }}
            className="md:absolute -left-10 cursor-pointer"
          />
          <div
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img
              className="logo rotate-15"
              src="/login/icon2.svg"
              alt="icon"
              width={30}
            />
            <TextAnimate>XYZ.Me</TextAnimate>
          </div>
        </div>
        <ShimmerButton
          disabled
          className="shadow-2xl flex gap-1 items-center relative overflow-hidden"
        >
          <div className="w-4 h-4 bg-purple-50 rounded-full flex items-center justify-center">
            <div
              className="w-2.5 h-2.5 bg-[#5728A6] rounded-full animate-ping"
              style={{ animationDuration: "1.4s" }}
            ></div>
          </div>

          <div className="relative w-[150px] h-5 overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
              {showSelling ? (
                <motion.span
                  key="selling"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute text-center text-sm leading-none font-medium tracking-tight text-white"
                >
                  Selling Price - ₹100.00
                </motion.span>
              ) : (
                <motion.span
                  key="buying"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute text-center text-sm leading-none font-medium tracking-tight text-white"
                >
                  Buying Price - ₹100.00
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
