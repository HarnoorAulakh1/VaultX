import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { userContext } from "../../contexts/user";
import { useContext } from "react";
export default function Token() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const { user } = useContext(userContext);
  const times = useRef(0);
  async function handle() {
    console.log(times.current);
    if (times.current == 0) {
      setLoading(false);
      times.current++;
    }
    try {
      const response = await api.post("/user/checkAddress", {
        public_id: user.public_id,
        network: user.network.network,
      });
      if (response.status === 200) {
        //console.log(response.data);
        setBalance(Number(parseFloat(response.data.balance).toFixed(5)));
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(true);
  }
  useEffect(() => {
      handle();
  }, [user.public_id]);

  return (
    <>
      <div className="flex flex-col  items-center mt-10 mb-5">
        <div className="flex items-center">
          <div className="flex  gap-2">
            {!loading || loading == null ? (
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p className="w-[4rem]">
                  <Skeleton className="h-[2rem]" />
                </p>
              </SkeletonTheme>
            ) : (
              <h1 className="text-3xl font-bold">{balance}</h1>
            )}
            <span className="text-3xl font-bold"> ETH</span>
          </div>

          <RefreshCw
            onClick={() => {
              times.current = 0;
              handle();
            }}
            size={15}
            className="ml-2 hover:cursor-pointer text-gray-400"
          />
        </div>
        <div className="text-xl text-gray-400 mt-2">
          $0.00 <span className="ml-2">0%</span>
        </div>
      </div>

      <div className="flex justify-center gap-8 mb-5 ">
        <button
          className="flex flex-col items-center"
          onClick={() => navigate("recieve")}
        >
          <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
            <ArrowDown size={20} className="text-blue-400" />
          </div>
          <span className="text-gray-400 ">Receive</span>
        </button>

        <button
          className="flex flex-col items-center"
          onClick={() => navigate("send")}
        >
          <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
            <ArrowUp size={20} className="text-blue-400" />
          </div>
          <span className="text-gray-400 ">Send</span>
        </button>

        {/* <button className="flex flex-col items-center">
      <div className="bg-[#2a2a2a] p-4 rounded-full mb-2 hover:bg-[#1e1e1e]">
        <Repeat2 size={20} className="text-blue-400" />
      </div>
      <span className="text-gray-400 ">Swap</span>
    </button> */}
      </div>

      <div
        className="p-4 hover:bg-[#1d1d1d] text-sm"
        onClick={() => navigate("/app/coin")}
      >
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
    </>
  );
}
