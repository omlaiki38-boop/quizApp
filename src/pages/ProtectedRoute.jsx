import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loading from "../components/Loading";
import { AlignJustify } from "lucide-react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { session, accountType } = useAuth();

  if (!session) return <Navigate to="/login" replace />;

  if (!accountType) return <Navigate to="/unauthorised" replace />;

  if (allowedRoles.includes(accountType)) return <>{children}</>;

  return <Navigate to="/unauthorised" replace />;
};

export default ProtectedRoute;
