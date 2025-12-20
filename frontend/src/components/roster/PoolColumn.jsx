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
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const PoolColumn = ({ pool, flightVehicle, onAssign }) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "1rem",
        }}
      >
        <PersonIcon /> Personnel Pool
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "70vh",
        }}
      >
        {/* Pilot Havuzu */}
        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{ mt: 1, color: "#c62828", display: "block" }}
        >
          AVAILABLE PILOTS
        </Typography>
        <List dense>
          {pool.pilots.map((pilot) => (
            <ListItem key={pilot.id} divider disablePadding sx={{ py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor:
                      pilot.vehicle === flightVehicle ? "#4caf50" : "#bdbdbd",
                    width: 32,
                    height: 32,
                    fontSize: "0.8rem",
                  }}
                >
                  P
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {pilot.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" noWrap>
                    {pilot.seniority}
                  </Typography>
                }
              />
              <IconButton
                edge="end"
                color="primary"
                onClick={() => onAssign(pilot, "pilots")}
                size="small"
              >
                <AddCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        {/* Kabin Havuzu */}
        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{ mt: 2, color: "#ef6c00", display: "block" }}
        >
          AVAILABLE CABIN CREW
        </Typography>
        <List dense>
          {pool.cabin.map((crew) => (
            <ListItem key={crew.id} divider disablePadding sx={{ py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#ff9800",
                    width: 32,
                    height: 32,
                    fontSize: "0.8rem",
                  }}
                >
                  C
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {crew.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" noWrap>
                    {crew.attendantType}
                  </Typography>
                }
              />
              <IconButton
                edge="end"
                color="primary"
                onClick={() => onAssign(crew, "cabin")}
                size="small"
              >
                <AddCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default PoolColumn;
