import React from "react";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Success: React.FC = () => {
  const msg = useSelector((state: RootState) => state.model.showModelMsg);

  return (
    <Alert
      className="border-emerald-500 z-500 text-emerald-600 bg-emerald-200 absolute top-3 w-fit right-0"
      variant="default"
    >
      <AlertCircleIcon />
      <AlertTitle>{msg.title}</AlertTitle>
      <AlertDescription>
        <p>{msg?.msg}</p>
      </AlertDescription>
    </Alert>
  );
};

export default Success;
