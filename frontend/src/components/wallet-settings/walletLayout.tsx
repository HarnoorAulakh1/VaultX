import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
export function WalletLayout() {
  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="overflow-hidden relative flex flex-col"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
