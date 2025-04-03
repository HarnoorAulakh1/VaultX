import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ImportWallet(){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full mt-10 px-[1rem]bg-[#0e0e0f]  bg-[#0e0e0f] px-[1rem] h-full overflow-hidden items-center text-white">
          <div className="flex items-center px-2 gap-2 w-full ">
            <ArrowLeft
              className="text-[#949494]"
              size={24}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            ⧫
          </div>
          <h1 className="text-xl font-bold mt-4 ">Import Ethereum wallet</h1>
          <p className="text-gray-400 text-sm mt-2">Choose a method</p>
          <button onClick={()=>navigate("/setup/seed")} className="w-full mt-4 py-2 hover:bg-gray-700 hover:translate-x-3 transition-all duration-150 ease-linear rounded-lg bg-gray-900 text-white flex items-center px-4">
            📜 Recovery phrase
          </button>
          <button onClick={()=>navigate("/setup/key")} className="w-full mt-2 py-2 hover:bg-gray-700 hover:translate-x-3 transition-all duration-150 ease-linear rounded-lg bg-gray-900 text-white flex items-center px-4">
            🔑 Private key
          </button>
          <button
            disabled={true}
            className="w-full mt-2 py-2 rounded-lg bg-gray-900 text-[hsl(0,2%,48%)] flex items-center px-4"
          >
            💳 Hardware wallet
          </button>
          <button
            disabled={true}
            className="w-full mt-2 py-2 rounded-lg bg-gray-900 text-[#8a8282] flex items-center px-4"
          >
            👁 View-only wallet
          </button>
        </div>
    )
}