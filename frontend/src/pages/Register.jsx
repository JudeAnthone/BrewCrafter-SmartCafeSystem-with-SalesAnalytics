import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Coffee, ArrowLeft } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: ''  
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Register, 2: OTP
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, verifyOtp, pendingEmail, setPendingEmail } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setError('Name is required');
    if (!formData.email.trim()) return setError('Email is required');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    try {
      setError('');
      setLoading(true);
      await register(formData);
      setStep(2); // Move to OTP step
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return setError('OTP is required');
    try {
      setError('');
      setLoading(true);
      await verifyOtp(otp);
      setStep(1);
      setPendingEmail(null);
      window.location.href = '/profile'; // or use navigate
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  // Registration form
  if (step === 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8e8d0] px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <Coffee size={48} className="text-[#3e2723] mb-3" />
          <h1 className="text-3xl font-bold text-[#3e2723]">BrewCrafter</h1>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">\
        
          <div className="flex items-center mb-6">
            <Link to="/login" className="text-[#5d4037] hover:text-[#3e2723] mr-4">
              <ArrowLeft size={20} />
            </Link>
            <h2 className="text-2xl font-bold text-[#3e2723] flex-1 text-center pr-8">
              User <span className="text-[#cc6d2d]">Registration</span>
            </h2>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Full Name*</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Enter your full name" required />
            </div>
            
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Email*</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Enter your email" required />
            </div>
            
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Birthday*</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                required
              />
            </div>
            
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5d4037]"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Confirm Password*</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5d4037]"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button type="submit" disabled={loading}
              className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex justify-center">
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
              <Link to="/login" className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200">
                Login
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    );
  }

  
  // OTP form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8e8d0] px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#3e2723]">
          Enter the OTP sent to your email
        </h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleOtpSubmit}>
          <div>
            <label className="block text-[#5d4037] font-medium mb-2">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full p-3 border border-[#e4c9a7] rounded-xl"
              placeholder="Enter the 6-digit code"
            />
          </div>
          
          <button type="submit" disabled={loading}
            className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex justify-center">
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify'
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Register;