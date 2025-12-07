// frontend/src/components/common/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

// ===========================================================================
// Simple global navigation bar with a single "Bilet Yönetimi" entry
// ===========================================================================

const Navbar = () => {
  // Temporary auth mock – will be replaced by useAuth later
  const isAuthenticated = false;
  const user = isAuthenticated ? { name: "Bayram" } : null;
  const logout = () => {
    console.log("Logout (mock)");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(1, 18, 54, 0.84)", color: "#04eeffff" }}
    >
      <Toolbar>
        {/* Brand / logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src="/logo-1.png"
            variant="square"
            sx={{ mr: 2, width: 100, height: 100 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Bilgi Dawgs Air
          </Typography>
        </Link>

        {/* Push menu items to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Main menu: Uçuş Ara | Uçuş Durumu | Bilet Yönetimi | Yardım */}
        <Button color="inherit" component={Link} to="/flights">
          Uçuş Ara
        </Button>

        <Button color="inherit" component={Link} to="/status">
          Uçuş Durumu
        </Button>

        <Button color="inherit" component={Link} to="/flight-roster">
          Bilet Yönetimi
        </Button>

        <Button color="inherit" component={Link} to="/support">
          Yardım
        </Button>

        {/* Right side: Auth area */}
        {isAuthenticated && user ? (
          <>
            <Button color="inherit" component={Link} to="/my-bookings">
              Biletlerim
            </Button>
            <IconButton color="inherit" onClick={logout}>
              <AccountCircle />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ ml: 2 }}
            >
              Giriş Yap
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/register"
              sx={{ ml: 1, color: "white" }}
            >
              Kayıt Ol
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
