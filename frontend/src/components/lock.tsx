import { useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Lock() {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2,type:"tween" }}
        className="flex flex-col text-xl h-[600px] w-[360px] text-white overflow-hidden"
      >
        <div className="flex justify-end p-4">
          <button className="text-gray-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center mt-[7rem]">
          <div className="mb-4 bg-[#e74c3c] w-20 h-20 rounded-lg flex flex-col items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              <circle cx="12" cy="16" r="1"></circle>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-20">VaultX</h1>

          <div className="w-full px-5 mb-4 text-xl mt-5">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          <div className="w-full px-5 mb-2 ">
            <button
              onClick={() => navigate("/app")}
              className="w-full bg-white hover:cursor-pointer text-black font-medium py-3 rounded-lg hover:bg-[#cccccc]"
            >
              Unlock
            </button>
          </div>
          <button className="text-gray-400 text-sm">Forgot password</button>
        </div>
      </motion.div>
  );
}
