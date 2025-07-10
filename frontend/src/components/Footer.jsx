import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#3e2723] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        
        {/* Logo and tagline */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">BrewCrafter</h3>
          <p className="text-[#e4c9a7] text-sm">Craft your perfect coffee experience</p>
        </div>
        
        {/* Quick links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-[#e4c9a7] font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#e4c9a7] transition-colors">Home</Link></li>
            <li><Link to="/menu" className="hover:text-[#e4c9a7] transition-colors">Menu</Link></li>
            <li><Link to="/craft" className="hover:text-[#e4c9a7] transition-colors">Craft Drink</Link></li>
          </ul>
        </div>
        
        {/* Contact */}
        <div>
          <h4 className="text-[#e4c9a7] font-semibold mb-3">Contact</h4>
          <p className="text-sm mb-2">86-B Silenctio, Philippines</p>
          <p className="text-sm mb-2">duartejudeanthone@gmail.com</p>
          <p className="text-sm">+63 9476998990</p>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-6 mt-6 border-t border-[#5d4037] text-center text-sm text-[#e4c9a7]">
        © {new Date().getFullYear()} BrewCrafter. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;