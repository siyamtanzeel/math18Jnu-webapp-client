import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { student, authLoading } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  } else {
    if (student?.isAdmin) {
      return children;
    } else {
      navigate("/");
    }
  }
};

export default AdminRoutes;
