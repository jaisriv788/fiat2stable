import React, { useLayoutEffect } from "react";
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
// import Settings from "./screens/Settings";
import Refer from "./screens/Refer";
import GettingStarted from "./screens/Support/GettingStarted";
import General from "./screens/Support/General";
import Limits from "./screens/Support/Limits";
import ReferAndEarn from "./screens/Support/ReferAndEarn";
import Trx from "./screens/Support/Transaction";
import DepositAndWithdraw from "./screens/Support/DepositAndWithdraw";
import AllFaq from "./screens/Support/AllFaq";
import { useLocation } from "react-router";

const App: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

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

          <Route path="/support/gettingstarted" element={<GettingStarted />} />
          <Route path="/support/general" element={<General />} />
          <Route path="/support/limits" element={<Limits />} />
          <Route path="/support/refer&earn" element={<ReferAndEarn />} />
          <Route path="/support/transactions" element={<Trx />} />
          <Route
            path="/support/deposit&withdraw"
            element={<DepositAndWithdraw />}
          />
          <Route path="/support/allfaqs" element={<AllFaq />} />

          <Route path="/limit" element={<Limit />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/refer" element={<Refer />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
