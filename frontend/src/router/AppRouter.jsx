import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FlightDetailsPage from "../pages/Flights/FlightDetailsPage";

// Ticket pages
import TicketPurchasePage from "../pages/Tickets/TicketPurchasePage";
import TicketLookupPage from "../pages/Tickets/TicketLookupPage";
import TicketCancelPage from "../pages/Tickets/TicketCancelPage";

// Global navbar
import Navbar from "../components/common/Navbar";

export default function AppRouter() {
  return (
    <Router>
      {/* Global navigation bar */}
      <Navbar />

      {/* Main content area */}
      <div style={{ padding: "16px 24px" }}>
        <Routes>
          {/* Default route: show Flight Roster / Details */}
          <Route path="/" element={<FlightDetailsPage />} />

          {/* Ticket-related pages */}
          <Route path="/tickets/purchase" element={<TicketPurchasePage />} />
          <Route path="/tickets/lookup" element={<TicketLookupPage />} />
          <Route path="/tickets/cancel" element={<TicketCancelPage />} />

          {/* Fallback: any unknown path -> go home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
