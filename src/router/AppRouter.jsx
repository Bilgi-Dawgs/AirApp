// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage.jsx";
import RegisterPage from "../pages/Auth/RegisterPage.jsx";
import ManagerLoginPage from "../pages/Auth/ManagerLoginPage.jsx";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage.jsx";

import ProfilePage from "../pages/Profile/ProfilePage.jsx";
import ManagerDashboard from "../pages/Manager/ManagerDashboard.jsx";
import PilotsPage from "../pages/Manager/PilotsPage.jsx";
import FlightsPage from "../pages/Manager/FlightsPage.jsx";
import ManagerSettingsPage from "../pages/Manager/ManagerSettingsPage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* USER AUTH */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage context="user" />}
      />

      {/* USER PROFILE (protected) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* MANAGER AUTH */}
      <Route path="/manager/login" element={<ManagerLoginPage />} />
      <Route
        path="/manager/forgot-password"
        element={<ForgotPasswordPage context="manager" />}
      />

      {/* MANAGER PAGES */}
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/pilots"
        element={
          <ProtectedRoute>
            <PilotsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/flights"
        element={
          <ProtectedRoute>
            <FlightsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/settings"
        element={
          <ProtectedRoute>
            <ManagerSettingsPage />
          </ProtectedRoute>
        }
      />

      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
