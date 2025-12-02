import React, { useState } from "react";
import TicketCard from "../../components/tickets/TicketCard";

// Page for looking up a ticket (mock only, no real backend)
export default function TicketLookupPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this is where we would call the backend API
    setHasSearched(true);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "16px" }}>Ticket Lookup (Mock)</h1>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        style={{
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "16px",
          backgroundColor: "#ffffff",
          marginBottom: "20px",
        }}
      >
        <label style={{ display: "block", marginBottom: "8px" }}>
          Enter passenger name or ticket number:
        </label>

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Victor Osimhen or TK1234-567"
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 14px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Search
          </button>
        </div>
      </form>

      {/* Search result area (mock) */}
      <div
        style={{
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "16px",
          backgroundColor: "#f9fafb",
        }}
      >
        <h2 style={{ marginBottom: "8px", fontSize: "16px" }}>
          Search Result (Mock)
        </h2>

        {!hasSearched && (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            No search performed yet. Please enter a query and click Search.
          </p>
        )}

        {hasSearched && query.trim() === "" && (
          <p style={{ fontSize: "13px", color: "#b91c1c" }}>
            Please enter a name or ticket number to search.
          </p>
        )}

        {hasSearched && query.trim() !== "" && (
          <>
            {/* In a real app, these values would come from the backend */}
            <TicketCard
              passengerName="Mock Passenger"
              flightNumber="TK5678"
              seat="7C"
              status="Checked-in"
            />
            <p style={{ fontSize: "12px", color: "#6b7280" }}>
              This is a static mock result. In the real application, the search
              query would be sent to the backend, and the response would be
              shown here.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
