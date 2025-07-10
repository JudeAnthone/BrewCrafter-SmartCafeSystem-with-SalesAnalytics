import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminVerify = () => {
  const location = useLocation();
  const [email, setEmail] = useState(
    (location.state && (location.state as any).email) || ''
  );
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');
      setSuccess('Verification successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to verify. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8e8d0] px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#3e2723]">
          Admin Email Verification
        </h2>
        
        {!success && (
          <div className="mb-4 text-[#5d4037] text-center">
            Please check your email for the OTP code to verify your account.
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#5d4037] font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl"
              placeholder="Enter your admin email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-[#5d4037] font-medium mb-2">OTP Code</label>
            <input
              type="text"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminVerify;