import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (token) {
    const roleObj = user?.role;
    const roleName = (typeof roleObj === 'object' && roleObj !== null) ? roleObj.name : roleObj;
    const ADMIN_ID = '698f5a89fe5addce4f8e3b52';
    
    const safeRoleName = String(roleName || '').toUpperCase().trim();
    if (safeRoleName === 'ADMIN' || safeRoleName === ADMIN_ID.toUpperCase()) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
