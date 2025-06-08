import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AdminAuthContext';


/*
Test Credentials: 
admin@brewcrafter.com
admin123
*/

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok && (data.user?.role === 1 || data.user?.role === 'admin')) {
        login(data.token, data.user); // Pass token and user to context
      } else {
        setError(data.message || 'Access denied. Admins only.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to login. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8e8d0] px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <Coffee size={48} className="text-[#3e2723] mb-3" />
        <h1 className="text-3xl font-bold text-[#3e2723]">BrewCrafter</h1>
        <p className="text-[#5d4037] font-medium">Admin Dashboard</p>
      </div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#3e2723]">
          Admin <span className="text-[#cc6d2d]">Login</span>
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5d4037]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-[#cc6d2d] hover:text-[#3e2723] transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#5d4037]">
            Need an admin account?{" "}
            <Link
              to="/register"
              className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200"
            >
              Request Access
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-[#5d4037]">
          <p>For staff use only. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;