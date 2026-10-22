import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EE] text-[#172018]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-[#163A24] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif text-sm tracking-wider text-[#526651]">AUTHENTICATING ACCESS...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Email verification required for administrator
  if (!user.emailVerified) {
    return <Navigate to="/admin/login" state={{ from: location, error: 'Email verification required before accessing admin panel.' }} replace />;
  }

  // Role validation
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
