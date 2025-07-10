import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProfileDrawer from "./ProfileDrawer";

const Header = () => {
	const { currentUser } = useAuth();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const location = useLocation();

	// Hiding header on login/register/forgot-password pages
	if (["/login", "/register", "/forgot-password"].includes(location.pathname)) {
		return null;
	}

	return (
		<header className="sticky top-0 z-50 bg-white shadow-md px-4 py-2">
			<div className="max-w-7xl mx-auto flex items-center justify-between h-10 px-4 rounded-lg">
			
				{/* Logo */}
				<div className="flex items-center">
					<img
						src="/LOGO_brewcrafter.png"
						alt="BrewCrafter Logo"
						className="h-17 w-auto"
					/>
				</div>

				{/* Navbar Links */}
				<nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
					<Link
						to="/"
						className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium"
					>
						Home
					</Link>
					
					<Link
						to="/about"
						className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium"
					>
						About Us
					</Link>
					
					{currentUser && (
						<>
							<Link
								to="/menu"
								className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium"
							>
								Menu
							</Link>
							
							<Link
								to="/craft"
								className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium"
							>
								Craft
							</Link>
							
							<Link
								to="/cart"
								className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium"
							>
								Cart
							</Link>

							<Link
								to="/order-history"
								className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium"
							>
								Order History
							</Link>
						</>
					)}
				</nav>


				{/* Auth/Profile */}
				<div className="flex items-center space-x-4">
					{!currentUser ? (
						<>
							<Link
								to="/login"
								className="px-4 py-2 bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white rounded-lg transition-all duration-200 font-medium"
							>
								Login
							</Link>
							
							<Link
								to="/register"
								className="px-4 py-2 bg-[#cc6d2d] text-white hover:bg-[#3e2723] rounded-lg transition-all duration-200 font-medium"
							>
								Register
							</Link>
						</>
					) : (
						<>
							<button
								onClick={() => setDrawerOpen(true)}
								className="flex items-center space-x-2 bg-[#cc6d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3e2723] transition"
							>
								<span>{currentUser.name || currentUser.email}</span>
								<svg
									className="w-5 h-5 ml-1"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<ProfileDrawer open={drawerOpen} setOpen={setDrawerOpen} />
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
