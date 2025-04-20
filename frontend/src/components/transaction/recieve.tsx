import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/utils";
import { ToastContainer, toast } from "react-toastify";
import QRCode from "react-qr-code";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { userContext } from "../../contexts/user";

export default function Recieve() {
  const [address, set] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user}=useContext(userContext);
  useEffect(() => {
    async function handle() {
      setLoading(false);
      const public_id = user.public_id;
      console.log(user);   
      if (!public_id) return;
      try {
        const checkAddress = await api.post("/user/checkAddress", {
          public_id: public_id,
          network: user.network.network,
        });
        if (checkAddress.status == 200) {
          set(public_id);
        }
      } catch (error) {
        toast(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
      setLoading(true);
    }
    handle();
  }, [user]);
  return (
    <div className="bg-black text-white w-[361px] h-[600px] p-6 flex flex-col items-center">
      <ToastContainer />
      <div className="relative px-2 gap-2 w-full mb-10">
        <RxCross2
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-lg w-full text-center font-semibold">Deposit</h2>
      </div>
      <div className="bg-white p-2 rounded-md mt-6">
        <div className="w-50 h-50 bg-gray-300">
          {address && <QRCode value={address} className="w-50 h-50" />}
        </div>
      </div>
      {!loading || loading == null ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p className="w-[20em] mt-4" >
            <Skeleton count={2}/>
          </p>
        </SkeletonTheme>
      ) : (
        <p className="mt-4 break-all text-lg text-center">{address}</p>
      )}
      <button
        onClick={() => {
          if (address) {
            navigator.clipboard.writeText(address);
            toast.success("Address copied to clipboard");
          } else {
            toast("Address is not available");
          }
        }}
        className="hover:bg-[#191f2f] bg-[#0f1d3f] hover:text-[#5480c3] text-[#4c94ff] px-4 py-2 mt-4 rounded-md"
      >
        Copy address
      </button>
      <p className="text-gray-400 text-sm mt-2 text-center">
        This address can only receive assets on Ethereum.
      </p>
    </div>
  );
}
