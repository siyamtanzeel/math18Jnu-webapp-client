import React from "react";

const Button = ({ children, bgColor }) => {
  return (
    <button
      className={`text-white px-4 py-1.5 rounded-full ${bgColor} hover:bg-opacity-80 hover:transition hover:duration-200 `}>
      {children}
    </button>
  );
};

export default Button;
