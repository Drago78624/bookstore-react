import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { AuthContext } from "../../contexts/AuthContextProvider";

const SignOutBtn = () => {
  const { clearAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await signOut(auth);
    console.log("logged out");
    clearAuthState();
    navigate("/signin");
  };

  return (
    <button className="btn btn-accent" onClick={signOutHandler}>
      SIGN OUT
    </button>
  );
};

export default SignOutBtn;
