// src/pages/Auth/ManagerLoginPage.jsx (Son Hali)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ErrorBox from "../../components/ErrorBox";
import useToast from "../../hooks/useToast"; 

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export default function ManagerLoginPage({ onSuccess, noContainer = false }) {
  const { loginAsManager } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();

  const [email, setEmail] = useState("manager@demo.com");
  const [password, setPassword] = useState("1234"); // 🔥 MOCK ŞİFRE
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validate() {
    setEmailError("");
    setPasswordError("");
    let isValid = true;

    if (!email.trim()) {
        setEmailError("Manager email is required.");
        isValid = false;
    } 
    else if (!EMAIL_REGEX.test(email)) {
        setEmailError("Please enter a valid email address.");
        isValid = false;
    }

    if (!password) {
        setPasswordError("Password is required.");
        isValid = false;
    }

    setErr("");
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validate()) {
        return;
    }
    
    setBusy(true);

    try {
      await loginAsManager({ email, password });
      show("Manager login successful.", "success");

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/manager/dashboard", { replace: true });
      }
      
    } catch (ex) {
      const errorMessage = ex?.message || ex?.response?.data?.message || "Manager login failed";
      setErr(errorMessage);
      show("Login attempt failed.", "error"); 
      
    } finally {
      setBusy(false);
    }
  }

  const content = (
    <div className="auth-card">
      {/* HEADER */}
      <div className="auth-header">
        <div className="auth-icon">🛠️</div>
        <h2 className="auth-title">Manager Panel Login</h2>
        <p className="auth-desc">Enter credentials to access the administration panel.</p>
      </div>

      {/* ERROR */}
      {err && <ErrorBox message={err} />}

      {/* FORM */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label className="auth-label" htmlFor="manager-email">Manager Email</label>
          <input
            className={`auth-input ${emailError ? 'auth-input-error' : ''}`}
            type="email"
            id="manager-email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
            }}
          />
          {emailError && <p className="auth-error-text">{emailError}</p>}
        </div>

        <div>
          <label className="auth-label" htmlFor="manager-password">Password</label>
          <input
            className={`auth-input ${passwordError ? 'auth-input-error' : ''}`}
            type="password"
            id="manager-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
            }}
          />
          {passwordError && <p className="auth-error-text">{passwordError}</p>}
        </div>

        <button className="auth-button" disabled={busy}>
          {busy ? "Logging in..." : "Log In as Manager"}
        </button>
      </form>

      {/* FOOTER LINKS */}
      <div className="auth-footer-links" style={{ textAlign: "left", marginTop: "12px" }}>
        
        {/* Sadece yetkili personel metni (gri metin) */}
        <p className="auth-footer-text" style={{ marginBottom: "12px" }}>
          Only authorized personnel may access this panel.
        </p>

        {/* Şifremi Unuttun Linki */}
        <p className="forgot-link">
          <span
            className="auth-link-span"
            onClick={() => navigate("/manager/forgot-password")}
            style={{ cursor: "pointer", fontWeight: 600 }}
          >
            Forgot Manager Password?
          </span>
        </p>

      </div>
    </div>
  );

  if (noContainer) return content;

  return <div className="auth-page">{content}</div>;
}