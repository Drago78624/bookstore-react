import React from "react";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "../contexts/AuthContextProvider";

const Root = () => {
  return (
    <AuthContextProvider>
      <Outlet />;
    </AuthContextProvider>
  );
};

export default Root;
