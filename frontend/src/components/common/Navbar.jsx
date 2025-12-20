import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

import {
  AccountCircle,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

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
                fontSize: { xs: "1rem", md: "1.25rem" },
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
