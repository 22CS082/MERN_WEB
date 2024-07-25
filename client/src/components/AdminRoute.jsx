import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const AdminRoute = ({ children }) => {
  const { user, isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !user?.isadmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
