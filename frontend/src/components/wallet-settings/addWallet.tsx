import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { api } from "../../lib/utils";
import { walletInterface } from "../../lib/types";
import { useState } from "react";
import Loader from "react-js-loader";
import { data } from "../../lib/utils";

export default function AddWallet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { network } = useParams();
  async function createWallet() {
    setLoading(true);
    const networks = JSON.parse(
      window.localStorage.getItem("networks") || "{}"
    );
    const network1 = networks.find(
      (item: walletInterface) => item.network === network
    );
    const public_id1 = window.localStorage.getItem("public_id1");
    try {
      const response = await api.post("/user/setup", {
        public_id: public_id1,
        network: network,
      });
      if (response.status == 200) {
        const data = await response.data;
        if (network1) {
          network1.wallets.push({
            public_id: data.public_id,
            name: `Wallet${network1.wallets.length + 1}`,
          });
          window.localStorage.setItem("networks", JSON.stringify(networks));
        } else {
          const newNetwork = {
            network: network,
            wallets: [
              {
                public_id: data.public_id,
                name: `Wallet1`,
              },
            ],
          };
          networks.push(newNetwork);
          window.localStorage.setItem("networks", JSON.stringify(networks));
        }
        navigate("/app/wallet");
      } else {
        console.log("error");
      }
    } catch (error) {
      navigate(-1);
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center text-white text-3xl h-[600px] w-[360px]">
          <Loader
            type="ping-cube"
            color="#ffffff"
            title={"F**K  u  B****H"}
            size={100}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 text-[#f4f4f6] w-full h-full p-4">
          <div className="relative px-2 gap-2 w-full flex flex-row items-center">
            <RxCross2
              className="text-[#949494] hover:cursor-pointer"
              size={24}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="flex flex-col items-center gap-5 w-full px-2 overflow-scroll ">
            <div className="flex flex-row items-center">
              <div className="bg-[#202126] rounded-full p-5">
                <img
                  src={data.find((x) => x.network == network)?.img}
                  alt=""
                  height={40}
                  width={40}
                />
              </div>
            </div>

            <h1 className="text-2xl font-semibold">Add {network} Wallet</h1>
            <h1 className="text-lg text-[#969fb0]">Choose a method</h1>
            <div className="w-full">
              <h1 className="text-lg text-[#969fb0]">
                Use existing recovery phrase
              </h1>
            </div>
            <button
              disabled={loading}
              onClick={() => createWallet()}
              className={`flex flex-col gap-2 items-center w-full`}
            >
              <Tab name="Create new wallet">
                <FaPlus />
              </Tab>
            </button>
            <div className="w-full">
              <h1 className="text-lg text-[#969fb0]">Import Existing Wallet</h1>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <Tab name="Recovery Phrase" link="/setup/network/seed">
                <FaPlus />
              </Tab>
              <Tab name="Private Key" link="/setup/network/key">
                <IoKeySharp />
              </Tab>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Tab({
  name,
  children,
  link,
}: {
  name: string;
  children: React.ReactNode;
  link?: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (link) navigate(link);
      }}
      className="flex flex-row gap-4 hover:bg-[#141418] relative items-center p-4 rounded-2xl w-full bg-[#202126] hover:cursor-pointer"
    >
      <div className="text-[#969fb0] text-xl">{children}</div>

      <h1 className="text-lg">{name}</h1>
      <div className="absolute right-[2rem] text-[#969fb0]">
        <FaChevronRight />
      </div>
    </div>
  );
}
