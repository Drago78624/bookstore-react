import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

const AuthRequired = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (!isUserLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default AuthRequired;
