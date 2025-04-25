import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { userContext } from "../../contexts/user";
import { useContext } from "react";
import { data } from "../../lib/utils";
import { chainId, tokens } from "../../lib/config";
import { tokenContext } from "../../contexts/tokenContext";

export default function Token() {
  const navigate = useNavigate();
  const [chainId1, setChainId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const { user } = useContext(userContext);
  const times = useRef(0);
  console.log(chainId1);
  useEffect(() => {
    console.log(user);
    console.log(user.network.network.toLowerCase());
    setChainId(
      chainId[user.network.network.toLowerCase() as keyof typeof chainId]
    );
  }, [user]);
  async function handle() {
    if (times.current == 0) {
      setLoading(false);
      times.current++;
    }
    try {
      if (!user.public_id) return;
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
    <div className="w-full overflow-scroll">
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
            <span className="text-3xl font-bold">
              {" "}
              {data.find((x) => x.network == user.network.network)?.token}
            </span>
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
      <div className="w-full">
        {chainId1 != 0 &&
          chainId1 != undefined &&
          tokens[chainId1 as keyof typeof tokens].map((token) => (
            <Tab
              key={token.name}
              chainId1={chainId1}
              img={token.img}
              contractAddress={token.contractAddress || ""}
              coingeckoId={token.coingeckoId}
              decimals={token.decimals}
              symbol={token.symbol}
              name={token.name}
            />
          ))}
      </div>
    </div>
  );
}

export function Tab({
  chainId1,
  name,
  symbol,
  img,
  contractAddress,
  coingeckoId,
  decimals,
}: {
  chainId1: number;
  name: string;
  symbol: string;
  img: string;
  contractAddress: string;
  coingeckoId: string;
  decimals: number;
}) {
  const [balance, setBalance] = useState<number>(-1);
  const [price, setprice] = useState<number>(-1);
  const { user } = useContext(userContext);
  useEffect(() => {
    try {
      async function handle() {
        const response = await api.post("/user/balance", {
          public_id: user.public_id,
          network: user.network.network,
          contractAddress: contractAddress,
        });
        if (response.status == 200) {
          setBalance(Number(parseFloat(response.data.balance).toFixed(5)));
        }
        console.log(symbol);
        const response1 = await api.get(`/user/getPrice/${symbol}`);
        if (response1.status == 200) {
          setprice(response1.data.price);
        }
      }
      handle();
    } catch (e) {
      console.log(e);
      setBalance(0);
    }
  }, [coingeckoId]);
  const { setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  return (
    <div
      className="p-4 hover:bg-[#1d1d1d] text-sm"
      onClick={() => {
        setToken({
          chainId: chainId1.toString(),
          contractAddress: contractAddress,
          name: name,
          symbol: symbol,
          img: img,
          coingeckoId: coingeckoId,
          decimals: decimals,
        });
        navigate("/app/coin");
      }}
    >
      <div className="flex items-center">
        <img
          src={img}
          alt="Ethereum"
          width={40}
          height={40}
          className="rounded-full bg-[#627eea]"
        />
        <div className="ml-3">
          <div className="font-bold ">{name}</div>
          <div className="text-gray-400">
            {balance != -1 && balance} {symbol}
          </div>
        </div>
        <div className="ml-auto text-right">
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
  );
}
