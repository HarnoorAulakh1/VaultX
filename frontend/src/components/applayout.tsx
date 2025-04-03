import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import { useEffect } from "react";
import { api } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "react-js-loader";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function handle() {
      setLoading(false);
      const public_id = window.localStorage.getItem("public_id");
      if (!public_id) {
        navigate("/setup");
      }
      const checkAddress = await api.post("/user/checkAddress", {
        public_id: public_id,
      });
      if (checkAddress.status == 200) {
        try {
          const response = await api.post("/user/checkLogin");
          console.log(response.status);
          if (response.status != 200) {
            navigate("/");
          }
        } catch (error) {
          navigate("/");
          console.log(error);
        }
      } else {
        window.localStorage.removeItem("public_id");
        navigate("/setup");
      }
      setLoading(true);
      console.log(loading);
    }
    handle();
  }, []);

  return (
    <>
      <div className="h-[600px] w-[360px] overflow-hidden">
        {loading && loading != null ? (
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
        ) : (
          <div className="flex justify-center items-center text-white text-3xl h-[91%]">
            <Loader
              type="ping-cube"
              color="#ffffff"
              title={"F**K  u  B****H"}
              size={100}
            />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
