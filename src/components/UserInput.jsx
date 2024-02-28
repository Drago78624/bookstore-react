import React from "react";

const UserInput = ({ register, registerWith, error, icon, ...defaults }) => {
  return (
    <div className="form-control">
      <label className="input input-bordered flex items-center gap-2 shadow-lg">
        {icon}
        <input {...defaults} className="grow" {...register(registerWith)} />
      </label>
      <p className="text-error mt-1">{error && error?.message}</p>
    </div>
  );
};

export default UserInput;
