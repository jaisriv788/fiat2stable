import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { setSidebar } from "@/store/slices/modelSlice";
import { setIsUserConnected } from "@/store/slices/userSlice";
import { AnimatePresence, motion } from "motion/react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { TbTransactionRupee } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
// import { IoMdSettings } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { ImConnection } from "react-icons/im";
import { useNavigate } from "react-router";
import { setConnectionSlider } from "@/store/slices/modelSlice";
// import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar: React.FC = () => {
  const isOnline = useOnlineStatus();

  const navigate = useNavigate();

  const Data = [
    {
      id: 1,
      icon: SlBadge,
      tag: "My Limit",
      click: () => {
        navigate("/limit");
      },
    },
    {
      id: 2,
      icon: TbTransactionRupee,
      tag: "Transaction",
      click: () => {
        navigate("/transaction");
      },
    },
    {
      id: 3,
      icon: GiReceiveMoney,
      tag: "Refer & Earn",
      click: () => {
        navigate("/refer");
      },
    },
    {
      id: 4,
      icon: BiSupport,
      tag: "Help & Support",
      click: () => {
        navigate("/support");
      },
    },
    // {
    //   id: 5,
    //   icon: IoMdSettings,
    //   tag: "Settings",
    //   click: () => {
    //     navigate("/settings");
    //   },
    // },
    {
      id: 6,
      icon: ImConnection,
      tag: "Connection Status",
    },
  ];

  const username = useSelector((state: RootState) => state.user.username);
  const isSideBarVisible = useSelector(
    (state: RootState) => state.model.showSidebar
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleClose() {
    dispatch(setSidebar({ showSidebar: false }));
  }

  function handleLogout() {
    dispatch(setIsUserConnected({ isConnected: false }));
    handleClose();
  }

  return (
    <AnimatePresence mode="wait">
      {isSideBarVisible && (
        <motion.div
          key="sidebar-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md"
        >
          <motion.div
            key="sidebar"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-100 border-r slider border-gray-300 h-full top-0  w-75 flex flex-col"
          >
            <div className="px-5 py-5 md:py-4 border-b border-gray-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="logo rotate-15"
                  src="/fiat/login/icon2.svg"
                  alt="icon"
                  width={28}
                />
                <div className="font-bold">XYZ.Me</div>
              </div>
              <IoCloseCircleSharp
                onClick={handleClose}
                className="text-xl hover:text-red-700 transition ease-in-out duration-300 cursor-pointer"
              />
              {/* <ThemeSwitcher /> */}
            </div>
            <div className="flex-1 py-5 md:py-4 flex flex-col gap-2">
              {Data.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      item.click?.();
                      if (item.id !== 6) {
                        handleClose();
                      } else {
                        console.log("Opening connection slider");
                        dispatch(
                          setConnectionSlider({ showConnectionSlider: true })
                        );
                      }
                    }}
                    className="txt2 flex items-center px-5 justify-between cursor-pointer transition ease-in-out duration-300 hover:bg-gray-300 py-3"
                  >
                    <div className="flex items-center gap-3 font-semibold">
                      <item.icon className="text-2xl text-[#5728A6]" />
                      <div className="text-base">{item.tag}</div>
                    </div>
                    <div>
                      {item.id == 6 ? (
                        <div
                          className={`w-4 h-4  ${
                            isOnline ? "bg-green-300" : "bg-red-300"
                          } rounded-full flex items-center justify-center`}
                        >
                          <div
                            className={`w-2.5 h-2.5 ${
                              isOnline ? "bg-green-600" : "bg-red-600"
                            } rounded-full animate-ping`}
                            style={{ animationDuration: "1.4s" }}
                          ></div>
                        </div>
                      ) : (
                        <FaArrowRightLong />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-gray-300">
              <div className="bg-[#ddd5ff] card p-2 rounded-lg shadow-lg font-semibold flex gap-3 items-center">
                <div className="bg-[#5728A6] aspect-square w-7 font-semibold text-white rounded-full flex items-center justify-center">
                  T
                </div>
                <div>
                  <div className="text-sm">Logged in Via</div>
                  <div className="text-xs">{username}</div>
                </div>
              </div>
              <div className="mt-5 mb-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">Find Us On</div>
                  <div className="flex gap-3 mt-2">
                    <RiTwitterXFill
                      onClick={() => window.open("https://x.com/", "_")}
                      className="text-2xl txt3 cursor-pointer text-[#5728A6] hover:text-black transition ease-in-out duration-300"
                    />
                    <FaTelegramPlane
                      onClick={() => window.open("https://telegram.org/", "_")}
                      className="text-2xl txt3 cursor-pointer text-[#5728A6] hover:text-black transition ease-in-out duration-300"
                    />
                  </div>
                </div>
                <div>
                  <IoLogOut
                    onClick={handleLogout}
                    className="text-3xl txt3 cursor-pointer  text-[#5728A6] hover:text-black transition ease-in-out duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
