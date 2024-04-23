import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AOS from "aos/dist/aos.js";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./Providers/AuthProvider.jsx";
import DarkModeProvider from "./Providers/DarkModeProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
AOS.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router}></RouterProvider>
        </HelmetProvider>
      </AuthProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);
