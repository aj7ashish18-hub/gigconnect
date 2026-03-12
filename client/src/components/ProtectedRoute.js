import { Navigate } from "react-router-dom";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function getUserRole() {
  return localStorage.getItem("role"); // 'client' | 'gigconnect'
}

export default function ProtectedRoute({ children, requiredRole }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && getUserRole() !== requiredRole) {
    const role = getUserRole();
    // Redirect to correct dashboard based on actual role
    if (role === "client") {
      return <Navigate to="/client-dashboard" replace />;
    } else if (role === "gigconnect") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}