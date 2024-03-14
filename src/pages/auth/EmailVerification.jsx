import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { EmailVerificationContext } from "../../contexts/EmailVerificationProvider";

const EmailVerification = ({ userEmail }) => {
  // const { isEligibleForEmailVerification, clearEmailVerificationState } =
  //   useContext(EmailVerificationContext);

  // if (!isEligibleForEmailVerification) {
  //   return <Navigate to="/signup" />;
  // }

  return (
    <div className="min-h-screen flex flex-col justify-center  items-center">
      <h1 className="block text-4xl font-semibold mb-4 text-center">
        Welcome to BookStore!
      </h1>
      <p className="max-w-[600px] text-center text-xl mb-4">
        An email verification link has been sent to this email :
        maaz.ahmed786247@gmail.com. Please verify you email and once verified,
        you can get back here to sign in.
      </p>
      <Link
        to="/signin"
        className="btn btn-accent"
        // onClick={clearEmailVerificationState}
      >
        SIGN IN
      </Link>
    </div>
  );
};

export default EmailVerification;
