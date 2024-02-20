import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

const LoggedIn = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default LoggedIn;
