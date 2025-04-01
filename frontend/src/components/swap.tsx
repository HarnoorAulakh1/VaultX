function Swap() {
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="bg-[#1c1c1e] p-3 rounded-xl relative">
        <div className="bg-yellow-600 text-center p-2 rounded-lg text-sm">
          Tap here to back up your recovery phrase
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
              A1
            </div>
            <button className="bg-[#2a2a2e] px-4 py-2 rounded-lg">
              Wallet 1 ▼
            </button>
          </div>
          <span className="text-gray-400">1%</span>
        </div>

        <div className="bg-[#2a2a2e] p-4 rounded-lg mt-4">
          <p className="text-gray-400">Send</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl">0</p>
            <button className="bg-[#1c1c1e] p-2 rounded-lg">ETH ▼</button>
          </div>
          <p className="text-gray-400">$0.00</p>
        </div>

        <div className="flex justify-center mt-2">
          <div className="bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full">
            ↓
          </div>
        </div>

        <div className="bg-[#2a2a2e] p-4 rounded-lg mt-2">
          <p className="text-gray-400">Receive</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl">0</p>
            <button className="bg-[#1c1c1e] p-2 rounded-lg">USDC ▼</button>
          </div>
          <p className="text-gray-400">$0.00</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-400">Trending Tokens</p>
          <div className="bg-[#2a2a2e] p-2 mt-2 rounded-lg flex justify-between">
            <p>Ondo Finance</p>
            <p>$0.7921</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
