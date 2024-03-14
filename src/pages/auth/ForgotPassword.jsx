import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Message from "../../components/Message";
import { AuthContext } from "../../contexts/AuthContextProvider";
import UserInput from "../../components/UserInput";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa6";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Please enter an email"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [customMsg, setCustomMsg] = useState({
    show: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const forgotPasswordHandler = async (data) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setLoading(false);
      setCustomMsg((prevMsg) => {
        return {
          ...prevMsg,
          show: true,
          type: "success",
          message: "Mail has been sent.",
        };
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setCustomMsg((prevMsg) => {
        return {
          ...prevMsg,
          show: true,
          type: "error",
          message: "Something went wrong.",
        };
      });
    }
  };

  let buttonContent = "SEND MAIL";
  if (loading) {
    buttonContent = (
      <>
        <span className="loading loading-dots loading-lg"></span>
        SENDING MAIL
      </>
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCustomMsg((prevErr) => {
        return {
          ...prevErr,
          show: false,
          type: "",
          message: "",
        };
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [customMsg]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-md shadow-sm">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8">
            Forgot Password
          </h2>
          <BackButton />
          <form
            className="space-y-4"
            onSubmit={handleSubmit(forgotPasswordHandler)}
          >
            <UserInput
              placeholder="Email"
              type="email"
              register={register}
              registerWith="email"
              error={errors.email}
              icon={<FaEnvelope />}
            />
            <button
              className="btn btn-accent w-full"
              type="submit"
              disabled={loading}
            >
              <FaPaperPlane />
              {buttonContent}
            </button>
          </form>
          {customMsg.show && (
            <Message message={customMsg.message} type={customMsg.type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
