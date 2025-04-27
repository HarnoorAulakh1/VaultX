import "./App.css";
import Lock from "./components/lock";
import Dashboard from "./components/dashboard/dashboardLayout";
import AppLayout from "./components/applayout";
import { HashRouter, Routes, Route } from "react-router-dom";
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
import Wallets from "./components/wallet-settings/wallets";
import WalletSettings from "./components/wallet-settings/walletSettings";
import { WalletLayout } from "./components/wallet-settings/walletLayout";
import Remove from "./components/wallet-settings/remove";
import AddWallet from "./components/wallet-settings/addWallet";
import ShowKey from "./components/wallet-settings/showKey";
import Network from "./components/setup.ts/network";
import TokenProvider from "./contexts/token";
import History from "./components/history";

export default function App() {
  return (
    <div className="relative w-full h-full rounded-2xl">
      <img src="./bg2.jpg" alt="" className="fixed w-full h-full" />
      <div className="w-full h-full flex items-center justify-center z-[999]">
        <HashRouter>
          <AnimatedRoutes />
        </HashRouter>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  return (
    <Profile>
      <TokenProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Lock />} />

            <Route path="/setup" element={<SetupLayout />}>
              <Route index element={<Setup />} />
              <Route path="new-wallet" element={<PasswordSet />} />
              <Route path="import-wallet" element={<ImportWallet />} />
              <Route path="network/:id" element={<Network />} />
              <Route path="seed" element={<Seed />} />
              <Route path="key" element={<PrivateKey />} />
            </Route>
            <Route path="/app" element={<AppLayout />}>
              <Route path="send" element={<Send />} />
              <Route path="sendEth/:id" element={<SendEth />} />
              <Route path="recieve" element={<Recieve />} />
              <Route path="wallet" element={<WalletLayout />}>
                <Route path="" element={<Wallets />} />
                <Route
                  path="wallet-settings/:id"
                  element={<WalletSettings />}
                />
                <Route path="remove/:id" element={<Remove />} />
                <Route path="add-wallet/:network" element={<AddWallet />} />
                <Route path="showKey/:id" element={<ShowKey />} />
              </Route>
              <Route path="" element={<Dashboard />}>
                <Route path="" element={<Token />} />
                <Route path="swap" element={<Swap />} />
                <Route path="history" element={<History />} />
              </Route>
              <Route path="coin" element={<Coin />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </TokenProvider>
    </Profile>
  );
}
