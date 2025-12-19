import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";

// Icons
import FlightIcon from "@mui/icons-material/Flight";
import GroupIcon from "@mui/icons-material/Group";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HubIcon from "@mui/icons-material/Hub";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";

// --- COMPONENT: STAT CARD ---
const StatCard = ({ title, value, icon, color }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      borderRadius: 4,
      border: "1px solid #e0e0e0",
      backgroundColor: "#fff",
      transition: "0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      },
    }}
  >
    <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: `${color}15`,
          color: color,
          width: 60,
          height: 60,
          mr: 2.5,
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="h4" fontWeight="800" sx={{ color: "#0a1929" }}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight="600"
          sx={{ letterSpacing: 0.5 }}
        >
          {title.toUpperCase()}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const HomePage = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const stats = {
    totalRosters: 12,
    activeFlights: 45,
    totalCrew: 84,
    totalPassengers: 1240,
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* =========================================================
          1. HERO BANNER (GÜNCELLENDİ)
      ========================================================= */}
      <Box
        sx={{
          backgroundImage: "url(/deneme-1/deneme-1-md.jpg)",
          "@media (min-width: 1440px)": {
            backgroundImage: "url(/deneme-1/deneme-1-lg.jpg)",
          },
          backgroundSize: "cover",

          // --- DEĞİŞİKLİK BURADA ---
          // 1. Odağı yukarı kaydır (Uçağın üst kısmı görünsün)
          backgroundPosition: "top center",
          // 2. Banner boyunu biraz daha uzat
          minHeight: { xs: "450px", md: "600px" },
          // -------------------------

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(10, 25, 41, 0.6)",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "800", mb: 2, letterSpacing: "-0.5px" }}
          >
            Flight Roster Management System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4,
              fontWeight: "300",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            The central command hub for managing crews, passengers, and flight
            manifests efficiently.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/workbench")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#007FFF",
              py: 1.5,
              px: 5,
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              boxShadow: "0 4px 14px rgba(0, 127, 255, 0.4)",
              "&:hover": { backgroundColor: "#0059b2" },
            }}
          >
            Create a roster
          </Button>
        </Container>
      </Box>

      {/* =========================================================
          2. STATISTICS SECTION 
      ========================================================= */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Rosters"
              value={stats.totalRosters}
              icon={<AssignmentIcon fontSize="large" />}
              color="#007FFF"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Flights Found"
              value={stats.activeFlights}
              icon={<FlightIcon fontSize="large" />}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Ready Crew"
              value={stats.totalCrew}
              icon={<AirlineSeatReclineExtraIcon fontSize="large" />}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Passengers"
              value={stats.totalPassengers}
              icon={<GroupIcon fontSize="large" />}
              color="#9c27b0"
            />
          </Grid>
        </Grid>
      </Container>

      {/* =========================================================
          3. SYSTEM OVERVIEW
      ========================================================= */}
      <Box sx={{ backgroundColor: "#fff", py: 8, borderTop: "1px solid #eee" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Sol Taraf: Açıklama Metni */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="overline"
                color="primary"
                fontWeight="bold"
                sx={{ letterSpacing: 2 }}
              >
                ABOUT THE SYSTEM
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 3, color: "#0a1929" }}
              >
                Simplify Your Flight Operations
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
              >
                This platform is designed to be your single source of truth for
                flight planning. Instead of juggling separate lists for pilots,
                cabin crew, and passengers, our <b>Main System</b> connects
                directly to the <i>Flight API, Crew API,</i> and{" "}
                <i>Passenger API</i>.
              </Typography>

              <Stack spacing={2} sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <HubIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Centralized Data Integration
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Automatically merges flight schedules with available crew
                      and passenger manifests.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <SecurityIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Validation & Compliance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ensures all flights meet seniority rules (e.g. Senior
                      Pilot requirements) before saving.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <SpeedIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Interactive Visualization
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View seat maps, assign seats visually, and export rosters
                      in seconds.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
