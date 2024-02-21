import React, { useContext, useEffect, useState } from "react";
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
import BackButton from "../components/BackButton";
import { EmailVerificationContext } from "../contexts/EmailVerificationProvider";
import ErrorMessage from "../components/ErrorMessage";

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
  // const { setEmailVerificationState } = useContext(EmailVerificationContext);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState({
    show: false,
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

  const signUpHandler = async (data) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.fullName,
      });
      await sendEmailVerification(auth.currentUser);
      // setEmailVerificationState();
      await signOut(auth);
      setLoading(false);
      navigate("/email-verification");
    } catch (err) {
      setLoading(false);
      setCustomError((prevErr) => {
        return {
          ...prevErr,
          show: true,
          message: "Email already in use, Try Logging in instead.",
        };
      });
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
      setCustomError((prevErr) => {
        return {
          ...prevErr,
          show: false,
          message: "",
        };
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [customError]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-md shadow-sm">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
          <BackButton />
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
          {customError.show && <ErrorMessage message={customError.message} />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
