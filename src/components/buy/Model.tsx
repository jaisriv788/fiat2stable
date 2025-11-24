// import React, { useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { X } from "lucide-react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/store/store";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useShowError } from "@/hooks/useShowError";
// import { useShowSuccess } from "@/hooks/useShowSuccess";
// import { Progress } from "@/components/ui/progress";

// const TOTAL_TIME = 300;

// const Model: React.FC<{
//   setOpen: (open: boolean) => void;
//   order_id: string;
//   setAmounts: (amounts: { INR: string; USDT: string; USDC: string }) => void;
//   timeLeft: number;
// }> = ({ setOpen, order_id, setAmounts, timeLeft }) => {
//   const tkn = useSelector((state: RootState) => state.user.token);
//   const baseUrl = useSelector((state: RootState) => state.consts.baseUrl);

//   const { showError } = useShowError();
//   const { showSuccess } = useShowSuccess();

//   const [data, setData] = React.useState(null);
//   const [submitBox, setSubmitBox] = React.useState(false);

//   useEffect(() => {
//     let interval: any;
//     console.log(data);
//     if (open) {
//       interval = setInterval(async () => {
//         // console.log(order_id);
//         const response = await axios.get(
//           `${baseUrl}/check-order-status/${order_id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${tkn}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(response.data);

//         if (response?.data?.order?.status == "merchant_accepted") {
//           setData(response?.data?.order);
//           clearInterval(interval);
//           showSuccess("Request Accepted.", "");
//         }
//         if (response?.data?.order?.status == "rejected_by_all") {
//           setOpen(false);
//           setAmounts({ INR: "0", USDT: "0", USDC: "0" });
//           clearInterval(interval);
//           showError("Request Rejected.", "");
//         }
//       }, 3000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [open, order_id]);

//   async function SubmitProof() {
//     console.log("Submitted");
//   }
//   return (
//     <div className="absolute inset-0  bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
//       <div className="p-6 bg-white rounded-lg relative max-w-lg w-full mx-3">
//         <X
//           onClick={() => setOpen(false)}
//           className="absolute cursor-pointer top-2 right-2"
//         />
//         <div className="text-lg font-semibold">Payment</div>

//         {!submitBox ? (
//           <div className="flex  items-center justify-center">
//             <div className="relative inline-block mx-auto my-5">
//               {data ? (
//                 <QRCodeCanvas
//                   value={`upi://pay?pa=${data?.upi_id}&am=${data?.inr_amount}& cu= INR`}
//                   size={200}
//                   level="H" // High error correction so QR works even with image blocking
//                 />
//               ) : (
//                 <Skeleton className="w-[200px] h-[200px] bg-gray-300" />
//               )}

//               {/* Center Logo */}
//               <img
//                 src="/users/three.png"
//                 alt="logo"
//                 className="absolute rounded-full top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2"
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-sm  font-semibold text-gray-500">
//             Submit Image
//           </div>
//         )}

//         {!data ? (
//           <div className="text-center text-sm  font-semibold text-gray-500">
//             Please Wait
//           </div>
//         ) : (
//           !submitBox && (
//             <div className="text-center text-sm  font-semibold text-gray-500">
//               Scan QR code & pay then click on the proceed button
//             </div>
//           )
//         )}

//         {data &&
//           (!submitBox ? (
//             <button
//               onClick={() => setSubmitBox(true)}
//               className="w-full cursor-pointer bg-[#4D43EF] transition-all duration-300 ease-in-out hover:bg-[#847ef1] text-white py-2 rounded-lg mt-5"
//             >
//               Proceed
//             </button>
//           ) : (
//             <button
//               onClick={SubmitProof}
//               className="w-full cursor-pointer bg-[#4D43EF] transition-all duration-300 ease-in-out hover:bg-[#847ef1] text-white py-2 rounded-lg mt-5"
//             >
//               Sumit Proof
//             </button>
//           ))}

//         <div className="text-center space-y-3">
//           {/* Timer Text */}
//           <div className="text-2xl mt-3 font-bold text-[#4D43EF]">
//             {Math.floor(timeLeft / 60)
//               .toString()
//               .padStart(2, "0")}
//             :{(timeLeft % 60).toString().padStart(2, "0")}
//           </div>

//           {/* Progress Bar */}
//           <Progress
//             value={(timeLeft / TOTAL_TIME) * 100}
//             className="h-2 w-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Model;

import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useShowError } from "@/hooks/useShowError";
import { useShowSuccess } from "@/hooks/useShowSuccess";
import { Progress } from "@/components/ui/progress";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const TOTAL_TIME = 300;

type ModelProps = {
  setOpen: (open: boolean) => void;
  order_id: string;
  setAmounts: (amounts: { INR: string; USDT: string; USDC: string }) => void;
  timeLeft: number;
};

