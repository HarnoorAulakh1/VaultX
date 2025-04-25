import { Outlet, useNavigate } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { useState, useEffect, useContext } from "react";
import { api } from "../../lib/utils";
import {  ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { userContext } from "../../contexts/user";
import { TiTick } from "react-icons/ti";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [show, set] = useState(false);
  const [state, setState] = useState("");
  const [copied, setter] = useState(false);
  const {user}=useContext(userContext);
  useEffect(() => {
    const url = window.location.href;
    const path = url.split("/").pop();
    if (path != undefined) setState(path);
  }, [window.location.href]);
  async function logout(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault();
    const response = await api.get("/user/lock");
    if (response.status === 200) {
      navigate("/");
    }
  }
  function copy() {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2000);
    navigator.clipboard.writeText(
      user.public_id
    );
  }
  return (
    <div className="flex flex-col  h-full text-sm text-white overflow-hidden border-1 border-[#202020] rounded-2xl">
      <ToastContainer />
      {/* <div className="p-2 overflow-hidden ">
        <div className="bg-[#3a2e0e] rounded-lg px-4 py-2 flex items-center gap-2">
          <Shield className="text-amber-500" size={20} />
          <span className="text-amber-500 text-sm">
            Tap here to back up your recovery phrase
          </span>
        </div>
      </div> */}

      <div className="p-4 relative justify-center  flex items-center ">
        <div className="flex flex-col absolute left-5 items-start gap-2">
          <div
            onClick={() => set((x) => !x)}
            className="bg-[#3a3a3a] hover:cursor-pointer rounded-full px-2 py-1 text-[#e27b7b] font-bold"
          >
            A1
          </div>
          {show && (
            <div className="absolute mt-8 flex flex-col  bg-[#0e0f14] border-2 border-[#282828] rounded-lg w-[10rem] py-1">
              <span
                onClick={(e) => logout(e)}
                className="text-white w-full  pl-2 hover:bg-[#1a1c22] py-2"
              >
                Lock
              </span>
              <span
                onClick={() => navigate("/setup")}
                className="text-white w-full  pl-2 hover:bg-[#1a1c22] py-2"
              >
                Add new Wallet
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 border-1 border-gray-600 bg-[#2a2a2a] text-xl rounded-full px-2">
          <div className="bg-[#2a2a2a] rounded-full p-1 mr-1">
            <img
              src={user.network?.img}
              alt="Ethereum"
              width={24}
              height={24}
              className="rounded-full bg-[#627eea]"
            />
          </div>
          <div onClick={()=>navigate("/app/wallet")} className="border-x-1 border-gray-600 py-1 text-sm flex flex-row items-center px-2 h-full">
            <span className="mr-1">{user.network.name}</span>
            <svg
              className="text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>{" "}
            </svg>
          </div>

           {copied ? (
                          <TiTick className="hover:cursor-pointer  text-[#334be9] text-xl" />
                        ) : (
                          <IoCopyOutline
                            onClick={() => copy()}
                            className="text-xl hover:cursor-pointer text-[#969fb0]"
                          />
                        )}
        </div>

      </div>
      <div className="flex  px-4 flex-row justify-center text-gray-400">
        <button
          className={`{${
            state == "app" && "border-blue-400 text-blue-400 border-b-2"
          } py-3 px-4   `}
        >
          Tokens
        </button>
        <button
          className={`{${
            state == "collectibles" &&
            "border-blue-400 text-blue-400 border-b-2"
          } py-3 px-4  `}
        >
          Collectibles
        </button>
        <button
          className={`{${
            state == "activity" && "border-blue-400 text-blue-400 border-b-2"
          } py-3 px-4  `}
        >
          Activity
        </button>
      </div>
      <motion.div
        key={location.pathname}
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
