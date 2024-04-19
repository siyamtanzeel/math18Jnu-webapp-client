import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      data-theme="light"
      className="w-full h-screen px-3 font-raleway text-center flex flex-col md:flex-row items-center justify-center bg-base-100">
      <img
        src="/public/img/errorbg.gif"
        alt=""
        className="w-full max-w-[500px]"
      />
      <div>
        <h1 className="text-7xl font-bold text-rose-600">Oops!</h1>
        <p className="text-base-content text-2xl mx-auto">
          Something went Wrong
        </p>
        <Link className="btn btn-primary mt-5 text-white">Back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
