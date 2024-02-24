import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { EmailVerificationContext } from "../contexts/EmailVerificationProvider";
import ErrorMessage from "../components/Message";
import SignInWithGoogle from "../components/auth/SignInWithGoogle";
import UserInput from "../components/UserInput";
import { FaCheck, FaEnvelope, FaKey, FaUser } from "react-icons/fa6";

const formSchema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name"),
  email: yup.string().email().required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be atleast 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

const SignUp = () => {
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
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const signUpHandler = async (data) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.fullName,
      });
      console.log(auth.currentUser);
      await sendEmailVerification(auth.currentUser);
      await signOut(auth);
      setLoading(false);
      setCustomMsg((prevMsg) => {
        return {
          ...prevMsg,
          show: true,
          type: "success",
          message: `Email has been sent to ${data.email}, After verification, you can come back here to Sign In`,
        };
      });
      reset();
    } catch (err) {
      setLoading(false);
      setCustomMsg((prevMsg) => {
        return {
          ...prevMsg,
          show: true,
          type: "error",
          message: "Email already in use, Try Logging in instead.",
        };
      });
    }
  };

  const signInWithGoogleHandler = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  let buttonContent = "SIGN UP";
  if (loading) {
    buttonContent = (
      <>
        <span className="loading loading-dots loading-lg"></span>
        SIGNING UP
      </>
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCustomMsg((prevMsg) => {
        return {
          ...prevMsg,
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
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
          <BackButton />
          <form className="space-y-4" onSubmit={handleSubmit(signUpHandler)}>
            <UserInput
              placeholder="Full Name"
              type="text"
              register={register}
              registerWith="fullName"
              error={errors.fullName}
              icon={<FaUser />}
            />
            <UserInput
              placeholder="Email"
              type="email"
              register={register}
              registerWith="email"
              error={errors.email}
              icon={<FaEnvelope />}
            />
            <UserInput
              placeholder="Password"
              type="password"
              register={register}
              registerWith="password"
              error={errors.password}
              icon={<FaKey />}
            />
            <UserInput
              placeholder="Confirm Password"
              type="password"
              register={register}
              registerWith="confirmPassword"
              error={errors.confirmPassword}
              icon={<FaKey />}
            />
            <button
              className="btn btn-accent w-full shadow-lg"
              type="submit"
              disabled={loading}
            >
              <FaCheck />
              {buttonContent}
            </button>
          </form>
          <SignInWithGoogle />
          <p className="text-center mt-4 mb-2">
            Already have an account?{" "}
            <Link to="/signin" className="underline underline-offset-2">
              Sign In
            </Link>
          </p>
          {customMsg.show && (
            <ErrorMessage message={customMsg.message} type={customMsg.type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
