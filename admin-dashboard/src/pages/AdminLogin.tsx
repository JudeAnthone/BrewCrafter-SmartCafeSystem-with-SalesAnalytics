import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AdminAuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: login, 2: birthday, 3: otp
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login, stepUpBirthday, stepUpOTP } = useAuth() as any;

  // Step 1: Normal login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && (data.user?.role === 1 || data.user?.role === 'admin')) {
        login(data.token, data.user);
      } else if (data.stepUp) {
        setStep(2); // Go to birthday step
      } else {
        setError(data.message || 'Access denied. Admins only.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Birthday step-up
  const handleBirthday = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await stepUpBirthday(email, birthday);
      setStep(3); // Go to OTP step
    } catch (err: any) {
      setError(err.message || 'Incorrect birthday.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: OTP step-up
  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await stepUpOTP(email, otp);
      setSuccess(true);
      setTimeout(() => window.location.href = '/dashboard', 1500); // or use navigate
    } catch (err: any) {
      setError(err.message || 'Invalid OTP.');
    } finally {
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

        {step === 1 && (
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
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
                  className="w-full p-3 border border-[#e4c9a7] rounded-xl"
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
            </div>
            <button
              type="submit"
              className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-6" onSubmit={handleBirthday}>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">
                Birthday <span className="text-xs text-[#cc6d2d]">(use the date picker)</span>
              </label>
              <input
                type="date"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Enter your birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Birthday"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-6" onSubmit={handleOtp}>
            <div>
              <label className="block text-[#5d4037] font-medium mb-2">OTP Code</label>
              <input
                type="text"
                className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={loading || success}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl"
              disabled={loading || success}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            Step-up verification successful! Redirecting...
          </div>
        )}

        {step === 1 && (
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
        )}

        <div className="mt-6 text-center text-xs text-[#5d4037]">
          <p>For staff use only. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;