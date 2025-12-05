// src/router/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, role = null }) {
  const { isAuthenticated, user } = useAuth();

  // Giriş yapılmamış → Login sayfasına
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // Eğer rol gerekiyorsa ve user.role eşleşmiyorsa → Anasayfa
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
