import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = () => {
  const isUserLoggedIn = true;

  if (!isUserLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default AuthRequired;
