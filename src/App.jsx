import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import RootCompo from "./pages/RootCompo";
import ProtectedRoute from "./pages/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Quiz from "./pages/client/Quiz";
import LeaderBoard from "./pages/LeaderBoard";
import Unauthorised from "./components/Unauthorised";
import NotFound from "./pages/NotFound";
import GuestRoute from "./pages/GuestRoute";

function App() {
  return (
    <Routes>
      {/* Root route decides where to redirect based on session & role */}
      <Route path="/" element={<RootCompo allowedRoles={["client"]} />} />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route path="/unauthorised" element={<Unauthorised />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:id"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Quiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute allowedRoles={["client", "admin"]}>
            <LeaderBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
