import React from "react";

export default function TicketCard({ passengerName, flightNumber, seat, status }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "6px" }}>{passengerName}</h3>
      <p><strong>Flight:</strong> {flightNumber}</p>
      <p><strong>Seat:</strong> {seat}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}
