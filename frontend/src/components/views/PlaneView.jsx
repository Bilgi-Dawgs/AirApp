import React, { useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Tooltip,
  Divider,
  Avatar,
} from "@mui/material";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const parseLayout = (layoutString) => {
  if (!layoutString) return [2, 2];
  return layoutString.split("-").map(Number);
};

const getSeatLetter = (index) => String.fromCharCode(65 + index);

const PlaneView = ({ people, vehicle }) => {
  const cabinCrew = people.filter((p) => p.type === "CABIN_CREW");
  const pilots = people.filter((p) => p.type === "PILOT");
  const passengers = people.filter((p) => p.type === "PASSENGER");

  const seatMap = useMemo(() => {
    const map = {};
    passengers.forEach((p) => {
      if (p.seatNumber) {
        map[p.seatNumber] = p;
      }
    });
    return map;
  }, [passengers]);

  const seatPlan = vehicle?.seatPlan || {};

  const businessConfig = seatPlan.business || { layout: "2-2", rows: [] };
  const businessLayout = parseLayout(businessConfig.layout);
  const businessSeatsPerRow = businessLayout.reduce((a, b) => a + b, 0);

  const economyConfig = seatPlan.economy || { layout: "3-3", range: [0, 0] };
  const economyLayout = parseLayout(economyConfig.layout);
  const economySeatsPerRow = economyLayout.reduce((a, b) => a + b, 0);

  const economyRows = [];

  let startRow = 0;
  let endRow = 0;

  if (
    economyConfig.range &&
    typeof economyConfig.range === "object" &&
    !Array.isArray(economyConfig.range)
  ) {
    startRow = economyConfig.range.startRow;
    endRow = economyConfig.range.endRow;
  } else if (
    Array.isArray(economyConfig.range) &&
    economyConfig.range.length === 2
  ) {
    startRow = economyConfig.range[0];
    endRow = economyConfig.range[1];
  }

  if (startRow > 0 && endRow >= startRow) {
    for (let i = startRow; i <= endRow; i++) {
      economyRows.push(i);
    }
  }

  const Seat = ({ visualId, backendId, type }) => {
    const occupant = seatMap[backendId];
    const isBusiness = type === "business";
    let bgColor = isBusiness ? "#e8eaf6" : "#e3f2fd";

    if (occupant) {
      bgColor = isBusiness ? "#1a237e" : "#0288d1";
    }

    const tooltipContent = occupant ? (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {occupant.name}
        </Typography>
        <Typography variant="caption" display="block">
          Seat: {visualId} (ID: {backendId})
        </Typography>
      </Box>
    ) : (
      `Empty (${visualId})`
    );

    return (
      <Tooltip title={tooltipContent} arrow placement="top">
        <Box
          sx={{
            width: isBusiness ? 48 : 36,
            height: isBusiness ? 54 : 42,
            bgcolor: bgColor,
            m: 0.5,
            borderRadius: "8px 8px 12px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: occupant ? "#fff" : "#9e9e9e",
            cursor: "pointer",
            border: occupant ? "none" : "1px solid #cfd8dc",
            fontSize: "0.65rem",
            fontWeight: "bold",
            "&:hover": { transform: "scale(1.1)", zIndex: 10 },
          }}
        >
          {isBusiness ? (
            <AirlineSeatReclineExtraIcon fontSize="small" />
          ) : (
            <AirlineSeatReclineNormalIcon fontSize="small" />
          )}
          <span>{visualId}</span>
        </Box>
      </Tooltip>
    );
  };

  const renderRow = (rowNum, layoutGroups, cumulativeSeats, type, prefix) => {
    let currentSeatInRowIndex = 0;

    return (
      <Box key={rowNum} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ width: 20, textAlign: "center", color: "#999", mr: 1 }}
        >
          {rowNum}
        </Typography>

        {layoutGroups.map((groupSize, groupIndex) => {
          const seatsInGroup = [];
          for (let i = 0; i < groupSize; i++) {
            const letter = getSeatLetter(currentSeatInRowIndex);

            const seatNumber = cumulativeSeats + currentSeatInRowIndex + 1;
            const backendId = `${prefix}${seatNumber}`;
            const visualId = `${rowNum}${letter}`;

            seatsInGroup.push(
              <Seat
                key={visualId}
                visualId={visualId}
                backendId={backendId}
                type={type}
              />
            );
            currentSeatInRowIndex++;
          }

          return (
            <React.Fragment key={groupIndex}>
              <Box sx={{ display: "flex" }}>{seatsInGroup}</Box>
              {groupIndex < layoutGroups.length - 1 && (
                <Box
                  sx={{
                    width: 30,
                    textAlign: "center",
                    userSelect: "none",
                    color: "#eceff1",
                    fontSize: "0.7rem",
                  }}
                >
                  |
                </Box>
              )}
            </React.Fragment>
          );
        })}
        <Typography
          variant="caption"
          sx={{ width: 20, textAlign: "center", color: "#999", ml: 1 }}
        >
          {rowNum}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 300,
          py: 3,
          borderRadius: "150px 150px 20px 20px",
          bgcolor: "#37474f",
          color: "white",
          textAlign: "center",
          mb: 1,
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.7 }}>
          COCKPIT
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
          {pilots.map((p) => (
            <Tooltip key={p.id} title={`${p.seniority}: ${p.name}`}>
              <Avatar
                sx={{
                  bgcolor: "#d32f2f",
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                }}
              >
                PLT
              </Avatar>
            </Tooltip>
          ))}
        </Box>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          bgcolor: "#fff",
          px: 4,
          py: 4,
          borderRadius: "30px",
          border: "4px solid #cfd8dc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 320,
        }}
      >
        <Box
          sx={{
            width: "100%",
            mb: 3,
            p: 1,
            bgcolor: "#fff3e0",
            borderRadius: 2,
            border: "1px dashed #ffb74d",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" color="warning.main" fontWeight="bold">
            CABIN CREW
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}
          >
            {cabinCrew.map((c) => (
              <Tooltip key={c.id} title={`${c.attendantType}: ${c.name}`}>
                <Avatar
                  sx={{
                    bgcolor: "#ef6c00",
                    width: 32,
                    height: 32,
                    fontSize: "0.75rem",
                  }}
                >
                  CC
                </Avatar>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {businessConfig.rows.length > 0 && (
          <>
            <Typography variant="overline" color="primary" fontWeight="bold">
              Business Class
            </Typography>
            <Box sx={{ mb: 2 }}>
              {businessConfig.rows.map((rowNum, index) => {
                const seatsBefore = index * businessSeatsPerRow;
                return renderRow(
                  rowNum,
                  businessLayout,
                  seatsBefore,
                  "business",
                  "B"
                );
              })}
            </Box>
          </>
        )}

        <Box
          sx={{ width: "100%", display: "flex", alignItems: "center", my: 2 }}
        >
          <Divider sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={{ mx: 2, color: "#999" }}>
            ECONOMY START
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        {economyRows.length > 0 && (
          <>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight="bold"
            >
              Economy Class
            </Typography>
            <Box>
              {economyRows.map((rowNum, index) => {
                const seatsBefore = index * economySeatsPerRow;
                return renderRow(
                  rowNum,
                  economyLayout,
                  seatsBefore,
                  "economy",
                  "E"
                );
              })}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PlaneView;
