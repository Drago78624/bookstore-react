import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

export const AuthContext = createContext({
  isUserLoggedIn: false,
  userUid: "",
  clearAuthState: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn")
  );
  const [userUid, setUserUid] = useState(
    localStorage.getItem("userUid")
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setIsUserLoggedIn(true);
          setUserUid(user.uid);
          localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
          localStorage.setItem("userUid", user.uid);
        }
      }
    });

    return unsubscribe;
  }, []);

  const clearAuthState = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("userUid");
    setIsUserLoggedIn(false);
    setUserUid(null);
  };

  return (
    <AuthContext.Provider value={{userUid, isUserLoggedIn, clearAuthState, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
