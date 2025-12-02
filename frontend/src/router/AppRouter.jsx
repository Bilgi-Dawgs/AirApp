import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FlightDetailsPage from "../pages/Flights/FlightDetailsPage";
import TicketPurchasePage from "../pages/Tickets/TicketPurchasePage";
import TicketLookupPage from "../pages/Tickets/TicketLookupPage";
import TicketCancelPage from "../pages/Tickets/TicketCancelPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Default route: show flight roster / details */}
        <Route path="/" element={<FlightDetailsPage />} />

        {/* Ticket related pages */}
        <Route path="/tickets/purchase" element={<TicketPurchasePage />} />
        <Route path="/tickets/lookup" element={<TicketLookupPage />} />
        <Route path="/tickets/cancel" element={<TicketCancelPage />} />

        {/* Fallback: any unknown path -> go home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
