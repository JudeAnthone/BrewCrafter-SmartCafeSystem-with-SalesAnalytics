
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";  
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#f8f4e5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />  
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}