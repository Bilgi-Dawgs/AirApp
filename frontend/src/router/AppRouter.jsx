// frontend/src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Core pages
import HomePage from "../pages/HomePage.jsx";
import FlightsPage from "../pages/FlightsPage.jsx";
import PlaneStatusPage from "../pages/PlaneStatusPage.jsx";

// Navbar / footer related pages
import HelpPage from "../pages/Navbar-Footer/HelpPage.jsx";
import AboutPage from "../pages/Navbar-Footer/AboutPage.jsx";
import PrivacyPage from "../pages/Navbar-Footer/PrivacyPage.jsx";
import MyBookingsPage from "../pages/Navbar-Footer/MyBookingsPage.jsx";

// Auth pages
import LoginPage from "../pages/Auth/LoginPage.jsx";
import RegisterPage from "../pages/Auth/RegisterPage.jsx";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage.jsx";

// Old ticket purchase page (real flow)
import TicketPurchasePage from "../pages/Ticket/TicketPurchasePage.jsx";

// Profile
import ProfilePage from "../pages/ProfilePage.jsx";

// ✅ Yeni eklediğimiz mock panel ve ticket sayfaları
import FlightDetailsPage from "../pages/Flights/FlightDetailsPage.jsx";
import TicketPurchaseMockPage from "../pages/Tickets/TicketPurchasePage.jsx";
import TicketLookupPage from "../pages/Tickets/TicketLookupPage.jsx";
import TicketCancelPage from "../pages/Tickets/TicketCancelPage.jsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/status" element={<PlaneStatusPage />} />

      {/* Support / info */}
      <Route path="/support" element={<HelpPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Real ticket flow (existing project) */}
      <Route path="/purchase-ticket" element={<TicketPurchasePage />} />

      {/* 🔵 New mock panel: Flight roster / crew / seat views */}
      <Route path="/flight-roster" element={<FlightDetailsPage />} />

      {/* 🔵 Mock ticket pages (our assignment) */}
      <Route path="/tickets/purchase" element={<TicketPurchaseMockPage />} />
      <Route path="/tickets/lookup" element={<TicketLookupPage />} />
      <Route path="/tickets/cancel" element={<TicketCancelPage />} />

      {/* Profile */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* Fallback: unknown path -> home */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
