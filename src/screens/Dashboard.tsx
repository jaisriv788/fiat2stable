import React from "react";
import Balance from "@/components/dashboard/Balance";
import Action from "@/components/dashboard/Action";

const Dashboard: React.FC = () => {
  return (
    <div className="mt-24 sm:mt-30 px-2 flex flex-col gap-2">
      <Balance />
      <Action />
    </div>
  );
};

export default Dashboard;
