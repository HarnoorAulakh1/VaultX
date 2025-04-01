import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Setup() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-[361px] h-[600px] bg-black text-white flex flex-col items-center p-6">
      {step === 1 ? (
        // Welcome Screen
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
              className={`w-full mt-4 py-2 rounded-lg ${
                agreed ? "bg-gray-300 text-black" : "bg-gray-800 text-gray-500"
              }`}
              disabled={!agreed}
              onClick={() => setStep(2)}
            >
              Create a new wallet
            </button>
            <button
              className="w-full mt-2 py-2 rounded-lg bg-gray-900 text-gray-600"
              onClick={() => setStep(3)}
            >
              I already have a wallet
            </button>
          </div>
        </div>
      ) : step === 2 ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center py-8 px-2 gap-2 w-full ">
            <ArrowLeft
              className="text-[#949494]"
              size={24}
              onClick={() => setStep(1)}
            />
            <h1 className="text-xl font-bold">Set up a password</h1>
          </div>
          <p className="text-gray-400 text-sm mt-2 ml-2">
            It should be at least 8 characters. You'll need this to unlock
            Backpack.
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-4 p-2 bg-gray-800 text-white rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 p-2 bg-gray-800 text-white rounded-lg"
          />
          <button
            className={`w-full mt-4 py-2 rounded-lg ${
              password.length >= 8 && password === confirmPassword
                ? "bg-gray-300 text-black"
                : "bg-gray-800 text-gray-500"
            }`}
            disabled={password.length < 8 || password !== confirmPassword}
          >
            Next
          </button>
        </div>
      ) : (
        // Import Ethereum Wallet Screen
        <div className="flex flex-col w-full items-center">
          <div className="flex items-center px-2 gap-2 w-full ">
            <ArrowLeft
              className="text-[#949494]"
              size={24}
              onClick={() => setStep(1)}
            />
          </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              ⧫
            </div>
          <h1 className="text-xl font-bold mt-4">Import Ethereum wallet</h1>
          <p className="text-gray-400 text-sm mt-2">Choose a method</p>
          <button className="w-full mt-4 py-2 hover:bg-gray-700 hover:translate-x-3 transition-all duration-150 ease-linear rounded-lg bg-gray-900 text-white flex items-center px-4">
            📜 Recovery phrase
          </button>
          <button className="w-full mt-2 py-2 hover:bg-gray-700 hover:translate-x-3 transition-all duration-150 ease-linear rounded-lg bg-gray-900 text-white flex items-center px-4">
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
      )}
    </div>
  );
}
