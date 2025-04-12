import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { walletInterface } from "../../lib/types";
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";

export default function WalletSettings() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [wallet, setWallet] = useState<walletInterface>();
  const [copied, setter] = useState(false);
  useEffect(() => {
    const networks = window.localStorage.getItem("networks");
    if (networks) {
      const wallet = JSON.parse(networks).wallets.find(
        (item: walletInterface) => item.address === id
      );
      if (!wallet) navigate(-1);
      else setWallet(wallet);
    }
  }, []);
  function copy() {
    console.log("copied");
    setter(true);
    navigator.clipboard.writeText(
      window.localStorage.getItem("public_id") || ""
    );
    setTimeout(() => {
      setter(false);
    }, 2000);
  }
  return (
    <div className="flex flex-col items-center gap-8 text-[#f4f4f6] w-[361px] h-[600px] p-4">
      <div className="relative px-2 gap-5 w-full flex flex-row items-center">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl font-semibold text-center w-full">
          {wallet?.name || `Wallet`}
        </h2>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="bg-[#202126] rounded-xl w-full">
          <div
            className="flex flex-row text-xl items-center gap-2 p-4 justify-between hover:bg-[#141418] "
            onClick={() => copy}
          >
            <h1>Wallet Address</h1>
            <div className="flex flex-row items-center gap-2">
              <div className="rounded-md text-lg text-[#969fb0]">
                {wallet?.address?.substring(0, 4)}...
                {wallet?.address?.substring(wallet?.address.length - 4)}
              </div>
              {copied ? (
                <TiTick className="hover:cursor-pointer  text-[#334be9] text-xl" />
              ) : (
                <IoCopyOutline
                  onClick={() => copy()}
                  className="text-xl hover:cursor-pointer text-[#969fb0]"
                />
              )}
            </div>
          </div>
          <div className="flex flex-row text-xl items-center gap-2 p-4 justify-between hover:bg-[#141418] ">
            <h1>Rename Wallet</h1>
            <div className="flex flex-row items-center gap-2">
              <FaChevronRight className="text-xl hover:cursor-pointer text-[#969fb0]" />
            </div>
          </div>
        </div>
        <div className="bg-[#202126] rounded-xl w-full hover:bg-[#141418] ">
          <div className="flex flex-row text-xl items-center gap-2 p-4 justify-between">
            <h1>Show Private Key</h1>
            <div className="flex flex-row items-center gap-2">
              <FaChevronRight className="text-xl hover:cursor-pointer text-[#969fb0]" />
            </div>
          </div>
        </div>
        <div className="bg-[#202126] rounded-xl w-full hover:bg-[#141418] ">
          <div
            onClick={() => navigate("/remove/" + id)}
            className="flex flex-row text-xl items-center gap-2 p-4 justify-between"
          >
            <h1 className="text-[#ff575a]">Romove Wallet</h1>
            <div className="flex flex-row items-center gap-2">
              <FaChevronRight className="text-xl hover:cursor-pointer text-[#969fb0]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
