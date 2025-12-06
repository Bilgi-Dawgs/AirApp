import { useState } from "react";

export default function ManagerSettingsPage() {
  const [tab, setTab] = useState("security");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!currentPassword || !newPassword) {
      setType("error");
      setMessage("Please fill in both fields.");
      return;
    }

    setType("success");
    setMessage("Password updated successfully (demo only).");
    setCurrentPassword("");
    setNewPassword("");
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
        Settings
      </h1>
      <p style={{ color: "#667", marginBottom: 28, fontSize: 18 }}>
        Manage your account, security, and system preferences.
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 28, marginBottom: 32 }}>
        <button
          onClick={() => setTab("security")}
          className={tab === "security" ? "settings-tab active" : "settings-tab"}
        >
          🔐 Security
        </button>

        <button
          onClick={() => setTab("account")}
          className={tab === "account" ? "settings-tab active" : "settings-tab"}
        >
          👤 Account
        </button>

        <button
          onClick={() => setTab("system")}
          className={tab === "system" ? "settings-tab active" : "settings-tab"}
        >
          ⚙️ System
        </button>
      </div>

      {/* Security Tab */}
      {tab === "security" && (
        <div className="settings-card" style={{ marginBottom: 40 }}>
          <h2>Change Password</h2>
          <p style={{ marginTop: -6, marginBottom: 20, color: "#555" }}>
            Update your password to keep your account secure.
          </p>

          {message && (
            <div className={type === "success" ? "success-box" : "error-box"}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="auth-label">Current Password</label>
            <input
              className="auth-input"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label className="auth-label" style={{ marginTop: 14 }}>
              New Password
            </label>
            <input
              className="auth-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="auth-button">Update Password</button>
          </form>

          <hr style={{ margin: "30px 0", borderTop: "1px solid #ddd" }} />

          <h3 style={{ marginBottom: 12 }}>Login History</h3>
          <ul style={{ marginLeft: 18, marginBottom: 22 }}>
            <li>📅 2025-01-18 — Chrome (Windows)</li>
            <li>📅 2025-01-16 — Chrome (Windows)</li>
            <li>📅 2025-01-12 — iPhone Safari</li>
          </ul>

          <h3 style={{ marginTop: 8, marginBottom: 12 }}>Active Sessions</h3>
          <div style={{ marginLeft: 18 }}>
            <p>💻 Windows • Chrome • Active Now</p>
            <p>📱 iPhone • Safari • Last active 5h ago</p>
          </div>

          <button
            style={{
              marginTop: 24,
              background: "transparent",
              color: "#4a67ff",
              border: "none",
              fontSize: 15,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Logout all devices
          </button>
        </div>
      )}

      {/* Account Tab */}
      {tab === "account" && (
        <div className="settings-card">
          <h2>Account Information</h2>
          <p style={{ marginTop: -6, marginBottom: 20, color: "#555" }}>
            Manage your personal information.
          </p>

          <p>
            <strong>Name:</strong> Demo User
          </p>
          <p>
            <strong>Email:</strong> manager@example.com
          </p>

          <button
            style={{
              marginTop: 20,
              background: "#4a67ff",
              color: "white",
              borderRadius: 10,
              padding: "12px 18px",
            }}
          >
            Edit Account
          </button>
        </div>
      )}

      {/* System Tab */}
      {tab === "system" && (
        <div className="settings-card">
          <h2>System Settings</h2>
          <p style={{ marginTop: -6, marginBottom: 20, color: "#555" }}>
            Control application preferences and UI behavior.
          </p>

          <p>Dark mode, performance settings and layout options will appear here.</p>
        </div>
      )}
    </div>
  );
}
