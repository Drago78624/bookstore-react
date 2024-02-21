import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

export const AuthContext = createContext({
  isUserLoggedIn: false,
  clearAuthState: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn")
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setIsUserLoggedIn(true);
          localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
        }
      }
    });

    return unsubscribe;
  }, []);

  const clearAuthState = () => {
    localStorage.removeItem("isUserLoggedIn");
    setIsUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, clearAuthState, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
