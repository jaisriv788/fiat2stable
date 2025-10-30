import React from "react";
import { Route, Routes } from "react-router";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import Buy from "./screens/Buy";
import ScanAndSell from "./screens/ScanAndSell";
import Sell from "./screens/Sell";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/scan" element={<ScanAndSell />} />
          <Route path="/sell" element={<Sell />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
