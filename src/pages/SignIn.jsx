import React from "react";
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
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be atleast 8 characters"),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const signInHandler = async (data) => {
    console.log(data);
    // try {
    //   await createUserWithEmailAndPassword(auth, data.email, data.password);
    //   await updateProfile(auth.currentUser, {
    //     displayName: data.fullName,
    //   });
    //   await sendEmailVerification(auth.currentUser);
    //   console.log(auth.currentUser);
    //   await signOut(auth);
    //   console.log("sent");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-md shadow-sm">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
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
            <button className="btn btn-accent w-full" type="submit">
              Sign In
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
