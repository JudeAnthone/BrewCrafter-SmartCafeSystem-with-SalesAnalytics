import { Bell, User } from "lucide-react"; // Optional icons

export default function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-[#e4c9a7] flex justify-between items-center px-6">
      <h2 className="text-[#3e2723] font-medium">Welcome, Admin</h2>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-[#f8f4e5] text-[#5d4037]">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center gap-2 text-[#3e2723]">
          <div className="w-8 h-8 bg-[#e4c9a7] rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
}