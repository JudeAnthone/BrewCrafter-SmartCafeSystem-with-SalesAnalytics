import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Coffee } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: login, 2: birthday, 3: otp
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, stepUpBirthday, stepUpOTP } = useAuth();

    // Step 1: Normal login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login({ email, password });
            // success: handled in context
        } catch (err) {
            if (err.response?.data?.stepUp) {
                setStep(2); // Go to birthday step
            } else {
                setError(err.response?.data?.message || 'Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Birthday step-up
    const handleBirthday = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await stepUpBirthday(email, birthday);
            setStep(3); // Go to OTP step
        } catch (err) {
            setError(err.response?.data?.message || 'Incorrect birthday.');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: OTP step-up
    const handleOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await stepUpOTP(email, otp);
            window.location.href = '/profile'; // or use navigate('/profile')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8e8d0] px-4 py-12">
            <div className="flex flex-col items-center mb-8">
                <Coffee size={48} className="text-[#3e2723] mb-3" />
                <h1 className="text-3xl font-bold text-[#3e2723]">BrewCrafter</h1>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#3e2723]">
                    Welcome <span className="text-[#cc6d2d]">Back!</span>
                </h2>
                {error && (
                    <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
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
                                placeholder="Enter your email"
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
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
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
                        <button type="submit" className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl" disabled={loading}>
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
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#cc6d2d] text-white py-3.5 rounded-xl" disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                )}

                {step === 1 && (
                    <div className="mt-8 text-center">
                        <p className="text-[#5d4037]">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-[#cc6d2d] font-semibold hover:text-[#3e2723]">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
