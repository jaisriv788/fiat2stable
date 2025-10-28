import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ProtectedRoute: React.FC = () => {
  const isConnected = useSelector((state: RootState) => state.user.isConnected);

  return isConnected ? (
    <>
      <Sidebar />
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
