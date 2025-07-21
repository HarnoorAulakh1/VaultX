import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Setup() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <div className="w-[361px] h-[600px] bg-[#0e0e0f]  text-white flex flex-col items-center p-6">
        <div className="flex flex-col h-[600px] justify-between w-full ">
          <div className="flex flex-col items-center w-full">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              🔒
            </div>
            <h1 className="text-xl font-bold mt-4">Welcome to VaultX</h1>
            <p className="text-gray-400 text-center mt-2">
              You'll use this wallet to send and receive crypto and NFTs
            </p>
          </div>
          
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mr-2"
              />
              <span className="text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-blue-500">Terms of Service</span>
              </span>
            </div>
            <button
              className={`w-full mt-4 py-2 hover:cursor-pointer rounded-lg bg-gray-300 text-black ${
                agreed ? "" : "brightness-50"
              }`}
              disabled={!agreed}
              onClick={() => navigate("/setup/network/new-wallet")}
            >
              Create a new wallet
            </button>
            <button
              className={`w-full mt-4 py-2 hover:cursor-pointer rounded-lg bg-gray-900 text-grey-200 ${
                agreed ? "" : "brightness-50"
              }`}
              disabled={!agreed}
              onClick={() => navigate("/setup/network/import-wallet")}
            >
              I already have a wallet
            </button>
<button onClick={()=>navigate("/")} type="button" className="text-gray-400 mt-2  text-sm hover:cursor-pointer hover:underline">
              Back to lock screen
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
