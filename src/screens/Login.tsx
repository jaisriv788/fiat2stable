import React from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { LoginDialog } from "@/components/login/LoginDialog";

const Login: React.FC = () => {

  return (
    <div className="flex min-h-screen ">
      <div className="flex flex-col justify-center items-center flex-1 sm:min-h-screen max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <div className=" text-2xl font-extrabold flex gap-2 items-center">
            <img
              className="logo rotate-15"
              src="/login/icon2.svg"
              alt="icon"
              width={30}
            />
            <TextAnimate> XYZ.Me</TextAnimate>
          </div>
          <TextAnimate className="font-semibold mt-3">
            Swap INR(₹) ↔ USDC/USDT currency instantly
          </TextAnimate>
        </div>
        <div className="my-10 sm:my-15">
          <img src="/login/tx6.svg" width={300} />
        </div>
        <div className="">
          <LoginDialog />
          <p className="text-sm text-center mt-4">
            By logging in, you agree to our{" "}
            <span className="cursor-pointer text-[#5728A6]">
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
