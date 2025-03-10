import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Authentication } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(Authentication);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
