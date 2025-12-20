import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
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
  Alert,
  CircularProgress,
} from "@mui/material";

// Icons
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FlightIcon from "@mui/icons-material/Flight";
import SaveIcon from "@mui/icons-material/Save";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { rosterApi } from "../api/axiosInstance";
import PoolColumn from "../components/roster/PoolColumn";
import AssignedColumn from "../components/roster/AssignedColumn";
import PassengerColumn from "../components/roster/PassengerColumn";
import SaveRosterDialog from "../components/roster/SaveRosterDialog";

// --- LOADER ---
export const workbenchLoader = async () => {
  try {
    const response = await rosterApi.get("available-flights");
    return { availableFlights: response.data || [], error: null };
  } catch (err) {
    console.error("Flights fetch error:", err);
    return {
      availableFlights: [],
      error: "Could not load flights. System might be offline.",
    };
  }
};

const RosterWorkbench = () => {
  const { flightNumber } = useParams();
  const navigate = useNavigate();

  const loaderData = useLoaderData() || {};
  const availableFlights = loaderData.availableFlights || [];
  const loadError = loaderData.error;

  // --- STATE ---
  const [flight, setFlight] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [assignedCrew, setAssignedCrew] = useState({ pilots: [], cabin: [] });
  const [passengers, setPassengers] = useState([]);
  const [pool, setPool] = useState({ pilots: [], cabin: [] });
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  // --- INIT & DATA FETCHING ---
  useEffect(() => {
    const fetchFlightDetails = async (flightData) => {
      setLoadingDetails(true);
      try {
        const [crewRes, passRes] = await Promise.all([
          rosterApi.get(`pool/${flightData.flightNumber}`),
          rosterApi.get(`passengers/${flightData.flightNumber}`),
        ]);

        const rawCrew = crewRes.data || [];
        const mappedCrew = rawCrew.map((p) => ({
          ...p,
          id: p.personId,
        }));

        const pilots = mappedCrew.filter((p) => p.type === "PILOT");
        const cabin = mappedCrew.filter((p) => p.type === "CABIN_CREW");

        setPool({ pilots, cabin });
        setPassengers(passRes.data || []);
      } catch (err) {
        console.error("Error fetching crew/passengers:", err);
        setPool({ pilots: [], cabin: [] });
        setPassengers([]);
      } finally {
        setLoadingDetails(false);
      }
    };

    if (flightNumber) {
      const selectedWrapper = availableFlights.find(
        (item) => item.flightNumber === flightNumber
      );

      if (selectedWrapper) {
        setFlight(selectedWrapper);
        setAssignedCrew({ pilots: [], cabin: [] });
        fetchFlightDetails(selectedWrapper);
      } else {
        setFlight(null);
      }
    } else {
      setFlight(null);
    }
  }, [flightNumber, availableFlights]);

  // --- HANDLERS ---
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

    const targetVehicle = (flight.vehicleType?.modelName || "").trim();

    // ---- PILOTS ----
    const validPilots = pool.pilots.filter((p) => {
      if (!p.pilotVehicleRestriction) return false;
      return p.pilotVehicleRestriction === targetVehicle;
    });

    // ---- CABIN ----
    const validCabin = pool.cabin.filter((c) => {
      const restrictions = c.vehicleRestrictions;

      if (!Array.isArray(restrictions) || restrictions.length === 0) {
        return false;
      }

      return restrictions.includes(targetVehicle);
    });

    const pilotsNeeded = flight.requiredPilots ?? 2;
    const cabinNeeded = flight.requiredAttendants ?? 4;

    const takePilots = Math.max(0, pilotsNeeded - assignedCrew.pilots.length);
    const takeCabin = Math.max(0, cabinNeeded - assignedCrew.cabin.length);

    if (takePilots === 0 && takeCabin === 0) {
      alert("Crew already complete.");
      return;
    }

    if (
      (takePilots > 0 && validPilots.length < takePilots) ||
      (takeCabin > 0 && validCabin.length < takeCabin)
    ) {
      alert("Not enough compatible crew found.");
      return;
    }

    const newPilots = validPilots.slice(0, takePilots);
    const newCabin = validCabin.slice(0, takeCabin);

    setAssignedCrew((prev) => ({
      pilots: [...prev.pilots, ...newPilots],
      cabin: [...prev.cabin, ...newCabin],
    }));

    const assignedIds = [
      ...newPilots.map((p) => p.id),
      ...newCabin.map((c) => c.id),
    ];

    setPool((prev) => ({
      pilots: prev.pilots.filter((p) => !assignedIds.includes(p.id)),
      cabin: prev.cabin.filter((c) => !assignedIds.includes(c.id)),
    }));
  };

  const handleConfirmSave = async (dbChoice) => {
    const hasSeniorPilot = assignedCrew.pilots.some(
      (p) => p.seniority === "SENIOR"
    );

    if (!hasSeniorPilot) {
      alert("At least one SENIOR pilot must be assigned.");
      return;
    }

    // CABIN BREAKDOWN
    const seniorAttendants = assignedCrew.cabin.filter(
      (c) => c.seniority === "SENIOR"
    ).length;

    const juniorAttendants = assignedCrew.cabin.filter(
      (c) => c.seniority === "JUNIOR" || c.seniority === "TRAINEE"
    ).length;

    const chefAttendants = assignedCrew.cabin.filter(
      (c) => c.attendantType === "CHIEF"
    ).length;

    try {
      const manualPilotIds = assignedCrew.pilots.map((p) => String(p.id));
      const manualCrewIds = assignedCrew.cabin.map((c) => String(c.id));

      const requestPayload = {
        storageType: dbChoice,
        seniorAttendants,
        juniorAttendants,
        chefAttendants,
        manualPilotIds,
        manualCrewIds,
      };

      setOpenSaveDialog(false);
      const response = await rosterApi.generate(flightNumber, requestPayload);

      if (response.status === 201 || response.status === 200) {
        alert(`Roster successfully saved to ${dbChoice.toUpperCase()}!`);
        navigate(`/view/${flightNumber}`);
      }
    } catch (err) {
      console.error("Generation failed:", err);

      const backendErrorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        "Unknown validation error";

      const finalMessage =
        typeof backendErrorMsg === "object"
          ? JSON.stringify(backendErrorMsg)
          : backendErrorMsg;

      alert(`Generation failed: ${finalMessage}`);
    }
  };

  // --- VIEW RENDERING (UNCHANGED UI) ---
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
            >
              Start New Roster
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select a scheduled flight to begin crew assignment.
            </Typography>
          </Box>
          {loadError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loadError}
            </Alert>
          )}

          {/* FLIGHT SELECTION TABLE */}
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
                  {availableFlights.length === 0 && !loadError && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No flights available.
                      </TableCell>
                    </TableRow>
                  )}
                  {availableFlights.map((row) => {
                    const raw = row;
                    const flightId = row.flightNumber ?? `flight-${index}`;
                    const src = raw.sourceAirportCode || "?";
                    const dest = raw.destinationAirportCode || "?";
                    const vehicle =
                      raw.vehicleType?.modelName?.replace("_", " ") ||
                      "Aircraft";
                    const dateStr = raw.dateTime
                      ? new Date(raw.dateTime).toLocaleDateString()
                      : "N/A";

                    return (
                      <TableRow key={flightId} hover>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <FlightTakeoffIcon
                              color="primary"
                              fontSize="small"
                            />
                            <Typography fontWeight="bold">
                              {flightId}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">
                            {src} - {dest}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {dateStr}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={vehicle}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => handleSelectFlight(flightId)}
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
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* MOBILE VIEW */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            {availableFlights.length === 0 && (
              <Typography align="center">No flights.</Typography>
            )}
            <Stack spacing={2}>
              {availableFlights.map((row) => {
                const raw = row;
                return (
                  <Card key={raw.flightNumber} variant="outlined">
                    <CardContent>
                      <Typography fontWeight="bold">
                        {raw.flightNumber}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleSelectFlight(raw.flightNumber)}
                        sx={{ mt: 2 }}
                      >
                        Select
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        </Paper>
      </Box>
    );
  }

  // --- WORKBENCH UI ---
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", pb: 10 }}>
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
                Building Roster: {flight.flightNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vehicle:{" "}
                <b>{flight.vehicleType?.modelName?.replace("_", " ")}</b> |{" "}
                {flight.sourceAirportCode} - {flight.destinationAirportCode}
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
              disabled={loadingDetails}
            >
              Auto Assign
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={() => setOpenSaveDialog(true)}
              disabled={assignedCrew.pilots.length < 2 || loadingDetails}
              sx={{ flex: 1, whiteSpace: "nowrap" }}
            >
              Save Roster
            </Button>
          </Stack>
        </Box>
      </Paper>

      {loadingDetails ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2, mt: 1 }}>
            Fetching crew & passengers...
          </Typography>
        </Box>
      ) : (
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
                flightVehicle={flight.vehicleType?.modelName}
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
      )}

      <SaveRosterDialog
        open={openSaveDialog}
        onClose={() => setOpenSaveDialog(false)}
        onConfirm={handleConfirmSave}
      />
    </Box>
  );
};

export default RosterWorkbench;
