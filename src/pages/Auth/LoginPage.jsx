import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from "@mui/material";

// Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SecurityIcon from "@mui/icons-material/Security";

// --- AUTH CONTEXT IMPORT ---
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  // Context'ten login fonksiyonunu çekiyoruz
  const { login } = useAuth();

  // State
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input Handle
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); // Yazmaya başlayınca hatayı sil
  };

  // Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // --- MOCK AUTHENTICATION ---
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "1234") {
        console.log("Login Successful");

        login("mock-token-xyz");

        navigate("/"); // Dashboard
      } else {
        setError("Invalid username or password. (Try: admin / 1234)");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(/deneme-1/deneme-1-md.jpg)",
        "@media (min-width: 1440px)": {
          backgroundImage: "url(/deneme-1/deneme-1-lg.jpg)",
        },
        backgroundSize: "cover",

        backgroundPosition: "top center",

        position: "relative",
      }}
    >
      {/* Koyu Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 25, 41, 0.75)",
          backdropFilter: "blur(3px)",
        }}
      />

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderTop: "5px solid #0a1929",
          }}
        >
          {/* Logo / Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#0a1929",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <FlightTakeoffIcon sx={{ color: "white", fontSize: 32 }} />
          </Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            color="#0a1929"
            gutterBottom
          >
            Flight Roster System
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, fontWeight: "500" }}
          >
            INTERNAL OPERATIONS PORTAL
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, fontSize: "0.85rem" }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Personnel ID / Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: "#0a1929",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Secure Login"
              )}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                AUTHORIZED ACCESS ONLY
              </Typography>
            </Divider>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ opacity: 0.7 }}
            >
              <SecurityIcon color="action" fontSize="small" />
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
              >
                This system is monitored.
              </Typography>
            </Stack>

            <Typography
              variant="caption"
              display="block"
              align="center"
              sx={{ mt: 1, color: "#999", fontSize: "0.7rem" }}
            >
              v1.0 (MVP Build)
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
