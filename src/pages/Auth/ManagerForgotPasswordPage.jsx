import { useState } from "react";

export default function ManagerForgotPasswordPage() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Manager reset link sent to: " + email);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🛠️</span>
          <h2 className="auth-title">Manager Password Reset</h2>
          <p className="auth-desc">
            Enter your manager email to reset your password.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">Manager Email</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
