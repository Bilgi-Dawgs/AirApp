import React from "react";

const mockRoster = [
  { seat: "1A", name: "John Doe", role: "Pilot" },
  { seat: "1B", name: "Emily Clark", role: "Cabin Crew" },
  { seat: "1C", name: "—", role: "Empty" },
  { seat: "2A", name: "Michael Brown", role: "Cabin Crew" },
  { seat: "2B", name: "—", role: "Empty" },
];

export default function TabularView() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Roster Table View (Mock)</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Seat</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Role</th>
          </tr>
        </thead>

        <tbody>
          {mockRoster.map((row) => (
            <tr key={row.seat}>
              <td style={cellStyle}>{row.seat}</td>
              <td style={cellStyle}>{row.name}</td>
              <td style={cellStyle}>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};
