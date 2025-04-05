import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between h-20 px-6 shadow-md bg-white rounded-lg">
			
            {/* Logo */}
			<div className="flex items-center">
				<img src="/LOGO_brewcrafter.png" alt="BrewCrafter Logo" className="h-18 w-auto" />
			</div>

			{/* Navbar Links */}
			<nav className="flex space-x-4">
                
				<Link to="/" className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium">Home</Link>
                
				<Link to="/menu" className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium">Menu</Link>
                
				<Link to="/craft" className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium" >Craft</Link>
                
				<Link to="/about" className="px-3 py-2 text-[#3e2723] hover:bg-[#f8e8d0] rounded-lg transition-all duration-200 font-medium" >About Us</Link>
                
				<Link to="/login"className="px-4 py-2 bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white rounded-lg transition-all duration-200 font-medium" >Login</Link>
                
				<Link to="/cart" className="px-4 py-2 bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white rounded-lg transition-all duration-200 font-medium flex items-center">
                    <span>Cart</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                </Link>
                
			</nav>
		</header>
	);
};

export default Header;
