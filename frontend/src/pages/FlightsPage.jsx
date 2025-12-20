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
    const response = await rosterApi.list();

    console.log("STATUS:", response.status);
    console.log("HEADERS:", response.headers);
    console.log("DATA TYPE:", typeof response.data);
    console.log("DATA RAW:", response.data);

    return { rosters: response.data, error: null };
  } catch (err) {
    console.error("Roster list fetch error:", err);
    return {
      rosters: [],
      error: "Could not load rosters. System might be offline.",
    };
  }
};

const FlightsPage = () => {
  const navigate = useNavigate();

  const loaderData = useLoaderData() || {};
  const rosters = loaderData.rosters || [];
  const error = loaderData.error || null;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRosters = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return rosters.filter((roster) => {
      const fNum = roster.flightNumber || "";
      return fNum.toLowerCase().includes(searchLower);
    });
  }, [rosters, searchTerm]);

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
            Active Rosters
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Select a scheduled flight to view its roster.
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
          {filteredRosters.map((roster) => {
            const stableKey =
              roster.id || `${roster.flightNumber}-${roster.dateTime}`;

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
                      {roster.flightNumber || "Unknown Flight"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {roster.sourceAirportCode || "IST"} ➔{" "}
                      {roster.destinationAirportCode || "DEST"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                  <Stack spacing={0.5}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarMonthIcon fontSize="small" color="action" />
                      <Typography variant="body2" fontWeight="500">
                        {roster.dateTime
                          ? new Date(roster.dateTime).toLocaleDateString(
                              "tr-TR"
                            )
                          : "Scheduled"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AirplanemodeActiveIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {roster.vehicleType?.modelName || "Unknown Aircraft"}
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
                    onClick={() => handleManageRoster(roster.flightNumber)}
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

          {!error && filteredRosters.length === 0 && (
            <Box sx={{ textAlign: "center", py: 5, opacity: 0.7 }}>
              <FlightTakeoffIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {rosters.length === 0
                  ? "No active rosters found."
                  : `No rosters matching "${searchTerm}"`}
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default FlightsPage;
