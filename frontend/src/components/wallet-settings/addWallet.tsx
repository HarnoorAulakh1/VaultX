import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";

export default function AddWallet() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 text-[#f4f4f6] w-[361px] h-[600px] p-4">
      <div className="relative px-2 gap-2 w-full flex flex-row items-center">
        <RxCross2
          className="text-[#949494] hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex flex-col items-center gap-5 w-full px-2">
        <div className="flex flex-row items-center">
          <div className="bg-[#202126] rounded-full p-5">
            <img src="./eth.webp" alt="" height={40} width={40} />
          </div>
        </div>

        <h1 className="text-2xl font-semibold">Add Ethereum Wallet</h1>
        <h1 className="text-lg text-[#969fb0]">Choose a method</h1>
        <div className="w-full">
          <h1 className="text-lg text-[#969fb0]">
            Use existing recovery phrase
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <Tab name="Create new wallet">
            <FaPlus />
          </Tab>
        </div>
        <div className="w-full">
          <h1 className="text-lg text-[#969fb0]">Import Existing Wallet</h1>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <Tab name="Recovery Phrase" link="/setup/seed">
            <FaPlus />
          </Tab>
          <Tab name="Private Key" link="/setup/key">
            <IoKeySharp />
          </Tab>
        </div>
      </div>
    </div>
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
        if(link)
        navigate(link)}}
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
