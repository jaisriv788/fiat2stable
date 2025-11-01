import React from "react";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Error: React.FC = () => {
  const msg = useSelector((state: RootState) => state.model.showModelMsg);

  return (
    <Alert
      className="border-red-500 z-500 bg-red-300/60 absolute top-3 w-fit right-0"
      variant="destructive"
    >
      <AlertCircleIcon />
      <AlertTitle>{msg.title}</AlertTitle>
      <AlertDescription>
        <p>{msg.msg}</p>
      </AlertDescription>
    </Alert>
  );
};

export default Error;
