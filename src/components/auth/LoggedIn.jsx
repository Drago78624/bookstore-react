import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import EmailVerificationContextProvider, {
  EmailVerificationContext,
} from "../../contexts/EmailVerificationProvider";

const LoggedIn = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    // <EmailVerificationContextProvider>
      <Outlet />
    // </EmailVerificationContextProvider>
  );
};

export default LoggedIn;
