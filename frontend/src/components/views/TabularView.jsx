import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Stack,
  useTheme, // Theme hook eklendi
} from "@mui/material";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import FlightIcon from "@mui/icons-material/Flight";
import WorkIcon from "@mui/icons-material/Work";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const TabularView = ({ people }) => {
  const [filterType, setFilterType] = useState("ALL");
  const theme = useTheme();

  const filteredPeople = people.filter((person) => {
    if (filterType === "ALL") return true;
    if (filterType === "INFANT") return person.isInfant;
    return person.type === filterType;
  });

  const getRoleConfig = (type) => {
    switch (type) {
      case "PILOT":
        return { color: "error", label: "Pilot", icon: <FlightIcon /> };
      case "CABIN_CREW":
        return { color: "warning", label: "Crew", icon: <WorkIcon /> };
      case "PASSENGER":
        return { color: "primary", label: "Passenger", icon: <PersonIcon /> };
      default:
        return { color: "grey", label: "Unknown", icon: <PersonIcon /> };
    }
  };

  const getParentName = (parentId) => {
    if (!parentId) return "Parent";
    const parent = people.find((p) => p.personId === parentId);
    return parent ? parent.name : "Travelling with Parent";
  };

  const renderDetails = (person) => {
    if (person.isInfant) {
      const parentLabel = getParentName(person.parentId);
      return (
        <Chip
          icon={<ChildCareIcon />}
          label={`Infant (w/ ${parentLabel})`}
          size="small"
          color="secondary"
          variant="outlined"
        />
      );
    }

    if (person.type === "PILOT") {
      return (
        <Typography variant="body2" fontWeight="bold" color="text.secondary">
          {person.seniority}
        </Typography>
      );
    }

    if (person.type === "CABIN_CREW") {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          {person.attendantType === "CHEF" && (
            <Chip
              label="CHEF"
              size="small"
              color="success"
              sx={{ height: 20, fontSize: "0.65rem" }}
            />
          )}
          <Typography variant="body2" color="text.secondary">
            {person.seniority || person.attendantType}
          </Typography>
        </Stack>
      );
    }

    if (person.type === "PASSENGER") {
      return (
        <Chip
          label={person.seatType === "BUSINESS" ? "Business" : "Economy"}
          size="small"
          variant={person.seatType === "BUSINESS" ? "filled" : "outlined"}
          color={person.seatType === "BUSINESS" ? "primary" : "default"}
          sx={{ height: 24 }}
        />
      );
    }
    return "-";
  };

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Paper sx={{ mb: 2, borderRadius: 2 }}>
        <Tabs
          value={filterType}
          onChange={(e, v) => setFilterType(v)}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label={`All (${people.length})`} value="ALL" />
          <Tab label="Pilots" value="PILOT" />
          <Tab label="Cabin Crew" value="CABIN_CREW" />
          <Tab label="Passengers" value="PASSENGER" />
          <Tab
            label="Infants"
            value="INFANT"
            icon={<ChildCareIcon fontSize="small" />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* TABLO */}
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 2, maxHeight: 600 }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Avatar
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Full Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Seat No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Details
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Nationality
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPeople.map((person) => {
              const config = getRoleConfig(person.type);

              return (
                <TableRow
                  key={person.id || person.personId}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      sx={{
                        bgcolor: (theme) =>
                          theme.palette[config.color]?.main ||
                          theme.palette.grey[500],
                        width: 32,
                        height: 32,
                        fontSize: "0.9rem",
                      }}
                    >
                      {person.name.charAt(0)}
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {person.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {person.personId}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      icon={config.icon}
                      label={config.label}
                      color={config.color}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>

                  <TableCell>
                    {person.seatNumber ? (
                      <Chip
                        label={person.seatNumber}
                        size="small"
                        sx={{ fontWeight: "bold", minWidth: 40 }}
                      />
                    ) : (
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        fontStyle="italic"
                      >
                        {person.isInfant ? "Lap" : "Unassigned"}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>{renderDetails(person)}</TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {person.nationality || "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredPeople.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <Typography variant="body1" color="text.secondary">
                    No records found for this category.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TabularView;
