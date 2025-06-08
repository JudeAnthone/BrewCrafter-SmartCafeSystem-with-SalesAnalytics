
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      return setError('Please enter your email');
    }
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
      
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-[#f8e8d0] px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#3e2723]">
          Reset <span className="text-[#cc6d2d]">Password</span>
        </h2>
        
        <p className="text-center text-[#5d4037] mb-8">
          Enter your email and we'll send you instructions to reset your password.
        </p>
        
        {message && (
          <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div>    {/* Enter Email */}
            <label className="block text-[#5d4037] font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
        
        {/* Back to login button */}
        <div className="mt-8 text-center">
          <Link 
            to="/login"
            className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200"
          >
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;