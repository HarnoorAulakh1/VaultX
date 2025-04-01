import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="h-[600px] w-[360px] overflow-hidden">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="overflow-hidden h-[91%] relative flex flex-col"
      >
          <Outlet />
      </motion.div>
      <Footer />
    </div>
  );
}
