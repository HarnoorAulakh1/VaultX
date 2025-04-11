import { useState } from "react";
import { ChevronDown } from "lucide-react";

function Swap() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");

  return (
    <div className=" text-white  p-4 overflow-scroll">
      <div className="  rounded-xl h-full relative">
        <div className="bg-[#1E1E1E] mt-4 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold">Send</span>
            <span className="text-gray-400">
              Balance: <span className="text-blue-400">0.0 ETH</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="text-4xl bg-transparent outline-none w-1/2"
            />

            <div className="bg-[#1A1A1A] rounded-full p-2 flex items-center">
              <div className="bg-[#3B5EED] rounded-full p-1 mr-2">
                <div className="bg-[#627BF7] rounded-full p-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 256 417"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      fill="#fff"
                      d="M127.9611 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    />
                    <path
                      fill="#fff"
                      d="M127.9611 312.1866l-1.575 1.92v98.199l1.575 4.6z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 416.9052v-104.72L0 236.587z"
                    />
                    <path
                      fill="#fff"
                      d="M127.9611 287.9577l127.96-75.637-127.96-58.162z"
                    />
                    <path fill="#fff" d="M0 212.3208l127.96 75.637V154.1587z" />
                  </svg>
                </div>
              </div>
              <span className="font-bold mr-2">ETH</span>
              <ChevronDown size={18} />
            </div>
          </div>

          <div className="text-gray-400 text-xl">$0.00</div>

          <div className="flex justify-end gap-2 mt-2">
            <button className="bg-[#2A2A2A] rounded-full px-3 py-1 text-sm">
              25%
            </button>
            <button className="bg-[#2A2A2A] rounded-full px-3 py-1 text-sm">
              50%
            </button>
            <button className="bg-[#2A2A2A] rounded-full px-3 py-1 text-sm">
              75%
            </button>
          </div>
        </div>

        {/* Arrow divider */}
        <div className="flex justify-center mt-2 relative z-10">
          <div className="bg-[#1A1A1A] rounded-full p-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="#4B5563"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Receive section */}
        <div className="bg-[#1E1E1E] mt-2 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold">Receive</span>
            <span className="text-gray-400">Balance: 0</span>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              value={receiveAmount}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="text-4xl bg-transparent outline-none w-1/2"
            />

            <div className="bg-[#1A1A1A] rounded-full p-2 flex items-center">
              <div className="bg-[#2D68F6] rounded-full p-1 mr-2">
                <div className="bg-[#2D68F6] rounded-full p-1 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">$</span>
                </div>
              </div>
              <span className="font-bold mr-2">USDC</span>
              <ChevronDown size={18} />
            </div>
          </div>

          <div className="text-gray-400 text-xl">$0.00</div>
        </div>

        {/* Trending tokens */}
        <div className="w-full mt-[5rem] overflow-scroll">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Trending Tokens</h2>
            <svg
              className="ml-2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13L9 19L21 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Token list */}
          <div className="space-y-2 mt-2 h-full">
            {/* Ondo Finance */}
            <div className="bg-[#1E1E1E] hover:cursor-pointer rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <div className="w-6 h-6 border-4 border-black rounded-full"></div>
                </div>
                <div>
                  <div className="font-bold">Ondo Finance</div>
                  <div className="text-gray-500 text-sm">ONDO</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">$0.7921</div>
                <div className="text-red-500 text-sm">-0.08%</div>
              </div>
            </div>

            {/* Wrapped eETH */}
            <div className="bg-[#1E1E1E]  hover:cursor-pointer rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#627BF7] rounded-full flex items-center justify-center mr-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 256 417"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      fill="#fff"
                      d="M127.9611 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    />
                    <path
                      fill="#fff"
                      d="M127.9611 312.1866l-1.575 1.92v98.199l1.575 4.6z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 416.9052v-104.72L0 236.587z"
                    />
                    <path
                      fill="#fff"
                      d="M127.9611 287.9577l127.96-75.637-127.96-58.162z"
                    />
                    <path fill="#fff" d="M0 212.3208l127.96 75.637V154.1587z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold">Wrapped eETH</div>
                  <div className="text-gray-500 text-sm">WEETH</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">$1,914.5252</div>
                <div className="text-red-500 text-sm">-2.04%</div>
              </div>
            </div>

            {/* MUPPETS */}
            <div className="bg-[#1E1E1E]  hover:cursor-pointer rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                  <div className="w-7 h-7 bg-green-600 rounded-full mt-1"></div>
                </div>
                <div>
                  <div className="font-bold">MUPPETS</div>
                  <div className="text-gray-500 text-sm">MUPPETS</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">$0.0002</div>
                <div className="text-green-500 text-sm">+488.12%</div>
              </div>
            </div>

            {/* CryptoCAT */}
            <div className="bg-[#1E1E1E]  hover:cursor-pointer rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <div className="w-6 h-6 bg-blue-800 rounded-full"></div>
                </div>
                <div>
                  <div className="font-bold">CryptoCAT</div>
                  <div className="text-gray-500 text-sm">CRYPTOCAT</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">$0.0019</div>
                <div className="text-green-500 text-sm">+969.25%</div>
              </div>
            </div>

            {/* WhiteRock */}
            <div className="bg-[#1E1E1E] hover:cursor-pointer rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div>
                  <div className="font-bold">WhiteRock</div>
                  <div className="text-gray-500 text-sm">WHITE</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">$0.0007</div>
                <div className="text-green-500 text-sm">+12.34%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
