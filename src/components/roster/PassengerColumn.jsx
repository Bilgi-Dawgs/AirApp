import React from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Alert,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const PassengerColumn = ({ passengers }) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        border: "2px solid #7b1fa2",
        backgroundColor: "#f3e5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#7b1fa2",
        }}
      >
        <GroupIcon /> Passenger Manifest
      </Typography>

      <Alert
        severity="success"
        icon={<CheckCircleIcon fontSize="inherit" />}
        sx={{ mb: 2, py: 0 }}
      >
        Auto-assigned by Main System
      </Alert>

      <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "70vh" }}>
        <List dense>
          {passengers.map((pax) => (
            <ListItem
              key={pax.id}
              sx={{ bgcolor: "white", mb: 1, borderRadius: 1, boxShadow: 1 }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: pax.class === "Business" ? "#1a237e" : "#0288d1",
                    width: 50,
                    height: 30,
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}
                >
                  {pax.seat}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight="bold" noWrap>
                    {pax.name}
                  </Typography>
                }
                secondary={pax.class}
              />

              <AirlineSeatReclineNormalIcon color="action" fontSize="small" />
            </ListItem>
          ))}

          {passengers.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 5 }}
            >
              No passengers found.
            </Typography>
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default PassengerColumn;

