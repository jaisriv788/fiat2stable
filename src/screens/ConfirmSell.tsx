// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router";
// import { Html5Qrcode } from "html5-qrcode";
// import type { Html5QrcodeCameraScanConfig } from "html5-qrcode";
// import { motion } from "framer-motion";
// import { Info } from "lucide-react";
// import type { RootState } from "@/store/store";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useShowError } from "@/hooks/useShowError";
// import { useShowSuccess } from "@/hooks/useShowSuccess";

// const QR_REGION_ID = "html5qr-reader-confirm";

// const ConfirmSell: React.FC = () => {
//   const navigate = useNavigate();
//   const { inr, usdt } = useParams<{ inr: string; usdt: string }>();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const token = (query.get("token") || "usdt") as "usdt" | "usdc" | "gbk";

//   const baseUrl = useSelector((state: RootState) => state?.consts?.baseUrl);
//   const userData = useSelector((state: RootState) => state?.user?.userData);
//   const tokenHeader = useSelector((state: RootState) => state?.user?.token);
//   const { showError } = useShowError();
//   const { showSuccess } = useShowSuccess();

//   const [preview, setPreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // QR scanner refs/state
//   const qrRef = useRef<Html5Qrcode | null>(null);
//   const [scannerError, setScannerError] = useState<string | null>(null);
//   const [scannedValue, setScannedValue] = useState<string | null>(null);
//   const [isScanning, setIsScanning] = useState<boolean>(false);
//   const [payLoading, setPayLoading] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   // start scanning automatically on mount (user chose C)
//   useEffect(() => {
//     startScanner();
//     return () => {
//       stopScanner();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const extractUpiId = (qrText: string): string | null => {
//     try {
//       const url = new URL(qrText);
//       if (url.protocol === "upi:") {
//         const pa = url.searchParams.get("pa");
//         return pa; // This is the UPI ID
//       }
//       // Sometimes QR codes might just be text with pa=... in string
//       const match = qrText.match(/pa=([^\&]+)/);
//       if (match) return match[1];
//       return null;
//     } catch {
//       // fallback for non-URL formats
//       const match = qrText.match(/pa=([^\&]+)/);
//       return match ? match[1] : null;
//     }
//   };

//   const startScanner = async () => {
//     setScannerError(null);
//     setScannedValue(null);

//     try {
//       const cameras = await Html5Qrcode.getCameras();
//       if (!cameras || cameras.length === 0) {
//         setScannerError("No camera found on this device.");
//         return;
//       }

//       let chosenCameraId = cameras[0].id;
//       for (const cam of cameras) {
//         const label = (cam.label || "").toLowerCase();
//         if (
//           label.includes("back") ||
//           label.includes("rear") ||
//           label.includes("environment")
//         ) {
//           chosenCameraId = cam.id;
//           break;
//         }
//       }

//       if (qrRef.current) {
//         try {
//           await qrRef.current.stop();
//           qrRef.current.clear();
//         } catch (e) {
//           console.debug(e);
//         }
//         qrRef.current = null;
//       }

//       await new Promise((r) => setTimeout(r, 50));

//       qrRef.current = new Html5Qrcode(QR_REGION_ID, { verbose: false });

//       const config: Html5QrcodeCameraScanConfig = {
//         fps: 10,
//         qrbox: { width: 300, height: 300 },
//       };

//       await qrRef.current.start(
//         chosenCameraId,
//         config,
//         onScanSuccess,
//         onScanError
//       );
//       setIsScanning(true);
//     } catch (err: any) {
//       setScannerError(
//         err?.message ||
//           "Failed to start scanner. Check camera permission & HTTPS."
//       );
//       try {
//         if (qrRef.current) {
//           await qrRef.current.stop();
//           qrRef.current.clear();
//         }
//       } catch (e) {
//         console.debug(e);
//       }
//       qrRef.current = null;
//       setIsScanning(false);
//     }
//   };

//   const stopScanner = async () => {
//     if (qrRef.current) {
//       try {
//         await qrRef.current.stop();
//       } catch (e) {
//         console.debug(e);
//       }
//       try {
//         qrRef.current.clear();
//       } catch (e) {
//         console.debug(e);
//       }
//       qrRef.current = null;
//     }
//     setIsScanning(false);
//   };

