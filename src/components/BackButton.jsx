import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link to="/" className="btn fixed top-5 left-5 md:left-16 lg:left-28">
      BACK
    </Link>
  );
};

export default BackButton;
