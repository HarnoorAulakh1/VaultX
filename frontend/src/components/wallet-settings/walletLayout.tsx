import { Outlet, useLocation } from "react-router-dom";
import {  motion } from "framer-motion";
export function WalletLayout() {
  const location = useLocation();
  return (
    <div className="w-full h-full overflow-hidden">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: .2, type: "tween" }}
          className="overflow-hidden relative h-full flex flex-col"
        >
          <Outlet />
        </motion.div>
    </div>
  );
}
