import React, { useState } from "react";

export default function TicketForm() {
  const [formData, setFormData] = useState({
    name: "",
    flight: "",
    seat: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("This is a mock form. No backend is connected yet.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Ticket (Mock)</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <label>
          Passenger Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px" }}
          />
        </label>

        <label>
          Flight Number:
          <input
            name="flight"
            value={formData.flight}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px" }}
          />
        </label>

        <label>
          Seat:
          <input
            name="seat"
            value={formData.seat}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px" }}
          />
        </label>

        <button
          type="submit"
          style={{ padding: "10px", marginTop: "10px" }}
        >
          Save Ticket
        </button>
      </form>
    </div>
  );
}
