import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
export default function GuestRoute({ children }) {
  const { session } = useAuth();
  if (session) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
