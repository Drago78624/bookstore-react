import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";

const SignOutBtn = () => {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <button className="btn btn-accent" onClick={signOutHandler}>
      SIGN OUT
    </button>
  );
};

export default SignOutBtn;
