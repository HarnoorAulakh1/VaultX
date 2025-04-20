import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/utils";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { userContext } from "../../contexts/user";
export default function Send() {
  const [address, set] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  useEffect(() => {
    async function handle() {
      try {
        const response = await api.post("/user/checkAddress", {
          public_id: address,
          network:user.network.network
        });
        console.log(response.status);
        if (response.status === 200) {
          setCheck(true);
        }
      } catch (e) {
        console.log(e);
        setCheck(false);
      }
    }
    handle();
  }, [address]);
  return (
    <div className="bg-black text-white w-[361px] h-[600px] p-6 flex flex-col">
        <div className="relative px-2 gap-2 w-full ">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold text-center w-full">Send Eth</h2>
      </div>
      <input
        type="text"
        onChange={(e) => set(e.target.value)}
        placeholder="Enter address"
        className="bg-gray-800 text-white mt-4 px-3 py-2 rounded-md w-full outline-none"
      />
      {!check && address && (
        <p className="text-red-400"> enter a valid address</p>
      )}
      <div className="bg-gray-900 p-10 flex justify-center items-center rounded-md mt-6">
        <p className="text-gray-400">No additional wallets found</p>
      </div>
      <button
      onClick={() => {
        if (check) {
          navigate(`/app/sendEth/${address}`);
        }
      }}
        disabled={!check}
        className={` ${
          check ? "bg-blue-600" : "bg-gray-300 text-gray-900"
        } px-4 py-2 mt-10 rounded-md cursor-not-allowed`}
      >
        Next
      </button>
    </div>
  );
}
