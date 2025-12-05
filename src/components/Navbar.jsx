// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    if (user?.role === "manager") {
      navigate("/manager/login");
    } else {
      navigate("/");
    }
  }

  return (
    <header className="topbar">
      <div className="topbar__inner">

        {/* SOL TARAF – LOGO */}
        <Link to="/" className="brand">
          <span className="brand__logo">
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" stroke="#ffffff" strokeWidth="3" />
              <path
                d="M11 26l26-9-2.5 6.5L22 26l9 7-3 2-8-6-5 6h-4l4-8-4-1 0-3z"
                fill="#ffffff"
              />
              <path
                d="M36 10l2.8 2.2-2 2.4-2.8-2.2L36 10z"
                fill="#ffffff"
              />
            </svg>
          </span>
          <span className="brand__title">Bilgi Drawgs AirApp</span>
        </Link>

        {/* SAĞ TARAF */}
        <nav className="nav">

          {!isAuthenticated ? (
            <>
              {/* Normal Kullanıcı Login */}
              <Link to="/" className="btn btn--ghost">
                Login
              </Link>

              {/* Manager Login */}
              <Link to="/manager/login" className="btn btn--ghost">
                Manager Login
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn--primary">
              Logout
            </button>
          )}

          <button onClick={toggleTheme} className="btn btn--ghost">
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </nav>
      </div>
    </header>
  );
}
