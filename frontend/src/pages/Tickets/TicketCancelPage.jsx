import React, { useState } from "react";

// Page for cancelling a ticket (mock only, no real backend)
export default function TicketCancelPage() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      setMessage("Please enter a ticket number or passenger name.");
      return;
    }

    // In a real app, this is where we would call the backend API
    setMessage(
      `This is a mock response. Ticket "${query.trim()}" would be cancelled here in the real system.`
    );
  };

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "16px" }}>Ticket Cancellation (Mock)</h1>

      <form
        onSubmit={handleCancel}
        style={{
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "16px",
          backgroundColor: "#ffffff",
          marginBottom: "20px",
        }}
      >
        <label style={{ display: "block", marginBottom: "8px" }}>
          Enter ticket number or passenger name:
        </label>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. TK1234-567 or John Smith"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            marginBottom: "12px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 14px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#dc2626",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Cancel Ticket
        </button>
      </form>

      <div
        style={{
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "16px",
          backgroundColor: "#f9fafb",
          minHeight: "60px",
        }}
      >
        <h2 style={{ marginBottom: "8px", fontSize: "16px" }}>
          Cancellation Result (Mock)
        </h2>

        {message ? (
          <p style={{ fontSize: "14px" }}>{message}</p>
        ) : (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            No cancellation attempted yet. Enter a ticket identifier and click
            the button above.
          </p>
        )}
      </div>
    </div>
  );
}
