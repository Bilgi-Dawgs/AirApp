import React, { useState, useMemo } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import { rosterApi } from "../api/axiosInstance";

// --- LOADER ---
export const flightsLoader = async () => {
  try {
    const response = await rosterApi.get("/available-flights");
    return { flights: response.data, error: null };
  } catch (err) {
    console.error("Flight list fetch error:", err);
    return {
      flights: [],
      error: "Could not load flights. System might be offline.",
    };
  }
};

const FlightsPage = () => {
  const navigate = useNavigate();

  const loaderData = useLoaderData() || {};
  const flights = loaderData.flights || [];
  const error = loaderData.error || null;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFlights = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return flights.filter((flight) => {
      const fNum = flight.flightNumber || "";
      return fNum.toLowerCase().includes(searchLower);
    });
  }, [flights, searchTerm]);

  const handleManageRoster = (flightIdentifier) => {
    navigate(`/view/${flightIdentifier}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5", py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#0a1929"
            sx={{ mb: 1 }}
          >
            Flight Operations
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Select a scheduled flight to view its roster or create a new one.
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              maxWidth: 600,
              mx: "auto",
              borderRadius: "50px",
              border: "1px solid #e0e0e0",
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search Flight Number (e.g. TK1920)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ pl: 2 }}>
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { fontSize: "1.1rem", py: 1 },
              }}
            />
          </Paper>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          {filteredFlights.map((flight) => {
            const stableKey =
              flight.id || `${flight.flightNumber}-${flight.flightDate}`;

            return (
              <Paper
                key={stableKey}
                elevation={2}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  borderLeft: "6px solid #0a1929",
                  transition: "0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 2, md: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: { xs: "100%", md: "30%" },
                  }}
                >
                  <Box
                    sx={{ p: 1.5, backgroundColor: "#e3f2fd", borderRadius: 2 }}
                  >
                    <FlightTakeoffIcon color="primary" />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#0a1929">
                      {flight.flightNumber || "Unknown Flight"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {flight.sourceAirportCode || "IST"} ➔{" "}
                      {flight.destinationAirportCode || "DEST"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                  <Stack spacing={0.5}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarMonthIcon fontSize="small" color="action" />
                      <Typography variant="body2" fontWeight="500">
                        {flight.flightDate
                          ? new Date(flight.flightDate).toLocaleDateString(
                              "tr-TR"
                            )
                          : "Scheduled"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AirplanemodeActiveIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {flight.vehicleModel || "Unknown Aircraft"}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: { xs: "100%", md: "30%" },
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleManageRoster(flight.flightNumber)}
                    sx={{
                      backgroundColor: "#0a1929",
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 20,
                      px: 3,
                    }}
                  >
                    Manage Roster
                  </Button>
                </Box>
              </Paper>
            );
          })}

          {!error && filteredFlights.length === 0 && (
            <Box sx={{ textAlign: "center", py: 5, opacity: 0.7 }}>
              <FlightTakeoffIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {flights.length === 0
                  ? "No scheduled flights found."
                  : `No flights matching "${searchTerm}"`}
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default FlightsPage;
