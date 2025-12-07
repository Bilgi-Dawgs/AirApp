import React from "react";
import TicketForm from "../../components/tickets/TicketForm";
import TicketCard from "../../components/tickets/TicketCard";

// Page for creating a ticket (mock only, no backend yet)
export default function TicketPurchasePage() {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "16px" }}>Ticket Purchase (Mock)</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {/* Left: form area */}
        <div
          style={{
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          <TicketForm />
        </div>

        {/* Right: example ticket preview */}
        <div
          style={{
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2 style={{ marginBottom: "8px", fontSize: "16px" }}>
            Example Ticket Preview
          </h2>

          <TicketCard
            passengerName="Example Passenger"
            flightNumber="TK1234"
            seat="12A"
            status="Confirmed"
          />
          <p style={{ fontSize: "12px", color: "#6b7280" }}>
            This preview is static and only for demonstrating the ticket layout.
          </p>
        </div>
      </div>
    </div>
  );
}
