import { ArrowLeft } from "lucide-react";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { walletInterface } from "../../lib/types";

export default function Remove() {
  const navigate = useNavigate();
  const { id } = useParams();
  function remove(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const networks = window.localStorage.getItem("networks");
    if (networks) {
      const wallets = JSON.parse(networks).wallets.filter(
        (item: walletInterface) => item.address !== id
      );
      window.localStorage.setItem(
        "networks",
        JSON.stringify({ ...JSON.parse(networks), wallets })
      );
    }
    navigate("/");
  }
  return (
    <div className="flex flex-col relative items-center gap-5 text-[#f4f4f6] w-[361px] h-[600px] p-4">
      <div className="relative px-2 gap-2 w-full flex flex-row items-center">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold text-center w-full">
          Remove Wallet
        </h2>
      </div>
      <IoWarning className="text-[8rem] text-[#ff575a] px-4" />
      <h1 className="text-2xl text-[#f4f4f6] text-center">
        Are you sure you want to remove {id?.substring(0, 4)}...
        {id?.substring(id.length - 4)}
      </h1>
      <h1 className="text-lg text-[#969fb0] text-center px-6">
        Removing from Backpack will not delete the wallet’s contents. It will
        still be available by importing your secret recovery phrase in a new
        Backpack
      </h1>

      <div className="absolute bottom-[1rem] flex flex-row gap-10 items-center w-full justify-center">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="bg-[#202126] rounded-xl px-8 py-2 "
        >
          Cancel
        </button>
        <button
          onClick={(e) => remove(e)}
          type="button"
          className="bg-[#351a1f] text-[#ff575a] rounded-xl px-8 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
