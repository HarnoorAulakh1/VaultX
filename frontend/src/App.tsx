import "./App.css";
import Lock from "./components/lock";
import Dashboard from "./components/dashboard";
import AppLayout from "./components/applayout";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Coin from "./components/coin";
import Swap from "./components/swap";
import Setup from "./components/setup";

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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/setup" element={<Lock />} />
        <Route path="/" element={<Setup/>} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="coin" element={<Coin name="ETH"/>} />
          <Route path="swap" element={<Swap/>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
