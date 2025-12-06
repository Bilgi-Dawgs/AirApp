// src/pages/Profile/ProfilePage.jsx
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { show } = useToast();

  // PROFİL BİLGİLERİ
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const role = user?.role || "user";
  const [saving, setSaving] = useState(false);

  // FOTOĞRAF
  const [photo, setPhoto] = useState(user?.photo || null);
  const [preview, setPreview] = useState(user?.photo || null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // backend yoksa şimdilik local
    setPhoto(file);
  };

  // ŞİFRE ALANLARI
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [changing, setChanging] = useState(false);

  // PROFİL KAYDET
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      updateUser({ name, email, photo: preview }); // backend gelince düzenleriz
      show("Profile updated.", "success");
    } catch {
      show("Profile update failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ŞİFRE DEĞİŞTİR
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !newPassword2) {
      show("Please fill all fields.", "error");
      return;
    }
    if (newPassword.length < 6) {
      show("New password must be at least 6 characters.", "error");
      return;
    }
    if (newPassword !== newPassword2) {
      show("New passwords do not match.", "error");
      return;
    }

    setChanging(true);

    setTimeout(() => {
      show("Password updated successfully.", "success");
      setCurrentPassword("");
      setNewPassword("");
      setNewPassword2("");
      setChanging(false);
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* -- FOTOĞRAF ALANI -- */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 12px",
              border: "2px solid #d7d7d7",
              boxShadow: "0 0 8px rgba(0,0,0,0.10)",
            }}
          >
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <label
            style={{
              display: "inline-block",
              background: "#3f6ee8",
              color: "white",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* --- PROFİL FORMU --- */}
        <form onSubmit={handleSaveProfile} className="auth-form">
          <div>
            <label className="auth-label">Full Name</label>
            <input
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="auth-label">Email Address</label>
            <input
              className="auth-input"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="auth-label">Role</label>
            <input
              className="auth-input"
              value={role}
              disabled
              style={{ opacity: 0.6 }}
            />
          </div>

          <button className="auth-button" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <hr style={{ margin: "30px 0", borderColor: "#eee" }} />

        {/* --- ŞİFRE DEĞİŞTİR --- */}
        <div className="auth-header" style={{ marginBottom: 8 }}>
          <div className="auth-icon">🔒</div>
          <h2 className="auth-title" style={{ fontSize: 22 }}>
            Change Password
          </h2>
        </div>

        <form onSubmit={handleChangePassword} className="auth-form">
          <div>
            <label className="auth-label">Current Password</label>
            <input
              className="auth-input"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="auth-label">New Password</label>
            <input
              className="auth-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="auth-label">Confirm New Password</label>
            <input
              className="auth-input"
              type="password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>

          <button className="auth-button" disabled={changing}>
            {changing ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
