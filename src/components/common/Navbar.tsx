import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextAnimate } from "../ui/text-animate";
import { ShimmerButton } from "../ui/shimmer-button";
import { useNavigate, useLocation } from "react-router";
import { Menu } from "lucide-react";
import { setSidebar } from "@/store/slices/modelSlice";
import { setSellingPrice, setBuyingPrice } from "@/store/slices/priceSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";

const Navbar: React.FC = () => {
  const [showSelling, setShowSelling] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isSidebarVisible = useSelector(
    (state: RootState) => state.model.showSidebar
  );
  const sellingPrice = useSelector(
    (state: RootState) => state.price.sellingPrice
  );
  const buyingPrice = useSelector(
    (state: RootState) => state.price.buyingPrice
  );

  const isDashboard = location.pathname == "/dashboard";

  const routeTitles: Record<string, string> = {
    "/buy": "Buy USDT/USDC",
    "/sell": "Sell USDT/USDC",
    "/scan": "Scan & Pay",
    "/limit": "My Limit",
    "/transaction": "Transaction",
    "/refer": "Refer & Earn",
    "/support": "Help & Support",
    "/settings": "Settings",
    "/support/gettingstarted": "Help & Support",
    "/support/general": "Help & Support",
    "/support/limits": "Help & Support",
    "/support/deposit&withdraw": "Help & Support",
    "/support/refer&earn": "Help & Support",
    "/support/transactions": "Help & Support",
    "/support/allfaqs": "Help & Support",
  };

  const title = routeTitles[location.pathname];

  const showHelp: Record<string, boolean> = {
    "/buy": true,
    "/sell": true,
    "/scan": true,
    "/limit": true,
    "/transaction": true,
    "/refer": true,
    "/support": false,
    "/settings": false,
    "/support/gettingstarted": false,
    "/support/general": false,
    "/support/limits": false,
    "/support/deposit&withdraw": false,
    "/support/refer&earn": false,
    "/support/transactions": false,
    "/support/allfaqs": false,
  };

  const show = showHelp[location.pathname];

  useEffect(() => {
    const interval = setInterval(() => setShowSelling((prev) => !prev), 3500);
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    const buyPrice = parseFloat(buyingPrice) + 1;
    const sellPrice = parseFloat(sellingPrice) + 2;

    // console.log({ buyingPrice, buyPrice, sellingPrice, sellPrice });

    dispatch(setSellingPrice({ sellingPrice: sellPrice.toString() }));
    dispatch(setBuyingPrice({ buyingPrice: buyPrice.toString() }));
  }

  useEffect(() => {
    if (sellingPrice == "0.00" || buyingPrice == "0.00") fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [buyingPrice, sellingPrice]);

  return (
    <nav className="shadow-md shadow-[#ddd4ee] fixed top-0 left-0 bg-white w-full z-30">
      <div className="max-w-lg mx-auto py-4 px-2 flex justify-between items-center">
        {" "}
        <div className="text-xl font-bold flex gap-1 items-center relative">
          {isDashboard ? (
            <Menu
              onClick={() => {
                dispatch(setSidebar({ showSidebar: !isSidebarVisible }));
              }}
              size={30}
              className="md:absolute border hover:bg-gray-100 rounded p-1 -left-10 cursor-pointer hover:text-[#9371cf] transition ease-in-out duration-300"
            />
          ) : (
            <FaArrowLeft
              onClick={() => {
                navigate(-1);
              }}
              size={30}
              className="md:absolute p-1 border rounded-full hover:bg-gray-100 -left-10 cursor-pointer hover:text-[#9371cf] transition ease-in-out duration-300"
            />
          )}
          {isDashboard ? (
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
          ) : (
            <div>{title}</div>
          )}
        </div>
        {isDashboard ? (
          <ShimmerButton
            disabled
            className="btn shadow-2xl flex gap-1 items-center relative overflow-hidden"
          >
            <div className="w-4 h-4 bg-[#d8cdeb] rounded-full flex items-center justify-center">
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
                    Selling Price - ₹{sellingPrice}
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
                    Buying Price - ₹{buyingPrice}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </ShimmerButton>
        ) : (
          show && (
            <div
              onClick={() => navigate("/support")}
              className="navbtn flex items-center gap-2 text-gray-600 border border-gray-300 cursor-pointer transition ease-in-out duration-300 hover:bg-gray-200 font-semibold rounded-full px-3 py-0.5"
            >
              <IoMdHelpCircle />
              Help
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
