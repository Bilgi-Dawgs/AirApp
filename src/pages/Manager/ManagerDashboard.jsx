import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ManagerDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px" }}>

      {/* HEADER */}
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
        Manager Panel
      </h1>
      <p style={{ fontSize: 18, color: "#555", marginBottom: 32 }}>
        Welcome back, <strong>{user?.name}</strong> — here is your management overview.
      </p>

      {/* MAIN NAVIGATION CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >


        <Link to="/manager/pilots" className="manager-card">
          🧑‍✈️ Pilots
        </Link>

        <Link to="/manager/flights" className="manager-card">
          ✈️ Flights
        </Link>

        <Link to="/manager/settings" className="manager-card">
          ⚙️ Settings
        </Link>
      </div>

      {/* QUICK STATS */}
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
        Quick Stats
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        <div className="stat-card">
          <h3>🧑‍✈️ Total Pilots</h3>
          <p className="stat-value">18</p>
        </div>

        <div className="stat-card">
          <h3>✈️ Active Flights</h3>
          <p className="stat-value">5</p>
        </div>

        <div className="stat-card">
          <h3>📁 Pending Tasks</h3>
          <p className="stat-value">12</p>
        </div>
      </div>

    </div>
  );
}
