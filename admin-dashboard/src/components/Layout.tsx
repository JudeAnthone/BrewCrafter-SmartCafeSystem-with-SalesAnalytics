import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Coffee, Home, Menu, Package, Users, ShoppingCart, Settings,
  LogOut, ChevronDown, ChevronRight, Bell, User as UserIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AdminAuthContext';

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-[#f8f4e5] overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-[#e4c9a7] shadow-sm transition-all ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div 
          className={`flex items-center p-4 border-b border-[#e4c9a7] ${
            isSidebarCollapsed ? 'justify-center' : ''
          }`}
        >
          <Coffee size={28} className="text-[#3e2723]" />
          {!isSidebarCollapsed && (
            <span className="ml-2 text-xl font-bold text-[#3e2723]">BrewCrafter</span>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                  }
                `}
              >
                <Home size={20} />
                {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/menu" 
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                  }
                `}
              >
                <Menu size={20} />
                {!isSidebarCollapsed && <span className="ml-3">Menu Manager</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/inventory" 
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                  }
                `}
              >
                <Package size={20} />
                {!isSidebarCollapsed && <span className="ml-3">Inventory</span>}
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/orders" 
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                  }
                `}
              >
                <ShoppingCart size={20} />
                {!isSidebarCollapsed && <span className="ml-3">Orders</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                  }
                `}
              >
                <Settings size={20} />
                {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Sidebar Toggle */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-full bg-[#f8e8d0] text-[#3e2723] hover:bg-[#e4c9a7]"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#e4c9a7] p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#3e2723]">Admin Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-1 rounded-full hover:bg-[#f8e8d0] text-[#5d4037]">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#f8e8d0]"
              >
                <div className="w-8 h-8 bg-[#3e2723] rounded-full flex items-center justify-center text-white">
                  <UserIcon size={16} />
                </div>
                <span className="text-[#3e2723] font-medium">Admin</span>
              </button>
              
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-[#e4c9a7] z-10">
                  <div className="p-3 border-b border-[#e4c9a7]">
                    <p className="font-medium text-[#3e2723]">Admin User</p>
                    <p className="text-xs text-[#5d4037]">admin@brewcrafter.com</p>
                  </div>
                  <NavLink 
                    to="/settings" 
                    className="block px-4 py-2 hover:bg-[#f8e8d0] text-[#5d4037]"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Account Settings
                  </NavLink>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#f8e8d0] text-red-600 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-20" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-[#e4c9a7] p-4 text-center text-sm text-[#5d4037]">
          <p>&copy; 2025 BrewCrafter - Admin Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;