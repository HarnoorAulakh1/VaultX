import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { userContext } from "../../contexts/user";

export default function PrivateKey() {
  const navigate = useNavigate();
  const { dispatch } = useContext(userContext);
  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const key = (form.elements.namedItem("key") as HTMLTextAreaElement).value;
    if (key === "") {
      toast.error("Please fill the key");
      return;
    }
    dispatch((x) => {
      return {
        ...x,
        private_key: key,
      };
    });
    navigate("/setup/new-wallet");
  }
  return (
    <form
      onSubmit={(e) => handle(e)}
      className="bg-black text-white w-[361px] h-[600px] mt-2 p-4 rounded-lg"
    >
      <ToastContainer />
      <div className="flex items-center px-2 gap-2 w-full ">
        <ArrowLeft
          className="text-[#949494]"
          size={24}
          onClick={() => navigate(-1)}
        />
      </div>
      <h2 className="text-xl font-semibold text-center flex items-center justify-center">
        <span className="mr-2">🔑</span> Import private key
      </h2>
      <p className="text-gray-400 text-center">
        It will be encrypted and stored on your device.
      </p>

      <textarea
        name="key"
        className="w-full bg-gray-800 text-white p-2 mt-4 rounded-md"
        placeholder="Private key"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 mt-4 rounded-lg"
      >
        Import
      </button>
    </form>
  );
}
