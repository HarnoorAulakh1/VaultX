import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { api } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../contexts/user";
import { useContext } from "react";

export default function PasswordSet() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { user, dispatch } = useContext(userContext);
  const [data, setData] = useState({
    private_key: user.private_key,
    seed_phrase: user.seed_phrase,
  });
  const [show, setter] = useState(false);
  async function handle(e: React.SyntheticEvent) {
    e.preventDefault();
    if (user.private_key || user.seed_phrase) {
      let response;
      try {
        if (user.private_key)
          response = await api.post("/user/setupExistingWallet", {
            password: password,
            private_key: user.private_key,
          });
        else
          response = await api.post("/user/setupExistingWallet", {
            password: password,
            seed_phrase: user.seed_phrase,
          });
        dispatch((x) => {
          return { ...x, private_key: "", seed_phrase: "" };
        });
        if (response.status === 200) {
          toast(response.data.message);
          window.localStorage.setItem("public_id", response.data.public_id);
          setter(true);
          setData({
            private_key: response.data.private_key,
            seed_phrase: response.data.seed_phrase,
          });
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
      return;
    } else {
      const response = await api.post("/user/setup", {
        password: password,
      });
      if (response.status === 200) {
        toast(response.data.message);
        window.localStorage.setItem("public_id", response.data.public_id);
        setter(true);
        setData({
          private_key: response.data.private_key,
          seed_phrase: response.data.seed_phrase,
        });
      }
    }
  }
  async function next(e: React.SyntheticEvent) {
    e.preventDefault();
    setter(false);
    setData({
      private_key: "",
      seed_phrase: "",
    });
    navigate("/");
  }
  return (
    <form
      onSubmit={(e) => handle(e)}
      className="flex flex-col items-center h-full overflow-hidden  text-white px-[1rem]"
    >
      <ToastContainer />
      <div className="relative py-8 px-2 gap-2 w-full ">
        <ArrowLeft
          className="text-[#949494] absolute hover:cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl text-center w-full font-bold">
          Set up a password
        </h1>
      </div>
      <p className="text-gray-400 text-sm mt-2 ml-2">
        It should be at least 8 characters. You'll need this to unlock VaultX.
      </p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-4 p-2 outline-none bg-gray-800 text-white rounded-lg"
      />
      <input
        name="password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`w-full mt-2 p-2 bg-gray-800 outline-none text-white rounded-lg ${
          confirmPassword !== "" && password !== confirmPassword
            ? "border-[2px] border-red-900"
            : "border-0"
        }`}
      />
      <button
        type="submit"
        className={`w-full mt-4 py-2 rounded-lg ${
          password.length >= 8 && password === confirmPassword
            ? "bg-gray-300 text-black"
            : "bg-gray-800 text-gray-500"
        }`}
        disabled={password.length < 8 || password !== confirmPassword}
      >
        Next
      </button>
      {show && (
        <div className="flex flex-col break-words whitespace-normal overflow-hidden py-8 px-2 gap-2 w-full ">
          <h1>Note down these credentionals and store in a secure loaction.</h1>
          <span className="text-sm text-gray-400 ">
            <span className="underline">Seed phrase:</span> <br />
            {data.seed_phrase}
          </span>
          <span className="text-sm text-gray-400">
            <span className="underline">Private key:</span> <br />
            {data.private_key}
          </span>
          <button
            type="button"
            onClick={(e) => next(e)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Continue
          </button>
        </div>
      )}
    </form>
  );
}
