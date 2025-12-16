import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FlightIcon from "@mui/icons-material/Flight";
import SaveIcon from "@mui/icons-material/Save";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AirlinesIcon from "@mui/icons-material/Airlines";

import PoolColumn from "../components/roster/PoolColumn";
import AssignedColumn from "../components/roster/AssignedColumn";
import PassengerColumn from "../components/roster/PassengerColumn";
import SaveRosterDialog from "../components/roster/SaveRosterDialog";

import {
  mockAvailableCrew,
  mockAutoAssignedPassengers,
  mockFlightDetails,
  mockAvailableFlights,
} from "../data/mockData";

const RosterWorkbench = () => {
  const { flightNumber } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [assignedCrew, setAssignedCrew] = useState({ pilots: [], cabin: [] });
  const [passengers, setPassengers] = useState([]);
  const [pool, setPool] = useState(mockAvailableCrew);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  useEffect(() => {
    if (flightNumber) {
      setFlight(mockFlightDetails(flightNumber));
      setAssignedCrew({ pilots: [], cabin: [] });
      setPool(mockAvailableCrew);
      setPassengers(mockAutoAssignedPassengers);
    } else {
      setFlight(null);
    }
  }, [flightNumber]);

  const handleSelectFlight = (id) => {
    navigate(`/workbench/${id}`);
  };

  const handleAssign = (person, role) => {
    setPool((prev) => ({
      ...prev,
      [role]: prev[role].filter((p) => p.id !== person.id),
    }));
    setAssignedCrew((prev) => ({ ...prev, [role]: [...prev[role], person] }));
  };

  const handleUnassign = (person, role) => {
    setAssignedCrew((prev) => ({
      ...prev,
      [role]: prev[role].filter((p) => p.id !== person.id),
    }));
    setPool((prev) => ({ ...prev, [role]: [...prev[role], person] }));
  };

  const handleAutoAssign = () => {
    if (!flight) return;
    const validPilots = pool.pilots.filter((p) => p.vehicle === flight.vehicle);
    const pilotsNeeded = 2 - assignedCrew.pilots.length;
    const cabinNeeded = 4 - assignedCrew.cabin.length;
    const takePilots = pilotsNeeded > 0 ? pilotsNeeded : 0;
    const takeCabin = cabinNeeded > 0 ? cabinNeeded : 0;

    if (
      (takePilots > 0 && validPilots.length > 0) ||
      (takeCabin > 0 && pool.cabin.length > 0)
    ) {
      const newPilots = validPilots.slice(0, takePilots);
      const newCabin = pool.cabin.slice(0, takeCabin);
      setAssignedCrew((prev) => ({
        pilots: [...prev.pilots, ...newPilots],
        cabin: [...prev.cabin, ...newCabin],
      }));
      setPool((prev) => ({
        pilots: prev.pilots.filter((p) => !newPilots.includes(p)),
        cabin: prev.cabin.filter((p) => !newCabin.includes(p)),
      }));
    }
  };

  const handleConfirmSave = (dbChoice) => {
    console.log(`Saving to ${dbChoice.toUpperCase()}...`);
    setOpenSaveDialog(false);
    alert(`Roster successfully saved to ${dbChoice.toUpperCase()} database!`);
  };

  // =========================================================
  // VIEW: FLIGHT SELECTION LIST (RESPONSIVE)
  // =========================================================
  if (!flight) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f2f5",
          py: 5,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            maxWidth: 900,
            width: "95%",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#0a1929"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
            >
              Start New Roster
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select a scheduled flight to begin crew assignment.
            </Typography>
          </Box>

          {/* --- DESKTOP VIEW (TABLE) --- */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                      Flight No
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                      Route / Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                      Vehicle
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockAvailableFlights.map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <FlightTakeoffIcon color="primary" fontSize="small" />
                          <Typography fontWeight="bold">{row.id}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {row.route}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.vehicle}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleSelectFlight(row.id)}
                          sx={{
                            textTransform: "none",
                            borderRadius: 20,
                            bgcolor: "#0a1929",
                          }}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* --- MOBILE VIEW (CARDS) --- */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Stack spacing={2}>
              {mockAvailableFlights.map((row) => (
                <Card
                  key={row.id}
                  variant="outlined"
                  sx={{ borderRadius: 2, bgcolor: "#fafafa" }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FlightTakeoffIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                          {row.id}
                        </Typography>
                      </Box>
                      <Chip
                        label={row.vehicle}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AirlinesIcon fontSize="small" color="action" />
                        <Typography variant="body2" fontWeight="bold">
                          {row.route}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CalendarMonthIcon fontSize="small" color="action" />
                        <Typography variant="caption">{row.date}</Typography>
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleSelectFlight(row.id)}
                      sx={{ bgcolor: "#0a1929", borderRadius: 2 }}
                    >
                      Select Flight
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Box>
    );
  }

  // --- WORKBENCH VIEW --- (Aynı kaldı)
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", pb: 10 }}>
      {/* HEADER */}
      <Paper
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          mb: 3,
          borderBottom: "1px solid #e0e0e0",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            width: "100%",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}>
              <FlightIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Building Roster: {flight.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vehicle: <b>{flight.vehicle}</b> | Min 2 Pilots, Min 4 Cabin
              </Typography>
            </Box>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AutoFixHighIcon />}
              onClick={handleAutoAssign}
              sx={{ flex: 1, whiteSpace: "nowrap" }}
            >
              Auto Assign
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={() => setOpenSaveDialog(true)}
              disabled={assignedCrew.pilots.length < 2}
              sx={{ flex: 1, whiteSpace: "nowrap" }}
            >
              Save Roster
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* COLUMNS */}
      <Box
        sx={{ px: { xs: 2, md: 3 }, width: "100%", boxSizing: "border-box" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          <Box sx={{ flex: 3, minWidth: 0 }}>
            <PoolColumn
              pool={pool}
              flightVehicle={flight.vehicle}
              onAssign={handleAssign}
            />
          </Box>
          <Box sx={{ flex: 4, minWidth: 0 }}>
            <AssignedColumn
              assignedCrew={assignedCrew}
              onUnassign={handleUnassign}
            />
          </Box>
          <Box sx={{ flex: 5, minWidth: 0 }}>
            <PassengerColumn passengers={passengers} />
          </Box>
        </Box>
      </Box>

      {/* DIALOG */}
      <SaveRosterDialog
        open={openSaveDialog}
        onClose={() => setOpenSaveDialog(false)}
        onConfirm={handleConfirmSave}
      />
    </Box>
  );
};

export default RosterWorkbench;
