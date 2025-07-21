import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { api } from "../../lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import Popup from "../../lib/popup";
import { useRef } from "react";
import { userContext } from "../../contexts/user";
import { useContext } from "react";
import { tokenContext } from "../../contexts/tokenContext";
export default function SendEth() {
  const { id } = useParams();
  const [amt, setter] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { user } = useContext(userContext);
  const { token } = useContext(tokenContext);
  const navigate = useNavigate();
  const ref = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  async function handleClickOutside(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading1(true);
    try {
      console.log({
        to: id,
        amount: String(amt),
        public_id: user.public_id,
        public_id1: window.localStorage.getItem("public_id1"),
        network: user.network.network,
      });
      const response = await api.post("/user/transaction", {
        to: id,
        amount: String(amt),
        public_id: user.public_id,
        public_id1: window.localStorage.getItem("public_id1"),
        network: user.network.network,
        contractAddress: token.contractAddress,
      });
      console.log(response.data.message);
      if (response.status === 200) {
        setter(0);
        formRef.current?.reset();
        ref.current?.click();
        toast.success("Transaction successful");
        setTimeout(() => navigate("/app"), 2000);
      } else {
        ref.current?.click();
        toast.error("Transaction failed");
      }
    } catch (e) {
      ref.current?.click();
      toast.error(
        e instanceof Error ? e.message : "An unexpected error occurred"
      );
    }
    setLoading1(false);
  }
  useEffect(() => {
    console.log(token);
    async function handle() {
      setLoading(false);
      const public_id = user.public_id;
      try {
        const response = await api.post("/user/balance", {
          public_id: public_id,
          network: user.network.network,
          contractAddress: token.contractAddress,
        });
        if (response.status === 200) {
          setBalance(response.data.balance);
          console.log(response.data);
        } else {
          toast.error("Error fetching balance");
        }
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : "An unexpected error occurred"
        );
      }
      setLoading(true);
    }
    handle();
  }, []);
  return (
    <form
      ref={formRef}
      onSubmit={(e) => handleClickOutside(e)}
      className="flex flex-col items-center mt-5 relative  text-white w-[361px] h-[600px] p-4 rounded-lg"
    >
      <ToastContainer />
      <div className="px-2 w-full relative">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold text-center w-full">Send {token.name}</h2>
      </div>

      <div
        className="mt-6 bg-[#262525] text-white px-4 py-2 rounded-md text-sm"
        onClick={() => {
          navigator.clipboard.writeText(id || "");
          toast.success("Address copied to clipboard");
        }}
      >
        {id?.substring(0, 6)}...{id?.substring(id.length - 4)}
      </div>

      <div className="flex flex-col items-center mt-8">
        <input
          type="number"
          onChange={(e) => {
            if (parseFloat(e.target.value) <= balance) {
              setter(parseFloat(e.target.value));
            }
          }}
          value={amt}
          className="bg-transparent text-5xl font-semibold text-gray-300 w-full text-center focus:outline-none"
          placeholder="0"
        />
        <div className="flex items-center mt-2">
          <img src={token.img} alt={token.symbol} className="w-10 h-10" />
          <span className="ml-2 text-gray-400 text-2xl font-semibold">{token.symbol}</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">$0.00</p>
      </div>

      {!loading || loading == null ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p className="w-[5rem]">
            <Skeleton />
          </p>
        </SkeletonTheme>
      ) : (
        <div className="mt-4 bg-gray-700 text-gray-400 px-4 py-1 rounded-md text-sm">
          Max: {balance} {token.symbol}
        </div>
      )}

      <Popup
        trigger={
          <button
            ref={ref}
            type="button"
            disabled={amt <= 0}
            className={` ${
              amt > 0 ? "bg-blue-600" : "bg-gray-300 text-gray-900"
            } px-4 py-2 mt-10 rounded-md cursor-not-allowed`}
          >
            Review
          </button>
        }
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-center w-full">
            Transaction
          </h2>
          <div className="flex flex-col gap-2 text-gray-400 mt-4  text-sm break-words whitespace-pre-line break-all">
            <span>You are about to send</span>{" "}
            <span className="text-gray-200">
              amt: <span className="">{amt}</span>{" "}
            </span>
            <span className="text-gray-200">
              address: <span className=" ">{id}</span>{" "}
            </span>
          </div>
          <button
            disabled={loading1}
            type="submit"
            className={` ${
              amt > 0 && !loading1 ? "bg-blue-600" : "bg-gray-300 text-gray-900"
            } px-4 py-2 mt-10 rounded-md cursor-not-allowed`}
          >
            Confirm
          </button>
          <p className="text-gray-400 text-sm mt-2 text-center">
            This address can only receive assets on {token.name}.
          </p>
        </div>
      </Popup>
      <div className=""></div>
    </form>
  );
}
