import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { api } from "../../lib/utils";
export default function SetupLayout() {
  useEffect(() => {
    async function logout() {
      await api.post("/user/lock");
    }
    logout();
  }, []);
  return (
    <div className="w-[361px] h-[600px] rounded-2xl flex justify-center items-center bg-[#0e0e0f] z-[999]">
      <Outlet />
    </div>
  );
}
