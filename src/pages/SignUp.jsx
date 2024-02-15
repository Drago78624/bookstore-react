import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const signUpHandler = async (data) => {
    console.log(data)
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     data.email,
    //     data.password
    //   );
    //   await userCredential.user.sendEmailVerification();
    //   await signOut();
    //   console.log("sent")
    // } catch (err) {
    //   console.log(err)
    // }
  };

  return (
    // <div className="container mx-auto min-h-screen">
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

            <button className="btn btn-accent w-full" type="submit">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SignUp;
