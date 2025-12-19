import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FlightsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  const allRosters = [
    {
      id: "TK1905",
      route: "IST - LHR",
      date: "2025-10-30",
      status: "Completed",
      type: "Boeing 737",
    },
    {
      id: "TK2023",
      route: "IST - JFK",
      date: "2025-10-31",
      status: "In Progress",
      type: "Airbus A330",
    },
    {
      id: "LH404",
      route: "FRA - JFK",
      date: "2025-11-01",
      status: "Draft",
      type: "Boeing 747",
    },
    {
      id: "BA101",
      route: "LHR - JFK",
      date: "2025-11-02",
      status: "Published",
      type: "Boeing 777",
    },
  ];

  const filteredRosters = allRosters.filter((roster) =>
    roster.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRoster = (flightNumber) => {
    navigate(`/view/${flightNumber}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5", py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#0a1929"
            sx={{ mb: 1 }}
          >
            Find Flight Roster
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Search by flight number to manage operations.
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
              placeholder="Enter Flight Number (e.g. TK1905)..."
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
            <Button
              variant="contained"
              sx={{
                borderRadius: "50px",
                px: 4,
                py: 1,
                backgroundColor: "#0a1929",
                textTransform: "none",
              }}
            >
              Search
            </Button>
          </Paper>
        </Box>

        <Stack spacing={2}>
          {filteredRosters.map((roster) => (
            <Paper
              key={roster.id}
              elevation={2}
              sx={{
                p: 2.5,
                borderRadius: 3,
                borderLeft: `6px solid ${
                  roster.status === "Completed" ? "#2e7d32" : "#ed6c02"
                }`,
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
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <Box
                  sx={{ p: 1.5, backgroundColor: "#eef2f6", borderRadius: 2 }}
                >
                  <FlightTakeoffIcon color="action" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#0a1929">
                    {roster.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {roster.route}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  textAlign: { xs: "left", md: "center" },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", md: "center" },
                    gap: 1,
                  }}
                >
                  <CalendarMonthIcon fontSize="small" /> {roster.date}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#666", display: "block" }}
                >
                  {roster.type}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: { xs: "100%", md: "auto" },
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Chip
                  label={roster.status}
                  size="small"
                  color={roster.status === "Completed" ? "success" : "warning"}
                  variant="filled"
                  sx={{ fontWeight: "bold", minWidth: "80px" }}
                />

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", md: "block" } }}
                />

                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewRoster(roster.id)}
                  sx={{
                    backgroundColor: "#0a1929",
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 3,
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  View Roster
                </Button>
              </Box>
            </Paper>
          ))}

          {filteredRosters.length === 0 && (
            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
              No flight roster found matching "{searchTerm}"
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default FlightsPage;
