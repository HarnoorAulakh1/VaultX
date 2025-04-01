import { Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-around border-t border-[#2a2a2a] bg-[#14151c] py-2 ">
      <button className="flex flex-col items-center text-blue-400" onClick={()=>navigate("/app")}>
        <div className="text-blue-400">
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

      <button className="flex flex-col items-center text-gray-400" onClick={()=>navigate("/app/swap")}>
        <div className="text-gray-400">
          <Repeat2 size={20} />
        </div>
        <span className="text-xs mt-1">Swap</span>
      </button>

      <button className="flex flex-col items-center text-gray-400" onClick={()=>navigate("/app/swap")}>
        <div className="text-gray-400">
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
        <span className="text-xs mt-1">Explore</span>
      </button>
    </div>
  );
}
