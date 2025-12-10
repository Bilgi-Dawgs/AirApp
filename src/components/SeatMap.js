import React from "react";
import { Box, Paper, Tooltip } from "@mui/material";

/**
 * seatMap: 2D array of seat objects: { label, row, seatIndex, type, occupiedBy }
 * passengersMap: { passenger_id: passengerObject }
 */
export default function SeatMap({ seatMap, passengersMap }) {
  if (!seatMap) return null;

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ fontWeight: "bold", mb: 1 }}>Seat Map</Box>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {seatMap.map((rowSeats, i) => (
          <div key={i} style={{ display: "flex", gap: 6 }}>
            {rowSeats.map(seat => {
              const p = passengersMap[seat.occupiedBy];
              return (
                <Tooltip key={seat.label} title={p ? `${p.name} (${p.age}) — ${seat.label}` : seat.label}>
                  <div style={{
                    width: 46,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    background: p ? (p.seat_type === "business" ? "#e3f2fd" : "#fff9c4") : "#fff"
                  }}>
                    <small style={{ fontSize: 11 }}>{seat.label}</small>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
    </Paper>
  );
}
