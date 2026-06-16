import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PatientRoute = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PatientRoute;
