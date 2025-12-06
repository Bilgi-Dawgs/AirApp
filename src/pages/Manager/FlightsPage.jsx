import { useState } from "react";

export default function FlightsPage() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const flights = [
    {
      id: 1,
      code: "TK120",
      from: "Istanbul",
      to: "London",
      date: "2025-02-10",
      pilot: "John Carter",
      status: "Scheduled",
    },
    {
      id: 2,
      code: "TK98",
      from: "Ankara",
      to: "Berlin",
      date: "2025-02-11",
      pilot: "Emily Davis",
      status: "Delayed",
    },
    {
      id: 3,
      code: "TK320",
      from: "Istanbul",
      to: "Dubai",
      date: "2025-02-10",
      pilot: "Robert Hill",
      status: "Completed",
    },
  ];

  const statusBadge = {
    scheduled: { background: "#4A90E2", color: "#fff" },
    delayed: { background: "#E67E22", color: "#fff" },
    completed: { background: "#2ECC71", color: "#fff" },
  };

  const filtered = flights.filter((f) => {
    const matchesSearch =
      f.code.toLowerCase().includes(search.toLowerCase()) ||
      f.from.toLowerCase().includes(search.toLowerCase()) ||
      f.to.toLowerCase().includes(search.toLowerCase()) ||
      f.pilot.toLowerCase().includes(search.toLowerCase());

    const matchesDate = dateFilter ? f.date === dateFilter : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px" }}>
      {/* HEADER */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        ✈️ Flights
      </h1>

      <p style={{ color: "#555", marginBottom: 24 }}>
        Manage flight schedules, pilots, and status.
      </p>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search flight, destination or pilot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          background: "white",
          borderRadius: "12px",
          borderCollapse: "collapse",
          overflow: "hidden",
          boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f6ff" }}>
            <th style={{ padding: "14px", textAlign: "left" }}>Flight</th>
            <th style={{ padding: "14px", textAlign: "left" }}>From</th>
            <th style={{ padding: "14px", textAlign: "left" }}>To</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Pilot</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((f) => (
            <tr key={f.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "14px" }}>{f.code}</td>
              <td style={{ padding: "14px" }}>{f.from}</td>
              <td style={{ padding: "14px" }}>{f.to}</td>
              <td style={{ padding: "14px" }}>{f.date}</td>
              <td style={{ padding: "14px" }}>{f.pilot}</td>
              <td style={{ padding: "14px" }}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    ...statusBadge[f.status.toLowerCase()],
                  }}
                >
                  {f.status}
                </span>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: 20, textAlign: "center" }}>
                No flights found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
