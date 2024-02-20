import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";

const formSchema = yup.object().shape({
  fullName: yup.string().required("Please enter you full name"),
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
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      await sendEmailVerification(auth.currentUser);
      await signOut(auth);
      setLoading(false);
      navigate("/email-verification");
    } catch (err) {
      setLoading(false);
      setShowError(true);
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
      setShowError(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [showError]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-md shadow-sm">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit(signUpHandler)}>
            <div className="form-control">
              <input
                placeholder="Full Name"
                type="text"
                className="input input-bordered"
                {...register("fullName")}
              />
              <p className="text-error mt-1">
                {errors.fullName && errors.fullName?.message}
              </p>
            </div>
            <div className="form-control">
              <input
                placeholder="Email"
                type="email"
                className="input input-bordered"
                {...register("email")}
              />
              <p className="text-error mt-1">
                {errors.email && errors.email?.message}
              </p>
            </div>
            <div className="form-control">
              <input
                placeholder="Password"
                type="password"
                className="input input-bordered"
                {...register("password")}
              />
              <p className="text-error mt-1">
                {errors.password && errors.password?.message}
              </p>
            </div>
            <div className="form-control">
              <input
                placeholder="Confirm Password"
                type="password"
                className="input input-bordered"
                {...register("confirmPassword")}
              />
              <p className="text-error mt-1">
                {errors.confirmPassword && errors.confirmPassword?.message}
              </p>
            </div>

            <button
              className="btn btn-accent w-full"
              type="submit"
              disabled={loading}
            >
              {buttonContent}
            </button>
          </form>
          <p className="text-center mt-4 mb-10">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
          {showError && (
            <div role="alert" className="alert alert-error">
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
              <span>Error! Email already in use. Try logging in instead.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
