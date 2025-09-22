import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, BrowserRouter, Routes } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import ToastContext from "./Context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ToastContext>
        <App />
      </ToastContext>
    </AuthProvider>
  </BrowserRouter>
);