//   const onScanSuccess = async (decodedText: string) => {
//     const upi = extractUpiId(decodedText);
//     if (!upi) {
//       showError("Invalid QR", "Could not detect UPI from the QR code");
//       return;
//     }
//     setScannedValue(upi);
//     console.log("UPI extracted:", upi);
//     console.log("scan success", decodedText);
//     setCurrentStep(3);
//     await stopScanner();
//   };

//   const onScanError = (errorMessage: string) => {
//     // ignore frequent scan errors
//     console.debug("scan error", errorMessage);
//   };

//   // upload handler (scan QR from image)
//   const handleUploadQRImage = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // preview for UI
//     const imgURL = URL.createObjectURL(file);
//     setPreview(imgURL);

//     setScannerError(null);

//     try {
//       const html5QrCode = new Html5Qrcode("qr-upload-temp-confirm");
//       const result = await html5QrCode.scanFile(file, false);
//       setScannedValue(result);
//       console.log(result);
//       try {
//         await html5QrCode.clear();
//       } catch (e) {
//         console.debug(e);
//       }
//     } catch (err) {
//       console.error(err);
//       setScannerError("Unable to read QR from image. Try a clearer picture.");
//     }
//   };

//   // pay handler (calls backend fund-transfer)
//   const handlePay = async () => {
//     if (!scannedValue) {
//       showError("No QR", "Please scan or upload merchant QR first.");
//       return;
//     }

//     try {
//       setPayLoading(true);
//       const response = await axios.post(
//         `${baseUrl}/fund-transfer`,
//         {
//           user_id: userData?.id,
//           amount: usdt,
//           type: token === "usdt" ? "USDT" : token === "usdc" ? "USDC" : "GBK",
//           send_wallet_address: scannedValue,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${tokenHeader}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data?.status === "false") {
//         showError("Transaction Failed.", response.data?.message || "");
//         return;
//       }

//       showSuccess("Transfer Successful", "Funds Transferred Successfully");
//       // navigate away or show success state
//       navigate("/orders");
//     } catch (error) {
//       console.error(error);
//       showError("Transaction Failed.", "");
//     } finally {
//       setPayLoading(false);
//     }
//   };

//   const steps = Array.from({ length: 3 }, (_, i) => i + 1);

//   return (
//     <div className="w-full min-h-screen bg-white flex flex-col items-center mt-18 p-6 gap-6">
//       {/* Header area / preview */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.25 }}
//         className="w-[320px] h-[260px] border-2 border-indigo-200 rounded-2xl flex flex-col items-center justify-center shadow-sm overflow-hidden"
//       >
//         {!preview ? (
//           <>
//             <div
//               id={QR_REGION_ID}
//               className="w-full h-full flex items-center justify-center bg-gray-50"
//             />
//           </>
//         ) : (
//           <img
//             src={preview}
//             alt="Selected"
//             className="w-full h-full object-cover"
//           />
//         )}
//       </motion.div>

//       {/* Hidden File Input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/*"
//         onChange={handleUploadQRImage}
//         className="hidden"
//       />

//       {/* Upload Button */}
//       <button
//         onClick={() => fileInputRef.current?.click()}
//         className="px-6 py-2 rounded-xl border border-indigo-300 bg-white text-indigo-600 hover:bg-indigo-50 transition"
//       >
//         Upload QR
//       </button>

//       {/* Progress & Payment Details */}
//       <div className="w-full max-w-md bg-white rounded-3xl shadow p-5 mt-6">
//         <div className="w-full text-center mb-4">
//           <p className="text-gray-500 text-sm">
//             Ask the vendor to generate QR only after your scanner opens
//           </p>
//           <p className="text-green-500 text-sm font-medium mt-1">On time</p>
//           <div className=" h-2 bg-blue-400 " />
//         </div>

//         {/* Simple progress dots */}
//         <div className="relative w-full px-6 py-4">
//           <div className="relative flex justify-between px-2">
//             {/* Connecting Line */}
//             <div className="absolute top-1/2 left-2 w-[calc(100%-1rem)] h-1 bg-purple-300 -translate-y-1/2 rounded-full" />

//             {steps.map((step) => {
//               const isActive = step <= currentStep;
//               const isCurrent = step === currentStep;

