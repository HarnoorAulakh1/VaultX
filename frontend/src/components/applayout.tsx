import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { useEffect } from "react";
import { api } from "../lib/utils";
import { useNavigate } from "react-router-dom";
export default function AppLayout() {
  //const location = useLocation();
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function handle() {
      //setLoading(false);
      const public_id = window.localStorage.getItem("public_id");
      if (!public_id) {
        navigate("/setup");
      }
      try {
        const checkAddress = await api.post("/user/checkAddress", {
          public_id: public_id,
        });
        if (checkAddress.status == 200) {
          try {
            const response = await api.post("/user/checkLogin");
            if (response.status != 200) {
              navigate("/");
            }
          } catch (error) {
            navigate("/");
            console.log(error);
          }
        } else {
          window.localStorage.removeItem("public_id");
          navigate("/setup");
        }
        //setLoading(true);
      } catch (error) {
        console.log(error);
        window.localStorage.removeItem("public_id");
        navigate("/setup");
      }

    }
    handle();
  }, []);

  return (
    <>
      <div className="h-[600px] w-[360px] overflow-hidden">
        {/* {loading && loading != null ? ( */}
          <div
            className="overflow-hidden h-[91%] relative flex flex-col"
          >
            <Outlet />
          </div>
        {/* ) : (
          <div className="flex justify-center items-center text-white text-3xl h-[91%]">
            <Loader
              type="ping-cube"
              color="#ffffff"
              title={"F**K  u  B****H"}
              size={100}
            />
          </div>
        )} */}
        <Footer />
      </div>
    </>
  );
}
