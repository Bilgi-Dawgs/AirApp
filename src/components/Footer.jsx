// src/components/Footer.jsx
import useAuth from "../hooks/useAuth";

export default function Footer() {
  const { isAuthenticated, user } = useAuth();

  const rightText = isAuthenticated
    ? `Signed in as ${user?.name || user?.email || "User"}`
    : "You are not signed in.";

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 8,
        left: 12,
        right: 12,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "#777",
        pointerEvents: "none",        // tıklamaya engel olmasın
      }}
    >
      <span style={{ pointerEvents: "auto" }}>
        Flight Roster Frontend · v0.1
      </span>

      <span style={{ pointerEvents: "auto" }}>
        {rightText}
      </span>
    </footer>
  );
}
