import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const ExtendedView = ({ people }) => {
  const pilots = people.filter((p) => p.type === "Pilot");
  const cabinCrew = people.filter((p) => p.type === "Cabin Crew");
  const passengers = people.filter((p) => p.type === "Passenger");

  return (
    <Grid container spacing={3}>
      {/* 1. FLIGHT CREW TABLE */}
      <Grid item xs={12}>
        <Paper
          sx={{ p: 0, overflow: "hidden", borderTop: "4px solid #d32f2f" }}
        >
          <Box sx={{ p: 2, bgcolor: "#ffebee" }}>
            <Typography variant="h6" color="error.main" fontWeight="bold">
              Flight Crew (Pilots)
            </Typography>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Seniority Level</TableCell>
                  <TableCell>Allowed Vehicle</TableCell>
                  <TableCell>Nationality</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pilots.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell fontWeight="bold">{p.name}</TableCell>
                    <TableCell>{p.seniority}</TableCell>
                    <TableCell>{p.vehicle}</TableCell>
                    <TableCell>
                      {p.nationality} ({p.age}y)
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* 2. CABIN CREW TABLE */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 0,
            overflow: "hidden",
            borderTop: "4px solid #ed6c02",
            height: "100%",
          }}
        >
          <Box sx={{ p: 2, bgcolor: "#fff3e0" }}>
            <Typography variant="h6" color="warning.main" fontWeight="bold">
              Cabin Crew
            </Typography>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Attendant Type</TableCell>
                  <TableCell>Details / Recipes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cabinCrew.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={c.role}
                        size="small"
                        color={c.role === "Chef" ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      {c.role === "Chef" && c.recipes ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <RestaurantMenuIcon fontSize="small" color="action" />
                          <Typography variant="caption">
                            {c.recipes.join(", ")}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Standard Service
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* 3. PASSENGER TABLE */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 0,
            overflow: "hidden",
            borderTop: "4px solid #1976d2",
            height: "100%",
          }}
        >
          <Box sx={{ p: 2, bgcolor: "#e3f2fd" }}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              Passengers
            </Typography>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Seat</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {passengers.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <b>{p.seat}</b>
                    </TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.role}</TableCell>
                    <TableCell>
                      {p.nationality}, {p.age}y
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ExtendedView;
