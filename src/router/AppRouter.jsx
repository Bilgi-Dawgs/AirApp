<<<<<<< HEAD
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
=======
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/HomePage";
import FlightSearchPage from "../pages/FlightsPage";
import RosterWorkbench from "../pages/RosterWorkbench";
import RosterViewPage from "../pages/RosterViewPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}

      {/* Ana Sayfa */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
>>>>>>> ce358d0d1d943d642656346adb56051da0a50013
          </ProtectedRoute>
        }
      />

<<<<<<< HEAD
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
=======
      {/* Alternatif Dashboard Yolu */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
>>>>>>> ce358d0d1d943d642656346adb56051da0a50013
          </ProtectedRoute>
        }
      />

<<<<<<< HEAD
      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
=======
      {/* Arama Sayfası */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <FlightSearchPage />
          </ProtectedRoute>
        }
      />

      {/* Roster Üretim (Workbench) */}
      <Route
        path="/workbench"
        element={
          <ProtectedRoute>
            <RosterWorkbench />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workbench/:flightNumber"
        element={
          <ProtectedRoute>
            <RosterWorkbench />
          </ProtectedRoute>
        }
      />

      {/* Roster İzleme (View) */}
      <Route
        path="/view/:flightNumber"
        element={
          <ProtectedRoute>
            <RosterViewPage />
          </ProtectedRoute>
        }
      />

      {/* 404: Bilinmeyen bir yere giderse Ana Sayfaya (Oradan da Login'e) döner */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
>>>>>>> ce358d0d1d943d642656346adb56051da0a50013
