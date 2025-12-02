import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign_in" />;
  }

  // If specific role is required
  if (requiredRole) {
    if (requiredRole === 'Admin' && user?.role !== 'Admin') {
      // If user tries to access admin page
      toast.error("Access denied! Admin privileges required.");
      return <Navigate to="/" />;
    }
    
    if (requiredRole === 'User' && user?.role !== 'User') {
      // If admin tries to access user-only page (optional)
      return <Navigate to="/admin" />;
    }
  }

  return children;
};

export default ProtectedRoute;