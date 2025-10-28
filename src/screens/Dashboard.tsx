import React from "react";
import Balance from "@/components/dashboard/Balance";
import Action from "@/components/dashboard/Action";
import TrxCard from "@/components/dashboard/TrxCard";
import Footer from "@/components/dashboard/Footer";

const Dashboard: React.FC = () => {
  return (
    <div className="mt-24 sm:mt-30 px-2 flex flex-col gap-2 max-w-lg mx-auto">
      <Balance />
      <Action />
      <TrxCard />
      <Footer />
    </div>
  );
};

export default Dashboard;
