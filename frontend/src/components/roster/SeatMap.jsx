import React, { useState } from "react";

// Mock seat data (since we don't have an API yet)
const mockSeats = [
  { id: 1, code: "1A", isTaken: false },
  { id: 2, code: "1B", isTaken: true },
  { id: 3, code: "1C", isTaken: false },
  { id: 4, code: "1D", isTaken: false },
  { id: 5, code: "2A", isTaken: false },
  { id: 6, code: "2B", isTaken: false },
  { id: 7, code: "2C", isTaken: true },
  { id: 8, code: "2D", isTaken: false },
];

export default function SeatMap({ onSeatSelect }) {
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  const handleSeatClick = (seat) => {
    if (seat.isTaken) return; // Prevent clicking on taken seats
    setSelectedSeatId(seat.id);
    if (onSeatSelect) onSeatSelect(seat); // Notify parent component
  };

  return (
    <div style={{ padding: "20px", maxWidth: "320px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
        Seat Map (Mock)
      </h2>

      {/* Legend section */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <LegendBox color="#4ade80" label="Available" />
        <LegendBox color="#f97373" label="Taken" />
        <LegendBox color="#60a5fa" label="Selected" />
      </div>

      {/* Seat grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {mockSeats.map((seat) => {
          const isSelected = seat.id === selectedSeatId;
          const backgroundColor = seat.isTaken
            ? "#f97373" // Red → taken
            : isSelected
            ? "#60a5fa" // Blue → selected
            : "#4ade80"; // Green → available

          return (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.isTaken}
              style={{
                padding: "8px 4px",
                borderRadius: "6px",
                border: "none",
                backgroundColor,
                color: "#111",
                fontWeight: 500,
                cursor: seat.isTaken ? "not-allowed" : "pointer",
                opacity: seat.isTaken ? 0.7 : 1,
              }}
            >
              {seat.code}
            </button>
          );
        })}
      </div>

      {/* Selected seat info */}
      <div style={{ marginTop: "12px", minHeight: "20px" }}>
        {selectedSeatId ? (
          <span>
            Selected seat:{" "}
            <strong>
              {mockSeats.find((s) => s.id === selectedSeatId)?.code}
            </strong>
          </span>
        ) : (
          <span>Please select a seat.</span>
        )}
      </div>
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
