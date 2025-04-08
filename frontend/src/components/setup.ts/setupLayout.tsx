import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { api } from "../../lib/utils";
export default function SetupLayout() {
  useEffect(() => {
    async function logout() {
      await api.get("/user/lock");
    }
    logout();
  }, []);
  return (
    <div className="w-[361px] h-screen flex justify-center items-center bg-[#0e0e0f]">
      <Outlet />
    </div>
  );
}
