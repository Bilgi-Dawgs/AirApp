import React from "react";

const mockPlaneLayout = [
  {
    row: 1,
    seats: [
      { code: "1A", type: "crew" },
      { code: "1B", type: "crew" },
      { code: "1C", type: "empty" },
      { code: "1D", type: "empty" },
    ],
  },
  {
    row: 2,
    seats: [
      { code: "2A", type: "passenger" },
      { code: "2B", type: "passenger" },
      { code: "2C", type: "passenger" },
      { code: "2D", type: "empty" },
    ],
  },
  {
    row: 3,
    seats: [
      { code: "3A", type: "passenger" },
      { code: "3B", type: "reserved" },
      { code: "3C", type: "passenger" },
      { code: "3D", type: "empty" },
    ],
  },
];

export default function PlaneView() {
  return (
    <div style={{ padding: "20px", maxWidth: "420px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "12px" }}>Plane Layout View (Mock)</h2>

      {/* Legend */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <LegendBox color="#60a5fa" label="Crew" />
        <LegendBox color="#4ade80" label="Passenger" />
        <LegendBox color="#facc15" label="Reserved" />
        <LegendBox color="#e5e7eb" label="Empty" />
      </div>

      {/* Simple plane shape container */}
      <div
        style={{
          borderRadius: "999px 999px 40px 40px",
          border: "2px solid #d4d4d4",
          padding: "16px 16px 24px",
          background: "#f9fafb",
        }}
      >
        {/* Cockpit */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#4b5563",
          }}
        >
          Cockpit
        </div>

        {/* Seat rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {mockPlaneLayout.map((row) => (
            <div
              key={row.row}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "6px",
                alignItems: "center",
              }}
            >
              {row.seats.map((seat) => (
                <SeatBox key={seat.code} seat={seat} />
              ))}
            </div>
          ))}
        </div>

        {/* Back of plane */}
        <div
          style={{
            textAlign: "center",
            marginTop: "14px",
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          Rear of the aircraft
        </div>
      </div>
    </div>
  );
}

function SeatBox({ seat }) {
  const backgroundColor =
    seat.type === "crew"
      ? "#60a5fa"
      : seat.type === "passenger"
      ? "#4ade80"
      : seat.type === "reserved"
      ? "#facc15"
      : "#e5e7eb";

  return (
    <div
      style={{
        padding: "6px 4px",
        borderRadius: "6px",
        backgroundColor,
        border: "1px solid #d4d4d4",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: 600,
        color: "#111827",
      }}
    >
      {seat.code}
    </div>
  );
}

function LegendBox({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "3px",
          backgroundColor: color,
          border: "1px solid #ccc",
        }}
      />
      <span style={{ fontSize: "12px" }}>{label}</span>
    </div>
  );
}

