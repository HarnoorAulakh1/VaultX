import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../contexts/user";
import { api } from "../lib/utils";
import { chainId, tokens } from "../lib/config";
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import { tokenInterface } from "../lib/types";

function Swap() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const { user } = useContext(userContext);
  const [to, setTo] = useState<tokenInterface>();
  const [from, setFrom] = useState<tokenInterface>();
  const [tokens1, setTokens] = useState<tokenInterface[]>([]);
  const [chainId1, setChainId] = useState<number>(0);
  const [price1, setPrice1] = useState<number>(-1);
  const [price2, setPrice2] = useState<number>(-1);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  useEffect(() => {
    console.log(user);
    console.log(user.network.network.toLowerCase());
    setChainId(chainId[user.network.network.toLowerCase() as keyof typeof chainId])
    const tokens2=tokens[chainId[user.network.network.toLowerCase() as keyof typeof chainId] as keyof typeof tokens]
    if(tokens2 && tokens2.length==0){ return;}
    else{
    setTokens(tokens2);
    setFrom(tokens2[0]);
    setTo(tokens2[0]);}
  }, [user]);

  useEffect(() => {
    async function handle() {
      try {
        if (!from || !to) return;
        const response1 = await api.get(`/user/getPrice/${from?.coingeckoId}`);
        if (response1.status == 200) {
          setPrice1(response1.data.price);
        }
        const response2 = await api.get(`/user/getPrice/${to?.coingeckoId}`);
        if (response2.status == 200) {
          setPrice2(response2.data.price);
        }
        console.log(response1.data.price);
        console.log(response2.data.price);
      } catch (e) {
        console.log(e);
      }
    }
    handle();
  }, [from, to]);
  useEffect(() => { 
    setReceiveAmount(
      ((Number(sendAmount) * price1) / price2).toFixed(4)
    );
  }, [sendAmount, price1, price2]);
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
              className="text-2xl bg-transparent outline-none w-1/2"
            />

            <div
              className="bg-[#1A1A1A] hover:cursor-pointer relative rounded-full p-2 flex items-center"
              onClick={() => setShow1(!show1)}
            >
              <div className=" rounded-full mr-2">
                <div className=" rounded-full p-1">
                  <img src={from?.img} alt="" height={30} width={30} />
                </div>
              </div>
              <span className="font-bold mr-2">{from?.name}</span>
              <ChevronDown size={18} />
              {show1 && (
                <div className="absolute z-[9999] h-[10rem] w-[10rem] right-12 overflow-scroll top-12 left-0 bg-[#1E1E1E] rounded-lg p-2 ">
                  {tokens1.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center p-2 hover:bg-[#2A2A2A] rounded-lg cursor-pointer"
                      onClick={() => {
                        setFrom(token);
                        setPrice1(-1);
                        setShow1(false);
                      }}
                    >
                      <img
                        src={token.img}
                        alt={token.name}
                        className="w-8 h-8  rounded-full mr-2"
                      />
                      <div>
                        <div className="font-bold">{token.name}</div>
                        <div className="text-gray-500 text-sm">
                          {token.symbol}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="ml-auto text-left">
                    <div className="text-white">
                      {price1 != -1 ? (
                        `$${price1}`
                      ) : (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                          <p className="w-[5rem]">
                            <Skeleton />
                          </p>
                        </SkeletonTheme>
                      )}
                    </div>
                  </div>

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

        <div className="bg-[#1E1E1E] mt-2 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold">Receive</span>
            <span className="text-gray-400">Balance: 0</span>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              value={receiveAmount || 0}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="text-2xl bg-transparent outline-none w-1/2"
            />

            <div
              className="bg-[#1A1A1A] hover:cursor-pointer relative rounded-full p-2 flex items-center"
              onClick={() => setShow2(!show2)}
            >
              <div className=" rounded-full mr-2">
                <div className=" rounded-full p-1">
                  <img src={to?.img} alt="" height={30} width={30} />
                </div>
              </div>
              <span className="font-bold mr-2">{to?.name}</span>
              <ChevronDown size={18} />
              {show2 && (
                <div className="absolute z-[9999] h-[10rem] w-[10rem] right-12 overflow-scroll top-12 left-0 bg-[#1E1E1E] rounded-lg p-2 ">
                  {tokens1.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center p-2 hover:bg-[#2A2A2A] rounded-lg cursor-pointer"
                      onClick={() => {
                        setTo(token);
                        setPrice2(-1);
                        setShow2(false);
                      }}
                    >
                      <img
                        src={token.img}
                        alt={token.name}
                        className="w-8 h-8  rounded-full mr-2"
                      />
                      <div>
                        <div className="font-bold">{token.name}</div>
                        <div className="text-gray-500 text-sm">
                          {token.symbol}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        <div className="ml-auto text-left">
                  <div className="text-white">
                    {price2 != -1 ? (
                      `$${price2}`
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

        <div className="space-y-2 mt-2 h-full">
          {chainId1 != 0 &&
            chainId1 != undefined &&
            tokens[chainId1 as keyof typeof tokens].map((token) => (
              <Tab
                key={token.name}
                img={token.img}
                coingeckoId={token.coingeckoId}
                symbol={token.symbol}
                name={token.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function Tab({
  name,
  symbol,
  img,
  coingeckoId,
}: {
  name: string;
  symbol: string;
  img: string;
  coingeckoId: string;
}) {
  const [price, setprice] = useState<number>(-1);
  useEffect(() => {
    try {
      async function handle() {
        const response1 = await api.get(`/user/getPrice/${coingeckoId}`);
        if (response1.status == 200) {
          setprice(response1.data.price);
        }
      }
      handle();
    } catch (e) {
      console.log(e);
      setprice(0);
    }
  }, [coingeckoId]);
  return (
    <div className="bg-[#1E1E1E] hover:cursor-pointer rounded-xl p-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
          <img
            src={img}
            alt="Ethereum"
            width={40}
            height={40}
            className="rounded-full bg-[#627eea]"
          />
        </div>
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-gray-500 text-sm">{symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">
          $
          {price != -1 ? (
            `${price}`
          ) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <p className="w-[5rem]">
                <Skeleton />
              </p>
            </SkeletonTheme>
          )}
        </div>
        <div className="text-green-500 text-sm">+12.34%</div>
      </div>
    </div>
  );
}

export default Swap;
