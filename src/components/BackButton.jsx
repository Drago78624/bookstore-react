import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <button
      className="btn fixed top-5 left-5 md:left-16 lg:left-28"
      onClick={goBack}
    >
      BACK
    </button>
  );
};

export default BackButton;
