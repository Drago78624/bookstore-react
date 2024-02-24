import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/icons/google-icon.svg"

const SignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signInWithGoogleHandler = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  let buttonContent = "SIGN IN WITH GOOGLE";
  if (loading) {
    buttonContent = (
      <>
        <span className="loading loading-dots loading-lg"></span>
        SIGNING IN WITH GOOGLE
      </>
    );
  }
  return (
    <button
      className="btn btn-outline w-full mt-2 shadow-lg"
      onClick={signInWithGoogleHandler}
      disabled={loading}
    >
      <img src={GoogleIcon} width={16} alt="google icon" />
      {buttonContent}
    </button>
  );
};

export default SignInWithGoogle;