const Model: React.FC<ModelProps> = ({
  setOpen,
  order_id,
  setAmounts,
  timeLeft,
}) => {
  const token = useSelector((state: RootState) => state.user.token);
  const baseUrl = useSelector((state: RootState) => state.consts.baseUrl);

  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const [orderData, setOrderData] = useState<any>(null);
  const [showSubmitBox, setShowSubmitBox] = useState(false);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  // Poll the backend to check order status every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/check-order-status/${order_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const status = response?.data?.order?.status;

        if (status === "merchant_accepted") {
          setOrderData(response.data.order);
          clearInterval(interval);
          showSuccess("Request accepted.", "");
        }

        if (status === "rejected_by_all") {
          clearInterval(interval);
          setOpen(false);
          setAmounts({ INR: "0", USDT: "0", USDC: "0" });
          showError("Request rejected.", "");
        }
      } catch (err) {
        console.error("Order polling failed:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [order_id, baseUrl, token, setOpen, setAmounts, showError, showSuccess]);

  // const handleSubmitProof = async () => {
  //   console.log("Submitted", imageFile, transactionId);
  //   // Handle proof submission logic here
  // };

  async function handleSubmitProof() {
    // if (!imageFile) {
    //   showError("Please upload a screenshot.", "");
    //   return;
    // }
    if (!transactionId.trim()) {
      showError("Please enter a transaction ID.", "");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("order_id", order_id);
      formData.append("upi_reference", transactionId);
      // formData.append("screenshot", imageFile);

      // console.log({ order_id, transactionId, imageFile });
      const response = await axios.post(
        `${baseUrl}/submit-payment-proof`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        showSuccess(
          "Payment proof submitted successfully.",
          "Please wait for the merchant to accept the payment release."
        );
        setOpen(false);
      }
      // setOpen(false);
    } catch (error) {
      console.log(error);
      showError("Something went wrong while submitting.", "");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
      {" "}
      <div className="p-6 bg-white rounded-lg relative max-w-lg w-full mx-3">
        <X
          onClick={() => setOpen(false)}
          className="absolute cursor-pointer top-2 right-2"
        />

        <div className="text-lg font-semibold">Payment</div>

        {/* Content (QR OR Submit Box) */}
        {!showSubmitBox ? (
          <div className="flex items-center justify-center">
            <div className="relative inline-block mx-auto my-5">
              {orderData ? (
                <QRCodeCanvas
                  value={`upi://pay?pa=${orderData?.upi_id}&am=${orderData?.inr_amount}&cu=INR`}
                  size={200}
                  level="H"
                />
              ) : (
                <Skeleton className="w-[200px] h-[200px] bg-gray-300" />
              )}

              {/* Center logo in QR */}
              <img
                src="/users/three.png"
                alt="logo"
                className="absolute rounded-full top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-sm font-semibold text-gray-500">
            <div>
              {/* <div className="space-y-2 mt-3">
                {" "}
                <Label>Upload Screenshot</Label>{" "}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setImageFile(file);
                  }}
                />{" "}
              </div>{" "} */}
              {/* Transaction ID */}{" "}
              <div className="space-y-2 mt-3">
                {" "}
                <Label>Transaction ID</Label>{" "}
                <Input
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />{" "}
              </div>{" "}
            </div>
          </div>
        )}

        {/* Instruction Text */}
        {!orderData ? (
          <div className="text-center text-sm font-semibold text-gray-500">
            Please wait
          </div>
        ) : (
          !showSubmitBox && (
            <div className="text-center text-sm font-semibold text-gray-500">
              Scan QR & pay, then click proceed
            </div>
          )
        )}

        {/* Buttons */}
        {orderData &&
          (!showSubmitBox ? (
            <button
              onClick={() => setShowSubmitBox(true)}
              className="w-full cursor-pointer bg-[#4D43EF] transition-all duration-300 ease-in-out hover:bg-[#847ef1] text-white py-2 rounded-lg mt-5"
            >
              Proceed
            </button>
          ) : (
            <button
              onClick={handleSubmitProof}
              disabled={loading}
              className="w-full cursor-pointer bg-[#4D43EF] transition-all duration-300 ease-in-out hover:bg-[#847ef1] text-white py-2 rounded-lg mt-5"
            >
              {loading ? "Submitting..." : "Submit Proof"}
            </button>
          ))}

        {/* Timer + Progress */}
        <div className="text-center space-y-3 mt-4">
          <div className="text-2xl font-bold text-[#4D43EF]">
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(timeLeft % 60).toString().padStart(2, "0")}
          </div>

          <Progress
            value={(timeLeft / TOTAL_TIME) * 100}
            className="h-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Model;
