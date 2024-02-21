import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ErrorMessage from "../components/ErrorMessage";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be atleast 8 characters"),
});

const SignIn = () => {
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

  const signInHandler = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user.emailVerified) {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        setCustomError((prevErr) => {
          return {
            ...prevErr,
            show: true,
            message: "Email is not verified.",
          };
        });
      }
    } catch (err) {
      setLoading(false);
      setCustomError((prevErr) => {
        return {
          ...prevErr,
          show: true,
          message: "Bad Email or Password.",
        };
      });
    }
  };

  let buttonContent = "SIGN IN";
  if (loading) {
    buttonContent = (
      <>
        <span className="loading loading-dots loading-lg"></span>
        SIGNING IN
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
          <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
          <BackButton />
          <form className="space-y-4" onSubmit={handleSubmit(signInHandler)}>
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
            <button
              className="btn btn-accent w-full"
              type="submit"
              disabled={loading}
            >
              {buttonContent}
            </button>
          </form>
          <p className="text-center mt-4 mb-10">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          {customError.show && <ErrorMessage message={customError.message} />}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
