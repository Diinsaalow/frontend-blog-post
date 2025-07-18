import React from "react";
import { useLocation, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated } = useSelector((state) => state.user);
  // Placeholder for authentication state from Context API
  const isAuthenticated = false;
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
