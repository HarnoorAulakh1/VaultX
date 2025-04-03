import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../contexts/user";

export default function Seed() {
  const navigate = useNavigate();
  const [words, set] = useState(12);
  const [seed, setSeed] = useState([] as string[]);
  const { dispatch } = useContext(userContext);
  const divRef = useRef<HTMLFormElement | null>(null);
  function paste(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (divRef.current) {
      divRef.current.focus();
    }
    chrome.runtime.sendMessage({ action: "readClipboard" }, (response) => {
      console.log("hello1");
      const text = response.text;
      console.log("hello",text);
      setSeed(
        text.split(" ").length === words
          ? text.split(" ")
          : text.split(" ").slice(0, words)
      );
    });
  }
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const newSeed = [...seed];
    newSeed[index] = e.target.value;
    setSeed(newSeed);
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    for (let i = 0; i < words; i++) {
      if (seed[i] === "") {
        toast.error("Please fill all the words");
        return;
      }
    }
    dispatch((x) => {
      return {
        ...x,
        seed_phrase: seed.join(" "),
      };
    });
    navigate("/setup/new-wallet");
  }
  return (
    <form
      ref={divRef}
      onSubmit={(e) => submit(e)}
      className="bg-black text-white w-[361px] h-[600px] p-4 rounded-lg"
    >
      <ToastContainer />
      <div className="flex items-center px-2 gap-2 w-full ">
        <ArrowLeft
          className="text-[#949494]"
          size={24}
          onClick={() => navigate(-1)}
        />
      </div>
      <h2 className="text-xl font-semibold text-center">
        Secret Recovery Phrase
      </h2>
      <p className="text-gray-400 text-center">Enter or paste your phrase</p>

      <div className="flex justify-between my-4 hover:cursor-pointer">
        <div
          className="bg-gray-700 px-4 py-2 rounded-lg"
          onClick={() => set((prev) => (prev === 12 ? 24 : 12))}
        >
          Use {words == 24 ? 12 : 24} words
        </div>
        <div
          className="bg-blue-700 px-4 py-2 rounded-lg hover:cursor-pointer"
          onClick={(e) => {
            paste(e);
          }}
        >
          Paste
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: words }).map((_, index) => (
          <input
            key={index}
            value={seed[index] || ""}
            onChange={(e) => handleInputChange(e, index)}
            className="bg-gray-800 text-white p-2 rounded-md w-full"
            placeholder={`${index + 1}`}
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 mt-4 rounded-lg"
      >
        Import
      </button>
    </form>
  );
}
