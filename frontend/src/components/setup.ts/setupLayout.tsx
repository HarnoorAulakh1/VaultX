import { Outlet } from "react-router-dom";
export default function SetupLayout() {
    return (
        <div className="w-[361px] h-screen flex justify-center items-center bg-[#0e0e0f]">
            <Outlet />
        </div>
    );
    }