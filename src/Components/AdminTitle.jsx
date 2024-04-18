import React from "react";

const AdminTitle = ({ children }) => {
  return (
    <h1 className=" text-success text-3xl md:text-5xl font-semibold">
      {children}
    </h1>
  );
};

export default AdminTitle;
