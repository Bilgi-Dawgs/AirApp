import React from "react";

const mockCrew = [
  {
    id: 1,
    name: "John Doe",
    role: "Pilot",
    seat: "1A",
    age: 42,
  },
  {
    id: 2,
    name: "Emily Clark",
    role: "Cabin Crew",
    seat: "1B",
    age: 29,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Cabin Crew",
    seat: "2A",
    age: 35,
  },
];

export default function ExtendedView() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Extended Crew View (Mock)</h2>

      <div style={containerStyle}>
        {mockCrew.map((crew) => (
          <div key={crew.id} style={cardStyle}>
            <h3 style={{ marginBottom: "8px" }}>{crew.name}</h3>

            <p><strong>Role:</strong> {crew.role}</p>
            <p><strong>Seat:</strong> {crew.seat}</p>
            <p><strong>Age:</strong> {crew.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "16px",
  marginTop: "20px",
};

const cardStyle = {
  padding: "15px",
  background: "#fff",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};
