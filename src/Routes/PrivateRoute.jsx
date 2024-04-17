import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { loading, authLoading } = useContext(AuthContext);
  if (loading || authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  } else {
    return children;
  }
};

export default PrivateRoute;
