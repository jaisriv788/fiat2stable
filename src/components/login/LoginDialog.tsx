import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setIsUserConnected } from "@/store/slices/userSlice";
import { Input } from "../ui/input";
import { useShowError } from "@/hooks/useShowError";
import { useShowSuccess } from "@/hooks/useShowSuccess";

export function LoginDialog() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [view, setView] = useState(0);
  const [otp, setOtp] = useState("");

  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const handleGoogleLogin = () => {
    navigate("/dashboard");
    dispatch(setIsUserConnected({ isConnected: true }));
  };

  //.................................................................................

  const sendOtpEmail = () => {
   
    // setOtpSent(true);
  };

  const handleEmailVerification = () => {
    console.log(otp);
    // navigate("/dashboard");
    // dispatch(setIsUserConnected({ isConnected: true }));
  };

  //...................................................................................

  //.................................................................................

  const sendOtpNumber = () => {
    setOtpSent(true);
  };

  const handleNumberVerification = () => {
    console.log(otp);
    // navigate("/dashboard");
    // dispatch(setIsUserConnected({ isConnected: true }));
  };

  //.................................................................................

  const handleOptionClick = (option: number) => {
    setView(option);
  };

  const handleBack = () => {
    setView(0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setOtp("");
          setView(0);
          setOtpSent(false);
          setEmail("");
          setNumber("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full bg-[#5728A6] cursor-pointer transition ease-in-out duration-300">
          Login
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        <DialogHeader>
          {view != 0 ? (
            <DialogTitle className="flex items-center font-bold gap-2">
              <IoMdArrowRoundBack
                className="cursor-pointer hover:text-[#5728A6] transition ease-in-out duration-300"
                onClick={handleBack}
              />
              <img
                className="logo rotate-15"
                src="/fiat/login/icon2.svg"
                alt="icon"
                width={25}
              />
              OTP
            </DialogTitle>
          ) : (
            <DialogTitle className="flex items-center font-bold gap-2">
              <img
                className="logo rotate-15"
                src="/fiat/login/icon2.svg"
                alt="icon"
                width={25}
              />
              Login
            </DialogTitle>
          )}
          {view == 1 ? (
            <DialogDescription>
              Enter the OTP sent to your Email.
            </DialogDescription>
          ) : view == 2 ? (
            <DialogDescription>
              Enter the OTP sent to your Phone Number.
            </DialogDescription>
          ) : (
            <DialogDescription>
              Choose your preferred login method below.
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Conditional rendering based on view */}
        {view === 0 && (
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={handleGoogleLogin}
              className="relative flex items-center justify-center cursor-pointer w-full py-6 border border-gray-300 bg-white rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 ease-in-out"
            >
              {/* Google "G" logo (SVG) */}
              <svg
                className="absolute left-4 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.94 0 7.47 1.5 10.23 3.97l7.61-7.61C37.24 1.9 30.97 0 24 0 14.62 0 6.53 5.05 2.48 12.46l8.9 6.92C13.1 13.67 18.14 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.98 24.5c0-1.57-.14-3.08-.41-4.54H24v9.04h12.97c-.56 2.96-2.2 5.46-4.66 7.14l7.2 5.59c4.19-3.87 6.47-9.57 6.47-16.23z"
                />
                <path
                  fill="#4A90E2"
                  d="M9.37 28.62a14.42 14.42 0 0 1-.76-4.62c0-1.6.27-3.14.76-4.62l-8.9-6.92A23.933 23.933 0 0 0 0 24c0 3.89.93 7.56 2.48 10.92l8.9-6.92z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 48c6.48 0 11.9-2.13 15.86-5.77l-7.2-5.59c-2.01 1.35-4.6 2.15-8.66 2.15-5.86 0-10.9-4.17-12.62-9.88l-8.9 6.92C6.53 42.95 14.62 48 24 48z"
                />
              </svg>

              <span className="font-medium text-gray-700 text-base">
                Sign in with Google
              </span>
            </Button>

            <Button
              onClick={() => handleOptionClick(1)}
              className="flex items-center py-6 justify-center cursor-pointer gap-2 bg-[#5728A6] hover:bg-[#3f1c7a] text-white transition ease-in-out duration-300"
            >
              <MdEmail className="text-lg" /> Login with Email
            </Button>

            <Button
              onClick={() => handleOptionClick(2)}
              className="flex items-center justify-center cursor-pointer gap-2 py-6 bg-black hover:bg-gray-800 text-white transition ease-in-out duration-300"
            >
              <MdPhoneIphone className="text-lg" /> Login with Phone Number
            </Button>
          </div>
        )}

        {/* Email Login View */}
        {view === 1 && (
          <div className="flex flex-col items-center justify-center text-2xl font-semibold">
            {!otpSent ? (
              <>
                <Input
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter You Email..."
                  type="email"
                />
                <button
                  onClick={sendOtpEmail}
                  className="text-base my-3 bg-[#5728A6] text-white w-full py-2 rounded-lg hover:bg-black cursor-pointer transition ease-in-out duration-300"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value.replace(/\D/g, ""))}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <button
                  onClick={handleEmailVerification}
                  className="text-base mt-5 bg-[#5728A6] text-white w-full py-2 rounded-lg hover:bg-black cursor-pointer transition ease-in-out duration-300"
                >
                  Confirm OTP
                </button>
              </>
            )}
          </div>
        )}

        {/* Phone Login View */}
        {view === 2 && (
          <div className="flex flex-col items-center justify-center text-2xl font-semibold">
            {!otpSent ? (
              <>
                <Input
                  value={number}
                  type="tel"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    setNumber(numericValue);
                  }}
                  placeholder="Enter You Phone Number..."
                  className=""
                />
                <button
                  onClick={sendOtpNumber}
                  className="text-base my-3 bg-[#5728A6] text-white w-full py-2 rounded-lg hover:bg-black cursor-pointer transition ease-in-out duration-300"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value.replace(/\D/g, ""))}
                  type="number"
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <button
                  onClick={handleNumberVerification}
                  className="text-base mt-5 bg-[#5728A6] text-white w-full py-2 rounded-lg hover:bg-black cursor-pointer transition ease-in-out duration-300"
                >
                  Confirm OTP
                </button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
