import { FiArrowUpRight } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { transactionContext } from "../contexts/transactionContext";
import { transactionInterface } from "../lib/types";
import { useParams } from "react-router-dom";
import { userContext } from "../contexts/user";
import { tokens, chainId } from "../lib/config";
import { PiWallet } from "react-icons/pi";

export default function TransactionDetails() {
  const { id } = useParams();
  const { transactions } = useContext(transactionContext);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    img: "",
    address: "",
  });
  const [transaction1, setTransaction] = useState<transactionInterface>();
  const { user } = useContext(userContext);
  useEffect(() => {
    if (transactions == null || transactions == undefined) return;
    const transaction = transactions.find((x) => x.hash === id);
    const find = tokens[
      chainId[
        user.network.network.toLowerCase() as keyof typeof chainId
      ] as keyof typeof tokens
    ].find((x) => x.contractAddress == transaction?.contractAddress);
    if (find) {
      setToken({
        name: find.name,
        symbol: find.symbol,
        img: find.img,
        address:
          (transaction?.from.toLowerCase() == user.public_id.toLowerCase()
            ? transaction?.to
            : transaction?.from) || "",
      });
    }
    if (transaction) setTransaction(transaction);
  }, [transactions, id, user.network.network, user.public_id]);
  return (
    <div className="h-full overflow-scroll">
      <div className="flex flex-col items-center gap-4">
        <img
          src={token.img}
          alt="Ethereum"
          width={100}
          height={100}
          className="rounded-full bg-[#627eea] "
        />
        <h1 className="text-4xl font-bold text-white">
          {token.name ? (
            `${token.name}`
          ) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <p className="w-[5rem]">
                <Skeleton />
              </p>
            </SkeletonTheme>
          )}
        </h1>
      </div>

      <div className="flex flex-col  items-start w-full px-4 gap-2 mt-4">
        <div className="flex flex-row relative gap-5 w-full px-2 items-center">
          <p className="text-gray-400">Transaction Hash</p>
          <span className="text-gray-500 text-sm">
            {transaction1?.hash?.substring(0, 6)}...
            {transaction1?.hash?.substring(transaction1?.hash.length - 4)}
          </span>
          <div className={`flex flex-row hover:w-8 hover:h-8 w-5 h-5 duration-300 ease-linear transition-all absolute left-[80%] justify-center items-center bg-white rounded-full`}><FiArrowUpRight
            onClick={() => {
              if (user.network.network == "Ethereum")
                window.open(
                  `https://etherscan.io/tx/${transaction1?.hash}`,
                  "_blank"
                );
              else
                window.open(
                  `https://bscscan.com/tx/${transaction1?.hash}`,
                  "_blank"
                );
            }}
            className="text-gray-500 hover:cursor-pointer"
            size={20}
          /></div>
          
        </div>
        <p className="text-gray-400 px-2">Market & Additional Info</p>
        <div className="bg-[#202126] text-gray-400 rounded-lg w-full">
          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div className="flex items-center gap-2 border-b border-[#2a2a2a]">
              <PiWallet className="text-[#4c94ff]" size={20} />
              <div className="flex flex-col  gap-1 ">
                <p className="text-white">From</p>
                <p>
                  {transaction1?.from?.substring(0, 6)}...
                  {transaction1?.from?.substring(transaction1?.from.length - 4)}
                </p>
              </div>
            </div>
            <p className={`text-red-400 text-xl`}>
              {"- "}
              {parseFloat(transaction1?.amount||"").toFixed(4)}{" "}
              <span className="text-white">{token.symbol}</span>{" "}
            </p>
          </div>
          {/* <hr className="text-gray-700" /> */}
          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div className="flex items-center gap-2 border-b border-[#2a2a2a]">
              <PiWallet className="text-[#4c94ff]" size={20} />
              <div className="flex flex-col  gap-1 ">
                <p className="text-white">To</p>
                <p>
                  {transaction1?.to?.substring(0, 6)}...
                  {transaction1?.to?.substring(transaction1?.to.length - 4)}
                </p>
              </div>
            </div>
            <p className={`text-green-400 text-xl`}>
              {"+ "}
              {parseFloat(transaction1?.amount||"").toFixed(4)}{" "}
              <span className="text-white">{token.symbol}</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
