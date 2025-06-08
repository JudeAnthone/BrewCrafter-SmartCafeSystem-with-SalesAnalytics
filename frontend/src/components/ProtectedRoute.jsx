import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  
   
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8e8d0]">
        <div className="animate-pulse text-[#3e2723] text-xl font-bold">Loading...</div>
      </div>
    );
  }
  
  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;