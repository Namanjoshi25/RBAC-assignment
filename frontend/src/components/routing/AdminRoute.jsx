
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  
  return user && isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;