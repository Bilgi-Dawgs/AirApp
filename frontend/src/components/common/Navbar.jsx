import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#0d6efd",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* Logo or App Name */}
      <Link
        to="/"
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          textDecoration: "none",
        }}
      >
        AirApp
      </Link>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "16px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#ffeeba" : "white",
            textDecoration: "none",
            fontSize: "16px",
          })}
        >
          Flight Roster
        </NavLink>

        <NavLink
          to="/tickets/purchase"
          style={({ isActive }) => ({
            color: isActive ? "#ffeeba" : "white",
            textDecoration: "none",
            fontSize: "16px",
          })}
        >
          Purchase Ticket
        </NavLink>

        <NavLink
          to="/tickets/lookup"
          style={({ isActive }) => ({
            color: isActive ? "#ffeeba" : "white",
            textDecoration: "none",
            fontSize: "16px",
          })}
        >
          Lookup Ticket
        </NavLink>

        <NavLink
          to="/tickets/cancel"
          style={({ isActive }) => ({
            color: isActive ? "#ffeeba" : "white",
            textDecoration: "none",
            fontSize: "16px",
          })}
        >
          Cancel Ticket
        </NavLink>
      </div>
    </nav>
  );
}
