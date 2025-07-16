import React from "react";
import { useLocation, Navigate, Outlet } from "react-router";
// import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  // const { isAuthenticated } = useSelector((state) => state.user);
  // Placeholder for authentication state from Context API
  const isAuthenticated = false;
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
