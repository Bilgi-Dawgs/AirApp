// frontend/src/components/common/Navbar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

// ===========================================================================

const Navbar = () => {
  // Temporary auth mock – will be replaced by useAuth later
  const isAuthenticated = false;
  const user = isAuthenticated ? { name: "Bayram" } : null;
  const logout = () => {
    console.log("Logout (mock)");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

        {/* === Public menu links (requested order) === */}
        <Button color="inherit" component={Link} to="/flights">
          Uçuş Ara
        </Button>

        <Button color="inherit" component={Link} to="/flight-roster">
          Bilet Paneli
        </Button>

        <Button color="inherit" component={Link} to="/status">
          Uçuş Durumu
        </Button>

        <Button color="inherit" component={Link} to="/support">
          Yardım
        </Button>

        {/* === Right side: auth-dependent area === */}
        {isAuthenticated && user ? (
          <>
            <Button color="inherit" component={Link} to="/my-bookings">
              Biletlerim
            </Button>

            {/* Profile menu */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                <AccountCircle sx={{ mr: 1 }} /> Profilim
              </MenuItem>
              <MenuItem component={Link} to="/my-bookings" onClick={handleClose}>
                <ConfirmationNumberIcon sx={{ mr: 1 }} /> Biletlerim
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                <LogoutIcon sx={{ mr: 1 }} /> Çıkış Yap
              </MenuItem>
            </Menu>
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
