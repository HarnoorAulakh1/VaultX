import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { api } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../contexts/user";
import { useContext } from "react";
import { networkInterface } from "../../lib/types";
import { data as data1 } from "../../lib/utils";
import Loader from "react-js-loader";

export default function PasswordSet() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useContext(userContext);
  async function handle(e: React.SyntheticEvent) {
    setLoading(true);
    e.preventDefault();
    if (user.private_key || user.seed_phrase) {
      let response;
      try {
        if (user.private_key)
          response = await api.post("/user/setupExistingWallet", {
            password: password,
            private_key: user.private_key,
            network: user.toggleNetwork,
          });
        else
          response = await api.post("/user/setupExistingWallet", {
            password: password,
            seed_phrase: user.seed_phrase,
            network: user.toggleNetwork,
          });
        dispatch((x) => {
          return { ...x, private_key: "", seed_phrase: "" };
        });
        if (response.status === 200) {
          toast(response.data.message);
          console.log(response.data);
          const networks = window.localStorage.getItem("networks");
          const data = response.data;
          if (networks) {
            const parsedNetworks = JSON.parse(networks);
            const find = parsedNetworks.find(
              (x: networkInterface) => x.network === user.toggleNetwork
            );
            console.log("find", find);
            if (find) {
              const wallets = find.wallets;
              wallets.push({
                name: `Wallet${find.wallets.length + 1}`,
                public_id: data.public_id,
              });
              const store = parsedNetworks.map((x: networkInterface) => {
                if (x.network === user.toggleNetwork) {
                  return find;
                } else {
                  return x;
                }
              });
              console.log("store", store);
              dispatch((x) => {
                return {
                  ...x,
                  public_id: data.public_id,
                  network: {
                    network: user.toggleNetwork || "",
                    name: `Wallet${find.wallets.length + 1}`,
                    img:
                      user.network?.img ||
                      data1.find(
                        (x1: { network: string; img: string }) =>
                          x1.network === data.network
                      )?.img ||
                      "",
                  },
                };
              });
              window.localStorage.setItem("networks", JSON.stringify(store));
              const value = JSON.stringify({
                network: user.toggleNetwork,
                public_id: data.public_id,
                name: `Wallet${find.wallets.length + 1}`,
              });
              window.localStorage.setItem("current", value);
            } else {
              parsedNetworks.push({
                network: data.network,
                wallets: [{ name: "Wallet1", public_id: data.public_id }],
              });
              dispatch((x) => {
                return {
                  ...x,
                  public_id: data.public_id,
                  network: {
                    network: data.network,
                    name: `Wallet1`,
                    img:
                      user.network?.img ||
                      data1.find(
                        (x1: { network: string; img: string }) =>
                          x1.network === data.network
                      )?.img ||
                      "",
                  },
                };
              });
              window.localStorage.setItem(
                "networks",
                JSON.stringify(parsedNetworks)
              );
              window.localStorage.setItem(
                "current",
                JSON.stringify({
                  network: user.toggleNetwork,
                  public_id: data.public_id,
                  name: `Wallet1`,
                })
              );
            }
          } else {
            const store = JSON.stringify([
              {
                network: data.network,
                wallets: [{ name: "Wallet1", public_id: data.public_id }],
              },
            ]);
            window.localStorage.setItem("networks", store);
          }
          window.localStorage.setItem(
            "current",
            JSON.stringify({
              network: data.network,
              public_id: data.public_id,
              name: "Wallet1",
            })
          );
          dispatch((x) => {
            return {
              ...x,
              public_id: data.public_id,
              network: {
                name: "Wallet1",
                network: data.network,
                img:
                  user.network?.img ||
                  data1.find(
                    (x1: { network: string; img: string }) =>
                      x1.network === data.network
                  )?.img ||
                  "",
              },
            };
          });
          navigate("/");
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
        network: user.toggleNetwork,
      });
      const networks = window.localStorage.getItem("networks");
      const data = response.data;
      if (response.status === 200) {
        toast(response.data.message);
        console.log(response.data);
        if (networks) {
          const parsedNetworks = JSON.parse(networks);
          const find = parsedNetworks.find(
            (x: networkInterface) => x.network === data.network
          );
          if (find) {
            const wallets = find.wallets;
            wallets.push({
              name: `Wallet${find.wallets.length + 1}`,
              public_id: data.public_id,
            });
            const store = parsedNetworks.map((x: networkInterface) => {
              if (x.network === data.network) {
                return find;
              } else {
                return x;
              }
            });
            dispatch((x) => {
              return {
                ...x,
                public_id: data.public_id,
                network: {
                  network: data.network,
                  name: `Wallet${find.wallets.length + 1}`,
                  img:
                    user.network?.img ||
                    data1.find(
                      (x1: { network: string; img: string }) =>
                        x1.network === data.network
                    )?.img ||
                    "",
                },
              };
            });
            window.localStorage.setItem(
              "current",
              JSON.stringify({
                network: data.network,
                public_id: data.public_id,
                name: `Wallet${find.wallets.length + 1}`,
              })
            );
            window.localStorage.setItem("networks", JSON.stringify(store));
          } else {
            parsedNetworks.push({
              network: data.network,
              wallets: [{ name: "Wallet1", public_id: data.public_id }],
            });
            dispatch((x) => {
              return {
                ...x,
                public_id: data.public_id,
                network: {
                  network: data.network,
                  name: "Wallet1",
                  img:
                    user.network?.img ||
                    data1.find(
                      (x1: { network: string; img: string }) =>
                        x1.network === data.network
                    )?.img ||
                    "",
                },
              };
            });
            window.localStorage.setItem(
              "networks",
              JSON.stringify(parsedNetworks)
            );
            window.localStorage.setItem(
              "current",
              JSON.stringify({
                network: data.network,
                public_id: data.public_id,
                name: "Wallet1",
              })
            );
          }
        } else {
          const store = JSON.stringify([
            {
              network: data.network,
              wallets: [{ name: "Wallet1", public_id: data.public_id }],
            },
          ]);
          window.localStorage.setItem("networks", store);
          dispatch((x) => {
            return {
              ...x,
              public_id: data.public_id,
              network: {
                network: data.network,
                name: "Wallet1",
                img:
                  user.network?.img ||
                  data1.find(
                    (x1: { network: string; img: string }) =>
                      x1.network === data.network
                  )?.img ||
                  "",
              },
            };
          });
          window.localStorage.setItem(
            "current",
            JSON.stringify({
              network: data.network,
              public_id: data.public_id,
              name: "Wallet1",
            })
          );
        }
        navigate("/");
      }
    }
    setLoading(false);
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
        disabled={
          password.length < 8 || password !== confirmPassword || loading
        }
      >
        {loading ? (
          <div className="w-full h-[2rem] flex items-center justify-center overflow-hidden rounded-2xl bg-gray-300 z-[999] ">
            <Loader type="circle" color="#ffffff" size={20} />
          </div>
        ) : (
          "Next"
        )}
      </button>
    </form>
  );
}
