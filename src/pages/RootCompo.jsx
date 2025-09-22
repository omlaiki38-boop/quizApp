import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loading from "../components/Loading";
const ProtectedRoute = ({ children }) => {
  const { accountType, session } = useAuth();

  console.log("accont type", accountType, "session", session);
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  if (accountType === "client") {
    return <Navigate to="/dashboard" replace />;
  }
  if (accountType === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
};

export default ProtectedRoute;
