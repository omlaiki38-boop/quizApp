// src/context/ToastProvider.jsx (or src/providers/ToastProvider.jsx)
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastContext = ({ children }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default ToastContext;
