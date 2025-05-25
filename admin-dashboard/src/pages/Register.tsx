import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    code: '' // Authorization code for admin registration
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.position) {
      setError('Please fill out all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Check authorization code (in a real app, verify this on the server)
    if (formData.code !== 'BREW2025') {
      setError('Invalid authorization code');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // In a real application, you would call your API here
      // const response = await fetch('/api/admin/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // For demo purposes, we'll just simulate a successful registration
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }, 1500);
      
    } catch (err) {
      setError('Failed to register. Please try again later.');
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
        <div className="flex items-center mb-6">
          <Link to="/login" className="text-[#5d4037] hover:text-[#3e2723] mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-[#3e2723] flex-1 text-center pr-8">
            Request <span className="text-[#cc6d2d]">Admin Access</span>
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Full Name*</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Email*</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Position*</label>
            <select
              name="position"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select your position</option>
              <option value="manager">Store Manager</option>
              <option value="barista">Head Barista</option>
              <option value="inventory">Inventory Manager</option>
              <option value="marketing">Marketing Manager</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5d4037]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-[#5d4037] mt-1">
              Must be at least 8 characters with uppercase, lowercase, number and special character
            </p>
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Confirm Password*</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Authorization Code*</label>
            <input
              type="text"
              name="code"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter authorization code"
              value={formData.code}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-[#5d4037] mt-1">
              Required for admin registration. Get this code from the system administrator.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#5d4037]">
          <p>Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200"
            >
              Login here
            </Link>
          </p>
        </div>
        
        <div className="mt-4 text-center text-xs text-[#5d4037]">
          <p>For staff use only. All access requests are reviewed by management.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

