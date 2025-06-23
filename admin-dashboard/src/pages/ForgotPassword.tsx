import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1500);
      
    } catch (err) {
      setError('Failed to process your request. Please try again later.');
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
            Forgot <span className="text-[#cc6d2d]">Password</span>
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {submitted ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle size={60} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-[#3e2723] mb-2">Reset Link Sent!</h3>
            <p className="text-[#5d4037] mb-6">
              We've sent password reset instructions to your email address. Please check your inbox.
            </p>
            <Link
              to="/login"
              className="inline-block bg-[#3e2723] text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[#5d4037] mb-6">
              Enter the email address associated with your account, and we'll email you a link to reset your password.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#5d4037] font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
                    Processing...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-[#5d4037]">
              <p>Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;