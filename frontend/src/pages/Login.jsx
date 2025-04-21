import React from "react";
import { Link } from "react-router-dom";

function Login() {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-[#f8e8d0] px-4 py-12">
			<div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e4c9a7]/20">
				<h2 className="text-3xl font-bold text-center mb-8 text-[#3e2723]">
					Welcome <span className="text-[#cc6d2d]">Back!</span>
				</h2>

				<form className="space-y-6">
					<div>
						<label className="block text-[#5d4037] font-medium mb-2">Email</label>
						<input
							type="email"
							className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
							placeholder="Enter your email"
						/>
					</div>

					<div>
						<label className="block text-[#5d4037] font-medium mb-2">Password</label>
						<div className="relative">
							<input
								type="password"
								className="w-full p-3 border border-[#e4c9a7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] transition-all duration-200 bg-[#f8f4f0]/50"
								placeholder="Enter your password"
							/>
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
						className="w-full bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
					>
						Login
					</button>
				</form>

				<div className="mt-8 text-center">
					<p className="text-[#5d4037]">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors duration-200"
						>
							Sign Up
						</Link>
					</p>
				</div>

				<div className="mt-6 relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-[#e4c9a7]"></div>
					</div>
					<div className="relative flex justify-center">
						<span className="bg-white px-4 text-sm text-[#5d4037]">
							or continue with
						</span>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-4">
					<button className="flex items-center justify-center py-3 px-4 border border-[#e4c9a7] rounded-xl hover:bg-[#f8f4f0] transition-colors duration-200">
						<svg
							className="w-5 h-5 mr-2"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Google
					</button>
					<button className="flex items-center justify-center py-3 px-4 border border-[#e4c9a7] rounded-xl hover:bg-[#f8f4f0] transition-colors duration-200">
						<svg
							className="w-5 h-5 mr-2"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
								fill="#1877F2"
							/>
						</svg>
						Facebook
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
