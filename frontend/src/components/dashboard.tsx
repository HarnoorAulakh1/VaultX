import {
  Copy,
  Maximize2,
  RefreshCw,
  ArrowDown,
  ArrowUp,
  Repeat2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  h-full text-sm text-white overflow-hidden">
      {/* <div className="p-2 overflow-hidden ">
        <div className="bg-[#3a2e0e] rounded-lg px-4 py-2 flex items-center gap-2">
          <Shield className="text-amber-500" size={20} />
          <span className="text-amber-500 text-sm">
            Tap here to back up your recovery phrase
          </span>
        </div>
      </div> */}

      <div className="p-4 flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="bg-[#3a3a3a] hover:cursor-pointer rounded-full px-2 py-1 text-[#e27b7b] font-bold"
        >
          A1
        </div>

        <div className="flex items-center bg-[#2a2a2a] text-xl rounded-full px-2 py-1">
          <div className="bg-[#2a2a2a] rounded-full p-1 mr-1">
            <img
              src="./eth.webp"
              alt="Ethereum"
              width={24}
              height={24}
              className="rounded-full bg-[#627eea]"
            />
          </div>
          <span className="mr-1">Wallet 1</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div className="flex gap-2">
          <Copy size={20} className="text-gray-400" />
          <Maximize2 size={20} className="text-gray-400" />
        </div>
      </div>
      <div className="flex  px-4 flex-row justify-center">
        <button className="py-3 px-4 text-blue-400 border-b-2 border-blue-400">
          Tokens
        </button>
        <button className="py-3 px-4   text-gray-400">Collectibles</button>
        <button className="py-3 px-4  text-gray-400">Activity</button>
      </div>

      <div className="flex flex-col  items-center mt-10 mb-5">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">$0.00</h1>
          <RefreshCw
            size={15}
            className="ml-2 hover:cursor-pointer text-gray-400"
          />
        </div>
        <div className="text-xl text-gray-400 mt-2">
          $0.00 <span className="ml-2">0%</span>
        </div>
      </div>

      <div className="flex justify-center gap-8 mb-5 ">
        <button className="flex flex-col items-center">
          <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
            <ArrowDown size={20} className="text-blue-400" />
          </div>
          <span className="text-gray-400 ">Receive</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
            <ArrowUp size={20} className="text-blue-400" />
          </div>
          <span className="text-gray-400 ">Send</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
            <Repeat2 size={20} className="text-blue-400" />
          </div>
          <span className="text-gray-400 ">Swap</span>
        </button>
      </div>

      <div className="p-4 hover:bg-[#1d1d1d] text-sm" onClick={() => navigate("/app/coin")}>
        <div className="flex items-center">
          <img
            src="./eth.webp"
            alt="Ethereum"
            width={40}
            height={40}
            className="rounded-full bg-[#627eea]"
          />
          <div className="ml-3">
            <div className="font-bold ">Ethereum</div>
            <div className="text-gray-400">0 ETH</div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-bold ">$0.00</div>
            <div className="text-red-500">$0.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
