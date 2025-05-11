import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

/**
 * ProtectedRoute component
 * @param {Array} allowedRoles - Roles allowed to access the route
 * @param {ReactNode} children - Component to render if access is granted
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role not authorized → redirect to unauthorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized → render children
  return children;
};

export default ProtectedRoute;
