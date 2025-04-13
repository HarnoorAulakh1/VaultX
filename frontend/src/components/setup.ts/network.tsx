import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useState } from "react";
import { data } from "../../lib/utils";
import { useParams } from "react-router-dom";
import { userInterface } from "../../contexts/user";
import { userContext } from "../../contexts/user";
import { useContext } from "react";

export default function Network() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col relative items-center gap-5 text-[#f4f4f6] w-full h-full p-4">
      <div className="relative px-2 gap-2 w-full flex flex-row items-center">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold text-center w-full">
          Set up networks
        </h2>
      </div>
      <h1 className="text-lg text-[#949494]">
        You can always add and remove later.
      </h1>
      <List />
    </div>
  );
}

function List() {
  const [selected, setSelected] = useState({ index: -1, state: false });
  const navigate = useNavigate();
  const { dispatch } = useContext(userContext);
  const { id } = useParams();
  function handle() {
    dispatch((x:userInterface) => {
      return {
        ...x,
        network: {
          ...x.network,
          network: data[selected.index].network,
          img: data[selected.index].img,
        },
      };
    });
    navigate("/setup/" + id);
  }
  return (
    <div className="flex flex-col w-full items-center text-lg gap-2 overflow-hidden">
      <h1 className="text-[#949494] text-lg">Recommended networks</h1>
      <div className="flex flex-col gap-2 w-full overflow-scroll pb-[3rem]">
        {data.map((item, index) => (
          <div key={index} onClick={() => setSelected({ index: index, state: true })}>
            <Tab
              name={item.network}
              img={item.img}
              key={item.network}
              selected={index === selected.index}
            />
          </div>
        ))}
      </div>
      <div className="px-5 w-full absolute bottom-5">
        <button
          onClick={() => handle()}
          className="bg-[#f4f4f6] font-semibold flex flex-row gap-2 justify-center items-center hover:bg-[#c3c3c5] text-[#202126] rounded-xl px-8 py-2 w-full"
        >
          Select Networks
        </button>
      </div>
    </div>
  );
}

function Tab({
  name,
  img,
  selected,
}: {
  name: string;
  img: string;
  selected: boolean;
}) {
  return (
    <div className="flex flex-row hover:cursor-pointer font-semibold text-xl gap-2 rounded-2xl items-center w-full p-4 bg-[#202126]">
      {selected ? (
        <MdOutlineRadioButtonChecked className="text-[#f4f4f6]" />
      ) : (
        <MdOutlineRadioButtonUnchecked className="text-[#949494]" />
      )}
      <img src={img} width={30} height={30} />
      <h1 className=" text-[#949494]">{name}</h1>
    </div>
  );
}
