import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- MUI COMPONENTS ---
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

// --- MUI ICONS ---
import {
  AccountCircle,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Menu as MenuIcon, // Hamburger Menü İkonu
} from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";

//===========================================================================

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // --- STATE 1: KULLANICI PROFİL MENÜSÜ (Sağ Taraf) ---
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
    navigate("/login");
  };

  // --- STATE 2: MOBİL NAVİGASYON MENÜSÜ (Sol Taraf - Hamburger) ---
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0a1929",
        color: "#ffffff",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Toolbar>
        {/* =========================================================
            1. MOBİL MENÜ İKONU (SADECE MOBİLDE GÖRÜNÜR)
           ========================================================= */}
        {isAuthenticated && (
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-nav"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Mobil Menü İçeriği */}
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <DashboardIcon sx={{ mr: 1, color: "text.secondary" }} />{" "}
                Dashboard
              </MenuItem>
              <MenuItem
                component={Link}
                to="/search"
                onClick={handleCloseNavMenu}
              >
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} /> Search &
                View
              </MenuItem>
            </Menu>
          </Box>
        )}

        {/* =========================================================
            2. LOGO ALANI (HER ZAMAN GÖRÜNÜR)
           ========================================================= */}
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
            variant="rounded"
            sx={{
              mr: 2,
              width: 35,
              height: 35,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <AdminPanelSettingsIcon fontSize="small" />
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                lineHeight: 1,
                fontSize: { xs: "1rem", md: "1.25rem" }, // Mobilde yazı biraz küçülsün
              }}
            >
              Flight Roster
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.6)",
                letterSpacing: 1,
                fontSize: "0.65rem",
              }}
            >
              INTERNAL OPS
            </Typography>
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* =========================================================
            3. MASAÜSTÜ NAVİGASYON (SADECE PC'DE GÖRÜNÜR)
           ========================================================= */}
        {isAuthenticated && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, mr: 3 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/search"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Search & View
            </Button>
          </Box>
        )}

        {/* =========================================================
            4. KULLANICI PROFİLİ (SAĞ TARAF)
           ========================================================= */}
        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ mr: 1, display: { xs: "none", sm: "block" } }}
            >
              {user?.name || "Admin User"}
            </Typography>

            <IconButton
              size="large"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>

            <Menu
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: { mt: 1.5, minWidth: 180 },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Aktif Kullanıcı
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.name || "admin"}@flightops.com
                </Typography>
              </Box>
              <Divider />

              {/* Mobilde Profil Menüsü İçinde de Linkler Olabilir (Opsiyonel) */}
              {/* Ama Hamburger menüye koyduğumuz için burası sadece profil işlemleri kalsa daha temiz olur */}

              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ borderColor: "rgba(255,255,255,0.5)" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
