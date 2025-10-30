import React from "react";
import { Route, Routes } from "react-router";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import Buy from "./screens/Buy";
import ScanAndSell from "./screens/ScanAndSell";
import Sell from "./screens/Sell";
import Support from "./screens/Support";
import Limit from "./screens/Limit";
import Transaction from "./screens/Transaction";
import Settings from "./screens/Settings";
import Refer from "./screens/Refer";

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
          <Route path="/support" element={<Support />} />
          <Route path="/limit" element={<Limit />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
