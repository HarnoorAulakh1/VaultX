import { FiArrowLeft } from "react-icons/fi";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Coin({ name }: { name: string }) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(-1);
  useEffect(() => {
    async function handle() {
      const price = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      setPrice(price.data.ethereum.usd);
    }
    const interval = setInterval(() => handle(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full">
      <div className="relative py-8 px-4">
        <FiArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl text-white text-center w-full">{name}</h1>
      </div>
      <div className="flex flex-col items-center gap-4 overflow-scroll h-[84%]">
        <img
          src="./eth.webp"
          alt="Ethereum"
          width={100}
          height={100}
          className="rounded-full bg-[#627eea] "
        />
        <h1 className="text-4xl font-bold text-white">0.00</h1>
        <div className="flex items-center gap-2">
          <div className="text-xl text-gray-400">$0.00</div>
          <div className="text-[#00c278] text-xl">0%</div>
        </div>

        <div className="flex justify-center gap-8 ">
          <button
            className="flex flex-col items-center"
            onClick={() => navigate("/app/recieve")}
          >
            <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
              <ArrowDown size={20} className="text-blue-400" />
            </div>
            <span className="text-gray-400 ">Receive</span>
          </button>

          <button
            className="flex flex-col items-center"
            onClick={() => navigate("/app/send")}
          >
            <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
              <ArrowUp size={20} className="text-blue-400" />
            </div>
            <span className="text-gray-400 ">Send</span>
          </button>
        </div>
        <div className="flex flex-col items-start w-full px-4 gap-2">
          <p className="text-gray-400 px-2">Market & Additional Info</p>
          <div className="bg-[#202126] text-gray-400 rounded-lg w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a]">
              <p>Token</p>
              <div className="flex flex-row items-center gap-1 text-[#4c94ff]">
                <p>Ethereum(ETH)</p>
                <FiArrowUpRight />
              </div>
            </div>
            <hr className="text-gray-700" />
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a]">
              <p>Price</p>
              <div className="text-white">
                {price != -1 ? (
                  `$${price}`
                ) : (
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p className="w-[5rem]">
                      <Skeleton />
                    </p>
                  </SkeletonTheme>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
