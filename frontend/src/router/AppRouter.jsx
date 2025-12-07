// frontend/src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Main pages
import HomePage from "../pages/HomePage.jsx";
import FlightsPage from "../pages/FlightsPage.jsx";
import PlaneStatusPage from "../pages/PlaneStatusPage.jsx";

// Navbar/Footer pages
import HelpPage from "../pages/Navbar-Footer/HelpPage.jsx";
import AboutPage from "../pages/Navbar-Footer/AboutPage.jsx";
import PrivacyPage from "../pages/Navbar-Footer/PrivacyPage.jsx";
import MyBookingsPage from "../pages/Navbar-Footer/MyBookingsPage.jsx";

// Auth pages
import LoginPage from "../pages/Auth/LoginPage.jsx";
import RegisterPage from "../pages/Auth/RegisterPage.jsx";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage.jsx";

// Ticket system (mock panel)
import FlightDetailsPage from "../pages/Flights/FlightDetailsPage.jsx";
import TicketLookupPage from "../pages/Tickets/TicketLookupPage.jsx";
import TicketCancelPage from "../pages/Tickets/TicketCancelPage.jsx";
import TicketPurchasePage from "../pages/Tickets/TicketPurchasePage.jsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/status" element={<PlaneStatusPage />} />

      {/* Ticket panel */}
      <Route path="/flight-roster" element={<FlightDetailsPage />} />

      {/* Ticket system pages */}
      <Route path="/tickets/purchase" element={<TicketPurchasePage />} />
      <Route path="/tickets/lookup" element={<TicketLookupPage />} />
      <Route path="/tickets/cancel" element={<TicketCancelPage />} />

      {/* Support/info */}
      <Route path="/support" element={<HelpPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AppRouter;
