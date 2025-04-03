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
  const { user } = useContext(userContext);
  async function handle(e: React.SyntheticEvent) {
    e.preventDefault();
    if (user.private_key || user.seed_phrase) {
      let response;
      try {
        console.log(user);
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
        if (response.status === 200) {
          toast(response.data.message);
          window.localStorage.setItem("public_id", response.data.public_id);
          setTimeout(() => {
            navigate("/");
          }, 2000);
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
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  }
  return (
    <form
      onSubmit={(e) => handle(e)}
      className="flex flex-col items-center h-full  text-white px-[1rem]"
    >
      <ToastContainer />
      <div className="flex items-center py-8 px-2 gap-2 w-full ">
        <ArrowLeft
          className="text-[#949494]"
          size={24}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold">Set up a password</h1>
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
    </form>
  );
}
