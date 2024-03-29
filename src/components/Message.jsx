import { sendEmailVerification } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";

const Message = ({ type, message }) => {
  const sendMail = async () => {
    await sendEmailVerification(auth.currentUser);
  };
  const button =
    message == "Email is not verified." ? (
      <Link to="/email-verification" className="btn" onClick={sendMail}>
        Send mail
      </Link>
    ) : undefined;

  return (
    <div role="alert" className={`alert alert-${type}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        {type === "error" ? "Error" : "Success"}! {message} {button}
      </span>
    </div>
  );
};

export default Message;
