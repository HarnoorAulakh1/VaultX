import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/utils";
import { userContext } from "../../contexts/user";

export default function ShowKey() {
  const [copied, setter] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function handle() {
      const public_id1 = window.localStorage.getItem("public_id1");
      try {
        const response = await api.post("/user/privateKey", {
          public_id: user.public_id,
          public_id1: public_id1,
        });
        if (response.status === 200) {
          setPrivateKey(response.data.privateKey);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    handle();
    return () => {
      setPrivateKey("");
    };
  }, []);
  function copy() {
    console.log("copied");
    setter(true);
    navigator.clipboard.writeText(
     privateKey || ""
    );
    setTimeout(() => {
      setter(false);
    }, 2000);
  }
  return (
    <div className="flex flex-col relative font-semibold  items-center gap-8 text-[#f4f4f6] w-full h-full p-4">
      <h1 className="text-xl ">Private Key</h1>
      <div className="flex flex-col items-center gap-2">
        <MdOutlineRemoveRedEye className="text-[#f4f4f6]" size={30} />
        <h1>Your Private Key</h1>
        <h1>Never give out your private key to anyone.</h1>
      </div>
      <div className="bg-[#202126] border-2 font-medium border-[#46474a] break-words text-lg w-full p-4 rounded-2xl h-[8rem]">
        {privateKey}
      </div>
      <div className="absolute bottom-0 w-full p-6">
        <button
          type="button"
          className="bg-[#f4f4f6] flex flex-row gap-2 justify-center items-center hover:bg-[#c3c3c5] text-[#202126] rounded-xl px-8 py-2 w-full"
          onClick={() => copy()}
        >
          Copy
          {copied ? (
            <TiTick className="hover:cursor-pointer  text-[#334be9] text-xl" />
          ) : (
            <IoCopyOutline
              onClick={() => copy()}
              className="text-xl hover:cursor-pointer "
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-[#202126] hover:bg-[#1a1a1e] rounded-xl px-8 py-2 w-full mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
