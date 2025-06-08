import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AdminAuthContext';
import { Coffee } from 'lucide-react';

const AdminProtectedRoute: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8e8d0]">
        <Coffee size={48} className="text-[#3e2723] animate-pulse mb-4" />
        <p className="text-[#3e2723] font-medium">Loading...</p>
      </div>
    );
  }

  // Only allow if authenticated and role is admin
  if (!isAuthenticated || !user || (user.role !== 1 && user.role !== 'admin')) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;