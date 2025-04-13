import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { useEffect } from "react";
import { api } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { userContext, userInterface } from "../contexts/user";
import { data } from "../lib/utils";
import { useContext } from "react";
// import { useState } from "react";
// import Loader from "react-js-loader";
export default function AppLayout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(userContext);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    const current=window.localStorage.getItem("current");
    if (!current) {
      navigate("/setup");
    }
    async function handle() {
      try {
        const response = await api.post("/user/checkLogin");
        if (response.status != 200) {
          navigate("/");
        } else {
          const data1 = window.localStorage.getItem("current");
          const data2 = JSON.parse(data1 || "{}");
          console.log(data2);
          dispatch((x: userInterface) => {
            return {
              ...x,
              public_id: data2.public_id,
              network: {
                name: data2.name,
                network: data2.network,
                img:
                  data.find(
                    (x1: { network: string; img: string }) =>
                      x1.network === data2.network
                  )?.img || "",
              },
            };
          });
        }
      } catch (error) {
        navigate("/");
        console.log(error);
      }
      // setLoading(true);
    }
    handle();
  }, []);

  return (
    <>
      <div className="h-[600px] w-[360px] overflow-hidden">
        {/* {loading && loading != null ? ( */}
        <div className="overflow-hidden h-[91%] relative flex flex-col">
          <Outlet />
        </div>
        {/* ) : (
          <div className="flex justify-center items-center text-white text-3xl h-[91%]">
            <Loader
              type="ping-cube"
              color="#ffffff"
              title={"VAULT X"}
              size={100}
            />
          </div>
        )}  */}
        <Footer />
      </div>
    </>
  );
}
