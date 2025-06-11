import { Link, useLocation } from "react-router-dom";
import { Coffee, ShoppingCart, Menu, Package, Users, Settings } from "lucide-react"; // Optional icons

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <Coffee size={18} /> },
  { to: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { to: "/menu", label: "Menu Manager", icon: <Menu size={18} /> },
  { to: "/inventory", label: "Inventory", icon: <Package size={18} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-[#f8f4e5] h-screen p-4 border-r border-[#e4c9a7] shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#3e2723]">BrewCrafter</h1>
        <p className="text-[#5d4037] text-sm">Admin Dashboard</p>
      </div>
      
      <nav className="flex flex-col gap-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-[#e4c9a7] ${
              location.pathname === link.to 
                ? "bg-[#e4c9a7] text-[#3e2723] font-medium" 
                : "text-[#5d4037]"
            }`}
          >
            <span className="mr-2">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}