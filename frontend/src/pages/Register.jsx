import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      return setError('Name is required');
    }
    if (!formData.email.trim()) {
      return setError('Email is required');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Register the user
      await register({
        name: formData.name,
        email: formData.email,
        // In a real app, you'd hash the password on the server
      });
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-[#f8e8d0] px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#3e2723]">
          Create an <span className="text-[#cc6d2d]">Account</span>
        </h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
                placeholder="Create a password"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#5d4037]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;