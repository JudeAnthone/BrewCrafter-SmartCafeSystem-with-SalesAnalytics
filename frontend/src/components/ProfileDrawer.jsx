import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProfileDrawer = ({ open, setOpen }) => {
	const { currentUser, logout } = useAuth();

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex justify-end">
			<div className="fixed inset-0 bg-black opacity-30" onClick={() => setOpen(false)}></div>
			
			<div className="relative bg-white w-72 h-full shadow-lg p-6 flex flex-col">
				<button className="absolute top-4 right-4 text-2xl" onClick={() => setOpen(false)}>
					&times;
				</button>
				
				<div className="mb-8 mt-8 text-center">
					<div className="w-16 h-16 mx-auto rounded-full bg-[#cc6d2d] flex items-center justify-center text-white text-2xl font-bold">
						{currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0)}
					</div>
					<div className="mt-2 font-semibold text-[#3e2723]">{currentUser?.name}</div>
					<div className="text-sm text-[#5d4037]">{currentUser?.email}</div>
				</div>
				
				<Link
					to="/profile"
					className="mb-4 px-4 py-2 rounded hover:bg-[#f8e8d0] text-[#3e2723]"
					onClick={() => setOpen(false)}
				>
					My Profile
				</Link>
				
				<Link
					to="/cart"
					className="mb-4 px-4 py-2 rounded hover:bg-[#f8e8d0] text-[#3e2723]"
					onClick={() => setOpen(false)}
				>
					My Orders
				</Link>
				
				<button
					onClick={() => {
						logout();
						setOpen(false);
					}}
					className="mt-auto px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default ProfileDrawer;