//               return (
//                 <div
//                   key={step}
//                   className={`
//                 relative w-4 h-4 rounded-full shadow
//                 ${isActive ? "bg-purple-600" : "bg-gray-300"}
//               `}
//                 >
//                   {isCurrent && (
//                     <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="w-full flex flex-col justify-center items-center mb-4">
//           <div className="w-full flex items-center justify-between px-6 mb-2">
//             <span className="text-xs text-gray-500">Merchant accepted</span>
//             <span className="text-xs text-purple-600 font-semibold">
//               Scan/Upload QR
//             </span>
//             <span className="text-xs text-gray-400">Processing payment</span>
//           </div>
//         </div>

//         {/* Payment Card */}
//         <div className="w-full mt-5 p-5 shadow-sm rounded-2xl border border-gray-200 bg-white">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
//               <span className="text-xl">💳</span> SCAN & PAY{" "}
//               {token.toUpperCase()}
//             </h2>
//             <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-lg">
//               Accepted
//             </span>
//           </div>

//           <div className="text-sm text-gray-700 space-y-2">
//             <div className="flex justify-between">
//               <span>ID</span>
//               <span>{userData.id}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>email</span>
//               <span>{userData.email}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Wallet</span>
//               <span>
//                 {userData.wallet_address.toString().slice(0, 7) +
//                   "..." +
//                   userData.wallet_address.toString().slice(-7)}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>You send</span>
//               <span>
//                 {usdt} {token.toUpperCase()}
//               </span>
//             </div>
//             {/* <div className="flex justify-between">
//               <span>Fee</span>
//               <span>—</span>
//             </div> */}
//             <div className="flex justify-between">
//               <span>You receive</span>
//               <span>₹{inr}</span>
//             </div>

//             <div className="flex justify-between text-red-500 font-medium">
//               <span>Payment Details</span>
//               <span>{scannedValue ? "Scanned" : "Not sent"}</span>
//             </div>

//             <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between font-semibold">
//               <span>Total Receivable Amount</span>
//               <span>₹{inr}</span>
//             </div>
//           </div>
//         </div>

//         {/* Note */}
//         <div className="flex items-start gap-2 mt-4 text-gray-600 text-xs p-3 bg-indigo-50 rounded-xl">
//           <Info className="w-4 h-4 mt-0.5 text-indigo-600" />
//           <p>
//             Your payment details will be sent once the merchant is connected.
//             Please do not leave this page, otherwise the transaction may not
//             complete.
//           </p>
//         </div>

//         <div className="mt-4">
//           <button
//             onClick={handlePay}
//             disabled={payLoading || isScanning || !scannedValue}
//             className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-60"
//           >
//             {payLoading ? "Processing..." : "Pay now"}
//           </button>
//         </div>

//         {/* Hidden temp div for scanFile usage (html5-qrcode uses element id only for some flows) */}
//         <div id="qr-upload-temp-confirm" style={{ display: "none" }} />
//       </div>
//     </div>
//   );
// };

// export default ConfirmSell;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { Html5Qrcode } from "html5-qrcode";
import type { Html5QrcodeCameraScanConfig } from "html5-qrcode";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useShowError } from "@/hooks/useShowError";
import { useShowSuccess } from "@/hooks/useShowSuccess";
import QrCode from "qrcode-decoder";

const QR_REGION_ID = "html5qr-reader-confirm";

