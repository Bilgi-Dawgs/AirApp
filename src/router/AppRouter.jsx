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
          </ProtectedRoute>
        }
      />

      {/* Alternatif Dashboard Yolu */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

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
