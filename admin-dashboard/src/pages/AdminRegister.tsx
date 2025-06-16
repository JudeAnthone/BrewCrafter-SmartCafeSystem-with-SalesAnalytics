import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_email: '',
    admin_password: '',
    confirmPassword: '',
    birthday: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Register, 2: OTP
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.admin_name || !formData.admin_email || !formData.admin_password || !formData.birthday) {
      setError('Please fill out all required fields');
      return;
    }
    if (formData.admin_password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.admin_password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:5000/api/auth/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess(true);
      setStep(2); // Move to OTP step
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return setError('OTP is required');
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.admin_email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid OTP. Please try again.');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
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
          <p className="text-[#5d4037] font-medium">Admin Dashboard</p>
        </div>
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
          <div className="flex items-center mb-6">
            <Link to="/login" className="text-[#5d4037] hover:text-[#3e2723] mr-4">
              <ArrowLeft size={20} />
            </Link>
            <h2 className="text-2xl font-bold text-[#3e2723] flex-1 text-center pr-8">
              Admin <span className="text-[#cc6d2d]">Registration</span>
            </h2>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              Registration successful! Please check your email for the OTP.
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Full Name*</label>
              <input
                type="text"
                name="admin_name"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Enter your full name"
                value={formData.admin_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Email*</label>
              <input
                type="email"
                name="admin_email"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Enter your email"
                value={formData.admin_email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Birthday*</label>
              <input
                type="date"
                name="birthday"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="admin_password"
                  className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                  placeholder="Enter password"
                  value={formData.admin_password}
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
            </div>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Confirm Password*</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
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
                'Register'
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
              required
              disabled={loading || success}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex justify-center"
            disabled={loading || success}
          >
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
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            Verification successful! Redirecting to login...
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

