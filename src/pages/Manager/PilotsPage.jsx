// src/pages/Manager/PilotsPage.jsx
import { useState } from "react";

export default function PilotsPage() {
  const [search, setSearch] = useState("");

  // Fake data (later API can replace)
  const pilots = [
    { id: 1, name: "John Peterson", rank: "Captain", hours: 4200 },
    { id: 2, name: "Emily Carter", rank: "First Officer", hours: 1800 },
    { id: 3, name: "Michael Stone", rank: "Captain", hours: 5100 },
    { id: 4, name: "Sarah Brown", rank: "First Officer", hours: 900 },
  ];

  const filtered = pilots.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      
      <h1 style={{ fontSize: "32px", marginBottom: "8px", fontWeight: "800" }}>
        👨‍✈️ Pilots
      </h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Manage all registered pilots.
      </p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search pilots..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "24px",
          fontSize: "16px",
        }}
      />

      {/* Pilots List */}
      <div style={{ display: "grid", gap: "16px" }}>
        {filtered.length === 0 && (
          <div
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            No pilots found.
          </div>
        )}

        {filtered.map((pilot) => (
          <div
            key={pilot.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
                {pilot.name}
              </h2>
              <p style={{ margin: 0, color: "#666" }}>
                {pilot.rank} — {pilot.hours} flight hours
              </p>
            </div>

            <button
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                background: "#4a67ff",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
