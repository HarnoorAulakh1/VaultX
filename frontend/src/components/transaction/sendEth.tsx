import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { api } from "../../lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
export default function SendEth() {
  const { id } = useParams();
  const [amt, setter] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function handle() {
      setLoading(false);
      const public_id = window.localStorage.getItem("public_id");
      try {
        const response = await api.post("/user/checkAddress", {
          public_id: public_id,
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
    <div className="flex flex-col items-center mt-5 relative  text-white w-[361px] h-[600px] p-4 rounded-lg">
      <ToastContainer />
      <div className="px-2 w-full relative">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold text-center w-full">Send ETH</h2>
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
            setter(parseFloat(e.target.value));
          }}
          className="bg-transparent text-5xl font-semibold text-gray-300 w-full text-center focus:outline-none"
          placeholder="0"
        />
        <div className="flex items-center mt-2">
          <img src="./eth.webp" alt="ETH" className="w-10 h-10" />
          <span className="ml-2 text-gray-400 text-2xl font-semibold">ETH</span>
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
          Max: {balance} ETH
        </div>
      )}

      <button
        disabled={amt <= 0}
        className={` ${
          amt > 0 ? "bg-blue-600" : "bg-gray-300 text-gray-900"
        } px-4 py-2 mt-10 rounded-md cursor-not-allowed`}
      >
        Review
      </button>
    </div>
  );
}
