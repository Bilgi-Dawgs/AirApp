// src/pages/Auth/ForgotPasswordPage.jsx
import { useState } from "react";
import ErrorBox from "../../components/ErrorBox";

export default function ForgotPasswordPage({ context = "user", noContainer = false }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const isManager = context === "manager";

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setInfo("");
    setBusy(true);

    try {
      // burada normalde API çağrısı olur
      await new Promise((res) => setTimeout(res, 600));
      setInfo(
        isManager
          ? "A password reset link has been sent to the manager email (demo)."
          : "A password reset link has been sent to your email (demo)."
      );
    } catch {
      setErr("Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const card = (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-icon">📧</div>
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-desc">
          {isManager
            ? "Enter the manager email to reset the manager panel password."
            : "Enter your email address to reset your account password."}
        </p>
      </div>

      <ErrorBox message={err} />
      {info && <div className="info-box">{info}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label className="auth-label">Email Address</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="auth-button" disabled={busy}>
          {busy ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );

  if (noContainer) return card;
  return <div className="auth-page">{card}</div>;
}
