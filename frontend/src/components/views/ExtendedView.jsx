import React, { useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Stack,
  Grid,
} from "@mui/material";

// Icons
import FlightIcon from "@mui/icons-material/Flight";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BadgeIcon from "@mui/icons-material/Badge";

// --- CONSTANTS & HELPERS ---

const PERSON_TYPES = {
  PILOT: "PILOT",
  CABIN_CREW: "CABIN_CREW",
  PASSENGER: "PASSENGER",
};

const getAvatarLetter = (name) => {
  return name && name.length > 0 ? name.charAt(0) : "?";
};

const EmptyRow = ({ colSpan, msg }) => (
  <TableRow>
    <TableCell colSpan={colSpan} align="center" sx={{ py: 3 }}>
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        {msg}
      </Typography>
    </TableCell>
  </TableRow>
);

const PilotTable = ({ pilots }) => (
  <TableContainer
    component={Paper}
    elevation={2}
    sx={{ mb: 4, borderRadius: 2 }}
  >
    <Box
      sx={{
        p: 2,
        bgcolor: "#ffebee",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <FlightIcon color="error" />
      <Typography variant="h6" color="error.main" fontWeight="bold">
        Flight Crew (Pilots)
      </Typography>
    </Box>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Seniority</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>License Range</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Vehicle Restriction</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pilots.map((pilot, index) => (
          <TableRow key={pilot.personId || `pilot-${index}`} hover>
            <TableCell>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "error.main",
                    fontSize: "0.7rem",
                  }}
                >
                  {getAvatarLetter(pilot.name)}
                </Avatar>
                <Typography variant="body2" fontWeight="bold">
                  {pilot.name || "Unknown Pilot"}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Chip
                label={pilot.seniority || "N/A"}
                size="small"
                color={pilot.seniority === "SENIOR" ? "error" : "default"}
                variant="outlined"
              />
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontFamily="monospace">
                {pilot.allowedRangeKm !== null &&
                pilot.allowedRangeKm !== undefined
                  ? `${pilot.allowedRangeKm.toLocaleString()} km`
                  : "Unrestricted"}
              </Typography>
            </TableCell>
            <TableCell>
              {pilot.pilotVehicleRestriction ? (
                <Chip
                  label={pilot.pilotVehicleRestriction}
                  size="small"
                  icon={<EngineeringIcon />}
                />
              ) : (
                <Typography variant="caption" color="text.secondary">
                  All Types
                </Typography>
              )}
            </TableCell>
          </TableRow>
        ))}
        {pilots.length === 0 && (
          <EmptyRow colSpan={4} msg="No pilots assigned" />
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const CrewTable = ({ crewList }) => (
  <TableContainer
    component={Paper}
    elevation={2}
    sx={{ mb: 4, borderRadius: 2 }}
  >
    <Box
      sx={{
        p: 2,
        bgcolor: "#fff3e0",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <BadgeIcon color="warning" />
      <Typography variant="h6" color="warning.main" fontWeight="bold">
        Cabin Crew
      </Typography>
    </Box>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Role (Type)</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Seniority</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Special Skills</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {crewList.map((crew, index) => (
          <TableRow key={crew.personId || `crew-${index}`} hover>
            <TableCell>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "warning.main",
                    fontSize: "0.7rem",
                  }}
                >
                  {getAvatarLetter(crew.name)}
                </Avatar>
                <Typography variant="body2" fontWeight="bold">
                  {crew.name || "Unknown Crew"}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Chip
                label={crew.attendantType || "REGULAR"}
                color={crew.attendantType === "CHIEF" ? "warning" : "default"}
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </TableCell>
            <TableCell>{crew.seniority || "-"}</TableCell>
            <TableCell>
              {crew.attendantType === "CHEF" &&
              crew.knownRecipes?.length > 0 ? (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {crew.knownRecipes.map((recipe, idx) => (
                    <Chip
                      key={idx}
                      icon={
                        <RestaurantMenuIcon
                          sx={{ fontSize: "1rem !important" }}
                        />
                      }
                      label={recipe}
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ my: 0.5 }}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography variant="caption" color="text.disabled">
                  -
                </Typography>
              )}
            </TableCell>
          </TableRow>
        ))}
        {crewList.length === 0 && (
          <EmptyRow colSpan={4} msg="No cabin crew assigned" />
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const PassengerTable = ({ passengers, parentMap }) => (
  <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
    <Box
      sx={{
        p: 2,
        bgcolor: "#e3f2fd",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <AirlineSeatReclineExtraIcon color="primary" />
      <Typography variant="h6" color="primary.main" fontWeight="bold">
        Passenger Manifest
      </Typography>
    </Box>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Seat</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Special Status</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Affiliation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {passengers.map((pax, index) => {
          let classLabel = "Unknown";
          let classColor = undefined;

          if (pax.seatType === "BUSINESS") {
            classLabel = "Business";
            classColor = "primary";
          } else if (pax.seatType === "ECONOMY") {
            classLabel = "Economy";
            classColor = undefined;
          }

          const parentName = pax.parentId
            ? parentMap.get(pax.parentId) || pax.parentId
            : "-";

          let partnerName = null;
          if (pax.affiliatedWith && pax.affiliatedWith.length > 0) {
            const partnerId = pax.affiliatedWith[0];
            partnerName = parentMap.get(partnerId) || `ID: ${partnerId}`;
          }

          return (
            <TableRow key={pax.personId || `pax-${index}`} hover>
              <TableCell>
                {pax.seatNumber ? (
                  <Chip
                    label={pax.seatNumber}
                    size="small"
                    sx={{ minWidth: 40, fontWeight: "bold" }}
                  />
                ) : (
                  <Typography variant="caption" color="text.disabled">
                    No Seat
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {pax.name || "Unknown Passenger"}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={classLabel}
                  size="small"
                  color={classColor}
                  variant={pax.seatType === "BUSINESS" ? "filled" : "outlined"}
                />
              </TableCell>
              <TableCell>
                {pax.isInfant ? (
                  <Chip
                    label="INFANT"
                    size="small"
                    color="secondary"
                    sx={{ height: 20 }}
                  />
                ) : (
                  <Typography variant="caption" color="text.disabled">
                    -
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {pax.isInfant ? (
                  <Typography variant="caption">
                    With: <b>{parentName}</b>
                  </Typography>
                ) : pax.affiliatedWith && pax.affiliatedWith.length > 0 ? (
                  <Typography variant="caption" color="text.secondary">
                    {partnerName}
                  </Typography>
                ) : (
                  <Typography variant="caption" color="text.disabled">
                    -
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          );
        })}
        {passengers.length === 0 && (
          <EmptyRow colSpan={5} msg="No passengers on manifest" />
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const ExtendedView = ({ people = [] }) => {
  const pilots = people.filter((p) => p.type === PERSON_TYPES.PILOT);
  const cabinCrew = people.filter((p) => p.type === PERSON_TYPES.CABIN_CREW);
  const passengers = people.filter((p) => p.type === PERSON_TYPES.PASSENGER);

  const parentMap = useMemo(() => {
    const map = new Map();
    people.forEach((p) => {
      if (p.personId && p.name) {
        map.set(p.personId, p.name);
      }
    });
    return map;
  }, [people]);

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Props ile veri geçişi */}
          <PilotTable pilots={pilots} />
        </Grid>
        <Grid item xs={12}>
          <CrewTable crewList={cabinCrew} />
        </Grid>
        <Grid item xs={12}>
          {/* Map prop olarak geçildi */}
          <PassengerTable passengers={passengers} parentMap={parentMap} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExtendedView;