const ConfirmSell: React.FC = () => {
  const navigate = useNavigate();
  const { inr, usdt, order_id } = useParams<{
    inr: string;
    usdt: string;
    order_id: string;
  }>();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = (query.get("token") || "usdt") as "usdt" | "usdc" | "gbk";

  const baseUrl = useSelector((state: RootState) => state?.consts?.baseUrl);
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const tokenHeader = useSelector((state: RootState) => state?.user?.token);
  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // QR scanner refs/state
  const qrRef = useRef<Html5Qrcode | null>(null);
  // @ts-ignore
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [payLoading, setPayLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [proceed, setProceed] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/check-order-status/${order_id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenHeader}`,
              "Content-Type": "application/json",
            },
          }
        );

        const status = response?.data?.order?.status;

        if (status === "merchant_accepted") {
          clearInterval(interval);
          showSuccess("Request accepted.", "");
          setProceed(true);
          setCurrentStep(2);
        }

        if (status === "rejected_by_all") {
          clearInterval(interval);
          showError("Request rejected.", "");
          navigate("/scan");
        }
      } catch (err) {
        console.error("Order polling failed:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [order_id, baseUrl, token, showError, showSuccess]);

  useEffect(() => {
    if (!showModel) return;
    const interval = setInterval(async () => {
      try {
        console.log({ order_id });
        const response = await axios.post(
          `${baseUrl}/confirm-scan-order-status`,
          { order_id },
          {
            headers: {
              Authorization: `Bearer ${tokenHeader}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Polling order status:", response.data);
        if (response.data.status) {
          setData(response.data);
          clearInterval(interval);
          setShowModel(false);
        }
      } catch (err) {
        console.error("Order polling failed:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [showModel, order_id, baseUrl, tokenHeader]);

  useEffect(() => {
    if (!proceed) {
      return;
    }
    const initScanner = async () => {
      await startScanner();
    };

    initScanner();

    return () => {
      stopScanner(); // fire and forget
    };
  }, [proceed]);

  const extractUpiId = (qrText: string): string | null => {
    try {
      const url = new URL(qrText);
      if (url.protocol === "upi:") {
        return url.searchParams.get("pa");
      }
      const match = qrText.match(/pa=([^\&]+)/);
      return match ? match[1] : null;
    } catch {
      const match = qrText.match(/pa=([^\&]+)/);
      return match ? match[1] : null;
    }
  };

  const startScanner = async () => {
    setScannerError(null);
    setScannedValue(null);

    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        setScannerError("No camera found on this device.");
        return;
      }

      let chosenCameraId = cameras[0].id;
      for (const cam of cameras) {
        const label = (cam.label || "").toLowerCase();
        if (
          label.includes("back") ||
          label.includes("rear") ||
          label.includes("environment")
        ) {
          chosenCameraId = cam.id;
          break;
        }
      }

      if (qrRef.current) {
        try {
          await qrRef.current.stop();
          qrRef.current.clear();
        } catch (e) {
          console.debug(e);
        }
        qrRef.current = null;
      }

      await new Promise((r) => setTimeout(r, 50));
      qrRef.current = new Html5Qrcode(QR_REGION_ID, { verbose: false });

      const config: Html5QrcodeCameraScanConfig = {
        fps: 10,
        qrbox: { width: 300, height: 300 },
      };

      await qrRef.current.start(
        chosenCameraId,
        config,
        onScanSuccess,
        onScanError
      );
      setIsScanning(true);
    } catch (err: any) {
      setScannerError(
        err?.message ||
          "Failed to start scanner. Check camera permission & HTTPS."
      );
      try {
        if (qrRef.current) {
          await qrRef.current.stop();
          qrRef.current.clear();
        }
      } catch (e) {
        console.debug(e);
      }
      qrRef.current = null;
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (qrRef.current) {
      try {
        await qrRef.current.stop();
      } catch (e) {
        console.debug(e);
      }
      try {
        qrRef.current.clear();
      } catch (e) {
        console.debug(e);
      }
      qrRef.current = null;
    }
    setIsScanning(false);
  };

  const onScanSuccess = async (decodedText: string) => {
    const upi = extractUpiId(decodedText);
    if (!upi) {
      showError("Invalid QR", "Could not detect UPI from the QR code");
      return;
    }
    setScannedValue(upi);
    console.log("UPI extracted from camera:", upi);
    setCurrentStep(3);
    await stopScanner();
  };

  const onScanError = (errorMessage: string) => {
    console.debug("scan error", errorMessage);
  };

  // const handleUploadQRImage = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setPreview(URL.createObjectURL(file));
  //   setScannerError(null);

  //   try {
  //     if (qrRef.current) await stopScanner(); // Stop camera if scanning

  //     const img = new Image();
  //     img.src = URL.createObjectURL(file);

  //     img.onload = async () => {
  //       const qr = new QrCode();
  //       const result = await qr.decode(img);
  //       const upi = extractUpiId(result.data);
  //       if (!upi) {
  //         showError(
  //           "Invalid QR",
  //           "Could not detect UPI from the uploaded QR image"
  //         );
  //         return;
  //       }
  //       setScannedValue(upi);
  //       console.log("UPI extracted from image:", upi);
  //       setCurrentStep(3);
  //     };
  //   } catch (err) {
  //     console.error(err);
  //     setScannerError("Unable to read QR from image. Try a clearer picture.");
  //   }
  // };

  const handleUploadQRImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setScannerError(null);

    try {
      // stop any ongoing camera scan
      await stopScanner();

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = async () => {
        const qr = new QrCode();
        try {
          const result = await qr.decodeFromImage(img);
          const decodedText = result.data || result;
          const upi = extractUpiId(decodedText.toString());
          if (!upi) {
            showError(
              "Invalid QR",
              "Could not detect UPI from the uploaded QR image"
            );
            return;
          }
          setScannedValue(upi);
          console.log("UPI extracted from image:", upi);
          setCurrentStep(3);
        } catch (err) {
          console.error("QR decode error:", err);
          setScannerError(
            "Unable to read QR from image. Make sure it's a valid QR code."
          );
        }
      };

      img.onerror = () => {
        setScannerError("Failed to load image for QR scan.");
      };
    } catch (err) {
      console.error(err);
      setScannerError("Unable to read QR from image. Try a clearer picture.");
    }
  };

  const handlePay = async () => {
    if (!scannedValue) {
      showError("No QR", "Please scan or upload merchant QR first.");
      return;
    }

    try {
      setPayLoading(true);
      const response = await axios.post(
        `${baseUrl}/submit-scan-details`,
        {
          scan_upi: scannedValue,
          order_id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenHeader}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Submit scan details response:", response.data);
      if (response.data?.status === false) {
        showError("Transaction Failed.", response.data?.message || "");
        return;
      }
      setShowModel(true);

      showSuccess("Transfer Successful", "Funds Transferred Successfully");
      // navigate("/orders");
    } catch (error) {
      console.error(error);
      showError("Transaction Failed.", "");
    } finally {
      setPayLoading(false);
    }
  };

  const steps = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center mt-18 p-6 gap-6">
      {showModel && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          {/* Loader Animation */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer soft pulse */}
            <div className="absolute w-full h-full border-4 border-purple-400/30 rounded-full animate-ping"></div>

            {/* Rotating ring */}
            <div className="absolute w-20 h-20 border-4 border-[#4D43EF] rounded-full animate-spin border-t-transparent"></div>

            {/* Center glowing dot */}
            <div className="absolute w-8 h-8 bg-[#4D43EF] rounded-full shadow-xl animate-pulse"></div>
          </div>

          {/* Text */}
          <div className="mt-6 text-center">
            <h2 className="text-gray-800 text-lg font-semibold tracking-wide">
              Waiting for merchant...
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Please stay on this page while we process your payment.
            </p>
          </div>
        </div>
      )}
      {data && (
        <div className="fixed inset-0 bg-gradient-to-b from-white to-slate-100 z-50 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center py-10 w-full">
            <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200 rounded-2xl p-8 w-full max-w-md space-y-6 animate-in fade-in zoom-in duration-300">
              {/* Success Icon */}
              <div className="mx-auto bg-[#4D43EF]/20 w-20 h-20 rounded-full flex items-center justify-center shadow-inner">
                <svg
                  className="w-12 h-12 text-[#4D43EF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 text-center">
                Payment Successful
              </h2>

              {/* Payment Info Card */}
              <div className="space-y-3 text-slate-700 text-center">
                <p className="text-lg">
                  <span className="font-semibold text-slate-900">Amount:</span>{" "}
                  <span className="text-green-600 font-bold">
                    ₹{data.amount}
                  </span>
                </p>

                <p className="text-lg">
                  <span className="font-semibold text-slate-900">Status:</span>{" "}
                  <span className="capitalize">{data.order_status}</span>
                </p>

                {/* <p className="text-lg">
                  <span className="font-semibold text-slate-900">
                    UPI Reference:
                  </span>{" "}
                  {data.upi_reference}
                </p> */}
                <p className="text-lg">
                  <span className="font-semibold text-slate-900">
                    UPI Reference:
                  </span>{" "}
                  {data.upi_reference}
                </p>

                <p className="text-[#4D43EF] font-medium italic">
                  {data.message}
                </p>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => navigate("/scan")}
                className="w-full cursor-pointer transtion ease-in-out bg-[#4D43EF] text-white py-3 rounded-xl font-semibold text-lg 
        shadow-md hover:bg-[#4D43EF]/80 hover:shadow-lg active:scale-95 
        transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-[320px] h-[260px] border-2 border-indigo-200 rounded-2xl flex flex-col items-center justify-center shadow-sm overflow-hidden"
      >
        {!proceed ? (
          <div
            id={QR_REGION_ID}
            className="w-full text-center text-sm text-gray-600 font-semibold h-full flex items-center justify-center bg-gray-50"
          >
            Please Wait For <br />
            Merchant Confirmation
          </div>
        ) : !preview ? (
          <div
            id={QR_REGION_ID}
            className="w-full h-full flex items-center justify-center bg-gray-50"
          />
        ) : (
          <img
            src={preview}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleUploadQRImage}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-6 cursor-pointer py-2 rounded-xl border border-indigo-300 bg-white text-indigo-600 hover:bg-indigo-50 transition"
      >
        Upload QR
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow p-5 mt-6">
        <div className="w-full text-center mb-4">
          <p className="text-gray-500 text-sm">
            Ask the vendor to generate QR only after your scanner opens
          </p>
          <p className="text-green-500 text-sm font-medium mt-1">On time</p>
          <div className=" h-2 bg-blue-400 " />
        </div>

        <div className="relative w-full px-6 py-4">
          <div className="relative flex justify-between px-2">
            <div className="absolute top-1/2 left-2 w-[calc(100%-1rem)] h-1 bg-[#4D43EF]/50 -translate-y-1/2 rounded-full" />
            {steps.map((step) => {
              const isActive = step <= currentStep;
              const isCurrent = step === currentStep;
              return (
                <div
                  key={step}
                  className={`relative w-4 h-4 rounded-full shadow ${
                    isActive ? "bg-[#4D43EF]" : "bg-gray-300"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center mb-4">
          <div className="w-full flex items-center justify-between px-6 mb-2">
            {["Merchant accepted", "Scan/Upload QR", "Processing payment"].map(
              (label, index) => {
                const step = index + 1; // steps are 1-based
                const isActive = step <= currentStep;
                const isCurrent = step === currentStep;

                // Dynamic text color
                const textColor = isCurrent
                  ? "text-[#4D43EF] font-semibold"
                  : isActive
                  ? "text-gray-700"
                  : "text-gray-400";

                return (
                  <span key={label} className={`text-xs ${textColor}`}>
                    {label}
                  </span>
                );
              }
            )}
          </div>
        </div>

        <div className="w-full mt-5 p-5 shadow-sm rounded-2xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
              <span className="text-xl">💳</span> SCAN & PAY{" "}
              {token.toUpperCase()}
            </h2>
            {proceed ? (
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-lg">
                Accepted
              </span>
            ) : (
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-lg">
                Waiting
              </span>
            )}
          </div>

          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>ID</span>
              <span>{order_id}</span>
            </div>
            <div className="flex justify-between">
              <span>email</span>
              <span>{userData.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Scanner UPI</span>
              <span>{scannedValue ? scannedValue : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span>You send</span>
              <span>
                {usdt} {token.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fees</span>
              <span>5%</span>
            </div>
            <div className="flex justify-between">
              <span>You receive</span>
              <span>₹{inr}</span>
            </div>
            <div className="flex justify-between text-red-500 font-medium">
              <span>Payment Details</span>
              <span>{scannedValue ? "Scanned" : "Not sent"}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between font-semibold">
              <span>Total Receivable Amount</span>
              <span>₹{inr}</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4 text-gray-600 text-xs p-3 bg-indigo-50 rounded-xl">
          <Info className="w-4 h-4 mt-0.5 text-indigo-600" />
          <p>
            Your payment details will be sent once the merchant is connected.
            Please do not leave this page, otherwise the transaction may not
            complete.
          </p>
        </div>

        <div className="mt-4">
          <button
            onClick={handlePay}
            disabled={payLoading || isScanning || !scannedValue}
            className="w-full py-3 cursor-pointer hover:bg-green-500 transition ease-in-out duration-300 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-60"
          >
            {payLoading ? "Processing..." : "Proceed"}
          </button>
        </div>

        <div id="qr-upload-temp-confirm" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default ConfirmSell;
