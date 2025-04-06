import { Maximize2 } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { api } from "../../lib/utils";
import { toast, ToastContainer } from "react-toastify";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [show, set] = useState(false);
  const [state, setState] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const path = url.split("/").pop();
    console.log(path == "app");
    if (path != undefined) setState(path);
  }, []);
  async function logout(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault();
    const response = await api.get("/user/lock");
    if (response.status === 200) {
      navigate("/");
    }
  }
  function copy() {
    navigator.clipboard.writeText(
      window.localStorage.getItem("public_id") || ""
    );
    toast.success("Public address copied to clipboard");
  }
  return (
    <div className="flex flex-col  h-full text-sm text-white overflow-hidden">
      <ToastContainer />
      {/* <div className="p-2 overflow-hidden ">
        <div className="bg-[#3a2e0e] rounded-lg px-4 py-2 flex items-center gap-2">
          <Shield className="text-amber-500" size={20} />
          <span className="text-amber-500 text-sm">
            Tap here to back up your recovery phrase
          </span>
        </div>
      </div> */}

      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
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

        <div className="flex items-center gap-1 bg-[#2a2a2a] text-xl rounded-full px-2">
          <div className="bg-[#2a2a2a] rounded-full p-1 mr-1">
            <img
              src="./eth.webp"
              alt="Ethereum"
              width={24}
              height={24}
              className="rounded-full bg-[#627eea]"
            />
          </div>
          <div className="border-x-1 border-gray-400 py-1 text-sm flex flex-row items-center px-2 h-full">
            <span className="mr-1">Wallet 1</span>
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

          <IoCopyOutline
            className="text-gray-400 hover:cursor-pointer"
            onClick={() => copy()}
          />
        </div>

        <div className="flex gap-2">
          <Maximize2 size={20} className="text-gray-400" />
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
            state == "collectibles" && "border-blue-400 text-blue-400 border-b-2"
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
      <Outlet />
    </div>
  );
}
