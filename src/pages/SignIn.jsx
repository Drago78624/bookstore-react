import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContextProvider";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be atleast 8 characters"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setIsUserLoggedIn } = useContext(AuthContext);
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
        setIsUserLoggedIn(true);
        localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
        navigate("/");
      } else {
        setLoading(false);
        setCustomMsg((prevMsg) => {
          return {
            ...prevMsg,
            show: true,
            type: "error",
            message: "Email is not verified.",
          };
        });
      }
    } catch (err) {
      setLoading(false);
      setCustomMsg((prevMsg) => {
        return {
          ...prevMsg,
          show: true,
          type: "error",
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
          <p className="text-center mt-4">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p className="text-center mt-2 mb-2">
            <Link to="/forgot-password">Forgot Password ?</Link>
          </p>
          {customMsg.show && (
            <Message message={customMsg.message} type={customMsg.type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
