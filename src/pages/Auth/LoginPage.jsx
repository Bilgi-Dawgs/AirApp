// src/pages/Auth/LoginPage.jsx (Son Hali)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ErrorBox from "../../components/ErrorBox";
import useToast from "../../hooks/useToast"; 

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export default function LoginPage({ noContainer = false }) {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("1234"); // 🔥 MOCK ŞİFRE
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/profile"); 
  }, [isAuthenticated, navigate]);

  function validate() {
    setEmailError("");
    setPasswordError("");
    let isValid = true;

    if (!email.trim()) {
        setEmailError("Email address is required.");
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
      await login({ email, password });
      show("Successfully logged in!", "success");

    } catch (ex) {
      setErr(ex?.response?.data?.message || "Login failed. Please check your credentials.");
      show("Login attempt failed.", "error"); 
      
    } finally {
      setBusy(false);
    }
  }

  const content = (
    <div className="auth-card">
      {/* HEADER */}
      <div className="auth-header">
        <div className="auth-icon">🔒</div>
        <h2 className="auth-title">Login to your Account</h2> 
        <p className="auth-desc">Enter your credentials to access your flight roster.</p>
      </div>

      {/* ERROR */}
      {err && <ErrorBox message={err} />} 

      {/* FORM */}
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label className="auth-label" htmlFor="email">Email Address</label>
          <input
            className={`auth-input ${emailError ? 'auth-input-error' : ''}`}
            type="email"
            id="email"
            placeholder="e.g., john.doe@mail.com"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
            }}
          />
          {emailError && <p className="auth-error-text">{emailError}</p>}
        </div>

        <div>
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            className={`auth-input ${passwordError ? 'auth-input-error' : ''}`}
            type="password"
            id="password"
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
          {busy ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* FOOTER LINKS */}
      <div className="auth-footer-links" style={{ textAlign: "left", marginTop: "12px" }}>
        
        {/* Şifremi Unuttum linki (Sol hizalı ve mavi) */}
        <p className="forgot-link" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>

        {/* Hesap Oluştur linki (Sol hizalı ve mavi) */}
        <p className="auth-footer-text" style={{ marginTop: "12px" }}>
          Don't have an account? 
          <span
            className="auth-link-span" // Mavi rengi bu sınıf getirecek
            onClick={() => navigate("/register")}
            style={{ fontWeight: 600, marginLeft: "4px" }} 
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );

  if (noContainer) return content;

  return <div className="auth-page">{content}</div>;
}