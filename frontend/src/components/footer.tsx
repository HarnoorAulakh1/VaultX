import { Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const path = url.split("/").pop();
    if (path != undefined) setState(path);
  }, [window.location.href]);
  return (
    <div className="flex justify-around border-t text-gray-400 border-[#2a2a2a] bg-[#14151c] py-2 ">
      <button
        className={`${
          state == "app" && "text-blue-400"
        } flex flex-col items-center hover:cursor-pointer `}
        onClick={() => navigate("/app")}
      >
        <div className="">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <span className="text-xs mt-1">Portfolio</span>
      </button>

      <button
        className={`${
          state == "swap" && "text-blue-400"
        } flex flex-col items-center hover:cursor-pointer `}
        onClick={() => navigate("/app/swap")}
      >
        <div className="">
          <Repeat2 size={20} />
        </div>
        <span className="text-xs mt-1">Swap</span>
      </button>

      <button
        className={`${
          state == "history" && "text-blue-400"
        } flex flex-col items-center hover:cursor-pointer `}
        onClick={() => navigate("/app/history")}
      >
        <div className="">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <span className="text-xs mt-1">History</span>
      </button>
    </div>
  );
}
