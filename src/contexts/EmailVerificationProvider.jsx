import React, { createContext, useState } from "react";

export const EmailVerificationContext = createContext({
  isEligibleForEmailVerification: false,
  clearEmailVerificationState: () => {},
});

const EmailVerificationContextProvider = ({ children }) => {
  const [isEligibleForEmailVerification, setIsEligibleForEmailVerification] =
    useState(localStorage.getItem("isEligibleForEmailVerification"));

  const setEmailVerificationState = () => {
    setIsEligibleForEmailVerification(true);
    localStorage.setItem(
      "isEligibleForEmailVerification",
      JSON.stringify(true)
    );
  };

  const clearEmailVerificationState = () => {
    localStorage.removeItem("isEligibleForEmailVerification");
    setIsEligibleForEmailVerification(false);
  };

  return (
    <EmailVerificationContext.Provider
      value={{ isEligibleForEmailVerification, clearEmailVerificationState, setEmailVerificationState }}
    >
      {children}
    </EmailVerificationContext.Provider>
  );
};

export default EmailVerificationContextProvider;
