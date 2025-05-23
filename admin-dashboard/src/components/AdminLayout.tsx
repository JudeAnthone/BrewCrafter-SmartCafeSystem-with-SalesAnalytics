import Sidebar from "./Sidebar";
import Topbar from "./Topbar"; // Optional, import if you created it
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#f8f4e5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar /> {/* Optional, comment out if not using */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}