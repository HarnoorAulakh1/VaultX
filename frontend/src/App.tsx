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

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}

function AnimatedRoutes() {

  return (
    <Profile>
      <AnimatePresence mode="wait">
        <Routes >
          <Route path="/" element={<Lock />} />

          <Route path="/setup" element={<SetupLayout />}>
            <Route index element={<Setup />} />
            <Route path="new-wallet" element={<PasswordSet />} />
            <Route path="import-wallet" element={<ImportWallet />} />
            <Route path="network/:id" element={<Network/>} />
            <Route path="seed" element={<Seed />} />
            <Route path="key" element={<PrivateKey />} />
          </Route>
          <Route path="/app" element={<AppLayout />}>
            <Route path="send" element={<Send />} />
            <Route path="sendEth/:id" element={<SendEth />} />
            <Route path="recieve" element={<Recieve />} />
            <Route path="wallet" element={<WalletLayout />}>
              <Route path="" element={<Wallets />} />
              <Route path="wallet-settings/:id" element={<WalletSettings />} />
              <Route path="remove/:id" element={<Remove />} />
              <Route path="add-wallet/:network" element={<AddWallet />} />
              <Route path="showKey/:id" element={<ShowKey />} />
            </Route>
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
