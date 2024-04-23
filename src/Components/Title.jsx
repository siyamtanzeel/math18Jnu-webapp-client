import React from "react";

const Title = ({ children }) => {
  return (
    <h1 className=" text-primary text-3xl md:text-5xl font-semibold text-center">
      {children}
    </h1>
  );
};

export default Title;
