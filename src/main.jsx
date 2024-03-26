import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import DarkModeProvider from "./Providers/DarkModeProvider.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DarkModeProvider>
        <RouterProvider router={router}></RouterProvider>
      </DarkModeProvider>
    </AuthProvider>
  </React.StrictMode>
);
