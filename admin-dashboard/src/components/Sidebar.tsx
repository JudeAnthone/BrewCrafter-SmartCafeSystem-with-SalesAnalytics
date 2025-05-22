import React from "react";
import { Link, useLocation } from "react-router-dom";

// Navigation datas
// Arrays of objects defining navigation links
const links = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/orders", label: "Orders" },
	{ to: "/menu", label: "Menu Manager" },
	{ to: "/inventory", label: "Inventory" },
	{ to: "/customers", label: "Customers" },
	{ to: "/settings", label: "Settings" },
];


export default function Sidebar() {
	const location = useLocation();
  
	return (
		<aside className="w-64 bg-[#f8f4e5] h-screen p-4">

			<nav className="flex flex-col gap-2">
				{links.map((link) => (
					<Link
						key={link.to}
						to={link.to}
						className={`p-2 rounded ${location.pathname === link.to ? "bg-[#e4c9a7] font-bold" : ""}`}
					>
						{link.label}
					</Link>
				))}
			</nav>
      
		</aside>
	);
}
