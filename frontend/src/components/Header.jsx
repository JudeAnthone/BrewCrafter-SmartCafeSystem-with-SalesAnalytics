import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProfileDrawer from "./ProfileDrawer";

const Header = () => {
	const { currentUser } = useAuth();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const location = useLocation();

	// Hides header on login/register/forgot-password pages
	if (["/login", "/register", "/forgot-password"].includes(location.pathname)) {
		return null;
	}

	return (
		<header className="sticky top-0 z-50 bg-white shadow-md px-4 py-2">
			<div className="max-w-7xl mx-auto flex items-center justify-between h-10 px-20 rounded-lg">
				{/* Logo */}
				<div className="flex items-center">
					<Link to="/">
						<img
							src="/LOGO_brewcrafter.png"
							alt="BrewCrafter Logo"
							className="h-17 w-auto"
						/>
					</Link>
				</div>

				{/* Navbar Links */}
				<nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-5">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
								isActive
									? "bg-[#cc6d2d] text-white"
									: "text-[#3e2723] hover:bg-[#cc6d2d] hover:text-white"
							}`
						}
					>
						Home
					</NavLink>

					<NavLink
						to="/about"
						className={({ isActive }) =>
							`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
								isActive
									? "bg-[#cc6d2d] text-white"
									: "text-[#3e2723] hover:bg-[#cc6d2d] hover:text-white"
							}`
						}
					>
						About Us
					</NavLink>

					{currentUser && (
						<>
							<NavLink
								to="/menu"
								className={({ isActive }) =>
									`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
										isActive
											? "bg-[#cc6d2d] text-white"
											: "text-[#3e2723] hover:bg-[#cc6d2d] hover:text-white"
									}`
								}
							>
								Menu
							</NavLink>
							<NavLink
								to="/craft"
								className={({ isActive }) =>
									`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
										isActive
											? "bg-[#cc6d2d] text-white"
											: "text-[#3e2723] hover:bg-[#cc6d2d] hover:text-white"
									}`
								}
							>
								Craft
							</NavLink>
							<NavLink
								to="/cart"
								className={({ isActive }) =>
									`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
										isActive
											? "bg-[#cc6d2d] text-white"
											: "text-[#3e2723] hover:bg-[#cc6d2d] hover:text-white"
									}`
								}
							>
								Cart
							</NavLink>
							<NavLink
								to="/order-history"
								className={({ isActive }) =>
									`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
										isActive
											? "bg-[#cc6d2d] text-white"
											: "text-[#3e2723] hover:bg-[#cc6d2d] hover:text-white"
									}`
								}
							>
								Order History
							</NavLink>
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
