import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // 1. Durum: Kontrol devam ediyor (Sayfa yenilendiğinde buraya girer)
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f6f8",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 2. Durum: Kontrol bitti ve giriş yok -> Login'e at
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Durum: Giriş var -> Sayfayı göster
  return children;
};

export default ProtectedRoute;
