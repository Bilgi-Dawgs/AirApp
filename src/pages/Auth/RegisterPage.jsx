import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast"; 
import ErrorBox from "../../components/ErrorBox"; // ErrorBox eklendi

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function RegisterPage({ onOpenLogin, noContainer = false }) {
  const { register } = useAuth();
  const navigate = useNavigate(); 
  const { show } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  function validate() {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPassword2Error("");
    let isValid = true;

    if (!name.trim()) {
        setNameError("Full Name is required.");
        isValid = false;
    }
    if (!email.trim() || !EMAIL_REGEX.test(email)) {
        setEmailError("A valid email address is required.");
        isValid = false;
    }
    if (!password) {
        setPasswordError("Password is required.");
        isValid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
        isValid = false;
    }
    if (password !== password2) {
        setPassword2Error("Passwords do not match.");
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
      await register({ name, email, password });
      
      show("Registration successful. Please log in.", "success");
      navigate("/", { replace: true });
      
    } catch (ex) {
      const errorMessage = ex?.response?.data?.message || "Registration failed. Please try again.";
      setErr(errorMessage);
      show("Registration failed.", "error");
      
    } finally {
      setBusy(false);
    }
  }

  const content = (
    <div className="auth-card">

      {/* HEADER */}
      <div className="auth-header">
        <div className="auth-icon">📝</div>
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-desc">Sign up to start managing your flights.</p>
      </div>

      {/* ERROR */}
      {err && <ErrorBox message={err} />}

      {/* FORM */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label className="auth-label" htmlFor="name">Full Name</label>
          <input 
            className={`auth-input ${nameError ? 'auth-input-error' : ''}`}
            id="name"
            placeholder="e.g., Jane Doe"
            value={name} 
            onChange={(e) => { setName(e.target.value); setNameError(""); }} 
          />
          {nameError && <p className="auth-error-text">{nameError}</p>}
        </div>

        <div>
          <label className="auth-label" htmlFor="email">Email Address</label>
          <input 
            className={`auth-input ${emailError ? 'auth-input-error' : ''}`}
            id="email"
            type="email" 
            placeholder="e.g., jane@mail.com"
            value={email} 
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} 
          />
          {emailError && <p className="auth-error-text">{emailError}</p>}
        </div>

        <div>
          <label className="auth-label" htmlFor="password">Password</label>
          <input 
            className={`auth-input ${passwordError ? 'auth-input-error' : ''}`}
            id="password"
            type="password" 
            placeholder={`minimum ${MIN_PASSWORD_LENGTH} characters`}
            value={password} 
            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }} 
          />
          {passwordError && <p className="auth-error-text">{passwordError}</p>}
        </div>
        
        <div>
          <label className="auth-label" htmlFor="password2">Confirm Password</label>
          <input 
            className={`auth-input ${password2Error ? 'auth-input-error' : ''}`}
            id="password2"
            type="password" 
            placeholder="repeat password"
            value={password2} 
            onChange={(e) => { setPassword2(e.target.value); setPassword2Error(""); }} 
          />
          {password2Error && <p className="auth-error-text">{password2Error}</p>}
        </div>

        <button className="auth-button" disabled={busy}>
          {busy ? "Registering..." : "Register"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="auth-footer-text">
        Already have an account?
        <span 
          className="auth-link-span"
          onClick={() => navigate("/")}
        >
          {" "}Login
        </span>
      </p>

    </div>
  );

  if (noContainer) return content;
  return <div className="auth-page">{content}</div>;
}