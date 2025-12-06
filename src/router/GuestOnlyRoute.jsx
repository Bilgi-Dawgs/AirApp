// src/router/GuestOnlyRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function GuestOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (isAuthenticated) {
    // zaten giriş yaptıysa login sayfasına gitmesin
    return <Navigate to="/profile" replace />;
  }

  return children;
}
