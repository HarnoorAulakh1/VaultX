import "./App.css";
import Lock from "./components/lock";
import Dashboard from "./components/dashboard/dashboardLayout";
import AppLayout from "./components/applayout";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Coin from "./components/coin";
import Swap from "./components/swap";
import Setup from "./components/setup.ts/setup";
import Profile from "./contexts/profile";
import PasswordSet from "./components/setup.ts/passwordSet";
import ImportWallet from "./components/setup.ts/importWallet";
import Seed from "./components/setup.ts/seed";
import SetupLayout from "./components/setup.ts/setupLayout";
import PrivateKey from "./components/setup.ts/privateKey";
import Send from "./components/transaction/send";
import SendEth from "./components/transaction/sendEth";
import Recieve from "./components/transaction/recieve";
import Token from "./components/dashboard/tokens";

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Profile>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Lock />} />
          <Route path="/setup" element={<SetupLayout />}>
            <Route index element={<Setup />} />
            <Route path="new-wallet" element={<PasswordSet />} />
            <Route path="import-wallet" element={<ImportWallet />} />
            <Route path="seed" element={<Seed />} />
            <Route path="key" element={<PrivateKey />} />
          </Route>
          <Route path="/app" element={<AppLayout />}>
            <Route path="send" element={<Send />} />
            <Route path="sendEth/:id" element={<SendEth />} />
            <Route path="recieve" element={<Recieve />} />
            <Route path="" element={<Dashboard />}>
              <Route path="" element={<Token />} />
              <Route path="swap" element={<Swap />} />
            </Route>
            <Route path="coin" element={<Coin name="ETH" />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Profile>
  );
}
