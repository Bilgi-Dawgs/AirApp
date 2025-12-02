import React, { useState } from "react";
import SeatMap from "../../components/roster/SeatMap";
import TabularView from "../../components/roster/TabularView";
import ExtendedView from "../../components/roster/ExtendedView";
import PlaneView from "../../components/roster/PlaneView";

// This page is a mock Flight Details / Roster screen.
// It lets the user switch between different roster views.
export default function FlightDetailsPage() {
  const [activeView, setActiveView] = useState("seat");

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "16px" }}>Flight Roster (Mock)</h1>

      {/* View selector buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <ViewButton
          label="Seat Map"
          isActive={activeView === "seat"}
          onClick={() => setActiveView("seat")}
        />
        <ViewButton
          label="Table View"
          isActive={activeView === "table"}
          onClick={() => setActiveView("table")}
        />
        <ViewButton
          label="Extended View"
          isActive={activeView === "extended"}
          onClick={() => setActiveView("extended")}
        />
        <ViewButton
          label="Plane Layout"
          isActive={activeView === "plane"}
          onClick={() => setActiveView("plane")}
        />
      </div>

      {/* Active view content */}
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          padding: "16px",
          background: "#ffffff",
        }}
      >
        {activeView === "seat" && (
          <SeatMap onSeatSelect={(seat) => console.log("Selected seat:", seat)} />
        )}

        {activeView === "table" && <TabularView />}

        {activeView === "extended" && <ExtendedView />}

        {activeView === "plane" && <PlaneView />}
      </div>
    </div>
  );
}

function ViewButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        backgroundColor: isActive ? "#2563eb" : "#f9fafb",
        color: isActive ? "#ffffff" : "#111827",
        fontSize: "13px",
        cursor: "pointer",
        fontWeight: isActive ? 600 : 500,
      }}
    >
      {label}
    </button>
  );
}
