import { ArrowLeft } from "lucide-react";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { walletInterface } from "../../lib/types";
import { useContext } from "react";
import { userContext } from "../../contexts/user";
import { ToastContainer,toast} from "react-toastify";

export default function Remove() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {user}=useContext(userContext);
  function remove(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(id==user.public_id){
        toast.error("You cannot remove your current wallet");
        return;
    }
    const networks = JSON.parse(window.localStorage.getItem("networks")|| "{}");
    if (networks) {
      const network = networks.find(
        (item: walletInterface) => item.network === user.network?.network
      );
      const wallets = network?.wallets.filter(
        (item: walletInterface) => item.public_id !== id
      );
      const store=networks.map((item: walletInterface) => {
        if (item.network === user.network?.network) {
            return {
                ...item,
                wallets
            }
        }
        return item;
      });
      //  console.log("store", store);
      window.localStorage.setItem(
        "networks",
        JSON.stringify(store)
      );
    }
    navigate("/");
  }
  return (
    <div className="flex flex-col relative items-center gap-5 text-[#f4f4f6] w-full h-full p-4">
      <ToastContainer/>
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
          className="bg-[#202126] hover:cursor-pointer rounded-xl px-8 py-2 "
        >
          Cancel
        </button>
        <button
          onClick={(e) => remove(e)}
          type="button"
          className="bg-[#351a1f] hover:cursor-pointer text-[#ff575a] rounded-xl px-8 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
