import React from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const AssignedColumn = ({ assignedCrew, onUnassign }) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        border: "2px solid #1976d2",
        backgroundColor: "#f0f7ff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
      >
        <BadgeIcon /> Assigned Crew
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "70vh" }}>
        {assignedCrew.pilots.length === 0 &&
          assignedCrew.cabin.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No crew assigned yet.
            </Alert>
          )}

        {assignedCrew.pilots.length > 0 && (
          <>
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{ color: "#1565c0", display: "block" }}
            >
              FLIGHT CREW
            </Typography>
            <List dense>
              {assignedCrew.pilots.map((pilot) => (
                <ListItem
                  key={pilot.id}
                  sx={{
                    bgcolor: "white",
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <ListItemText
                    primary={pilot.name}
                    secondary={pilot.seniority}
                  />
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => onUnassign(pilot, "pilots")}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {assignedCrew.cabin.length > 0 && (
          <>
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{ mt: 2, color: "#1565c0", display: "block" }}
            >
              CABIN CREW
            </Typography>
            <List dense>
              {assignedCrew.cabin.map((crew) => (
                <ListItem
                  key={crew.id}
                  sx={{
                    bgcolor: "white",
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <ListItemText
                    primary={crew.name}
                    secondary={crew.attendantType}
                  />
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => onUnassign(crew, "cabin")}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>

      {/* Validation */}
      <Box sx={{ mt: "auto", pt: 2 }}>
        {assignedCrew.pilots.length < 2 && (
          <Alert severity="warning">Req: Min 2 Pilots</Alert>
        )}
      </Box>
    </Paper>
  );
};

export default AssignedColumn;
