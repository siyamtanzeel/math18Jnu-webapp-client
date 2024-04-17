import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen px-3 font-raleway text-center flex flex-col items-center justify-center bg-base-100">
      <h1 className="text-7xl font-bold text-rose-600">Oops!</h1>
      <img
        src="/public/img/errorbg.gif"
        alt=""
        className="w-full max-w-[500px] mx-auto"
      />
      <p className="text-base-content text-2xl mx-auto">Something went Wrong</p>
      <Link className="btn btn-primary mt-5">Back to Home</Link>
    </div>
  );
};

export default ErrorPage;
