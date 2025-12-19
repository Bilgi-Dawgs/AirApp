import React from "react";
import { Box, Paper, Typography, Divider, Tooltip, Chip } from "@mui/material";

const PlaneView = ({ people, vehicle }) => {
  const cabinCrewList = people.filter((p) => p.type === "CABIN_CREW");
  const pilotList = people.filter((p) => p.type === "PILOT");

  const getSeatColor = (person) => {
    if (!person) return "#e0e0e0";
    if (person.type === "PILOT") return "#ef5350";
    if (person.type === "CABIN_CREW") return "#ff9800";
    if (person.seatType === "BUSINESS") return "#1a237e";
    return "#2196f3";
  };

  // Tooltip Mantığı
  const getTooltip = (person) => {
    if (!person) return "Empty Seat";

    const infant = people.find(
      (p) => p.isInfant && p.parentId === person.personId
    );

    let details = `TYPE: ${person.type}\nNAME: ${person.name}`;

    if (person.seniority) details += `\nLEVEL: ${person.seniority}`;
    if (person.seatNumber) details += `\nSEAT: ${person.seatNumber}`;

    if (infant) {
      details += `\n WITH INFANT: ${infant.name}`;
    }

    return details;
  };

  const PersonSeat = ({ person }) => (
    <Tooltip
      title={
        <pre style={{ margin: 0, textAlign: "left" }}>{getTooltip(person)}</pre>
      }
      arrow
      placement="top"
    >
      <Box
        sx={{
          width: { xs: 36, sm: 44 },
          height: { xs: 36, sm: 44 },
          bgcolor: getSeatColor(person),
          borderRadius: "8px",
          m: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "0.65rem",
          cursor: "default",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "0.2s",
          "&:hover": { transform: "scale(1.15)", zIndex: 10 },
        }}
      >
        {person.type === "PILOT" ? "PLT" : "CRW"}
      </Box>
    </Tooltip>
  );

  const Seat = ({ seatNo, type = "economy" }) => {
    const person = people.find((p) => p.seatNumber === seatNo);

    const width = person?.seatType === "BUSINESS" ? 50 : 40;

    return (
      <Tooltip
        title={<pre style={{ margin: 0 }}>{getTooltip(person)}</pre>}
        arrow
        placement="top"
      >
        <Box
          sx={{
            width: { xs: width - 8, sm: width },
            height: { xs: 36, sm: 44 },
            bgcolor: person
              ? person.seatType === "BUSINESS"
                ? "#1a237e"
                : "#2196f3"
              : "#e0e0e0",
            borderRadius: "8px 8px 12px 12px",
            m: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: person ? "white" : "#999",
            fontWeight: "bold",
            fontSize: "0.7rem",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {seatNo}
        </Box>
      </Tooltip>
    );
  };

  const Row = ({ left, right }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        mb: 1,
        px: 2,
      }}
    >
      <Box sx={{ display: "flex" }}>
        {left.map((s) => (
          <Seat key={s} seatNo={s} />
        ))}
      </Box>
      <Box sx={{ display: "flex" }}>
        {right.map((s) => (
          <Seat key={s} seatNo={s} />
        ))}
      </Box>
    </Box>
  );

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
        elevation={4}
        sx={{
          width: 260,
          py: 2,
          borderRadius: "60px 60px 0 0",
          bgcolor: "#cfd8dc",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" fontWeight="bold">
          COCKPIT ({vehicle?.vehicleModel})
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          {pilotList.map((p) => (
            <PersonSeat key={p.id} person={p} />
          ))}
        </Box>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          bgcolor: "#fff",
          width: "fit-content",
          pb: 5,
          borderRadius: "0 0 80px 80px",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff3e0",
            py: 1,
            mb: 2,
            textAlign: "center",
            borderBottom: "1px dashed #ff9800",
          }}
        >
          <Typography variant="caption" color="warning.dark" fontWeight="bold">
            CABIN CREW
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              px: 2,
            }}
          >
            {cabinCrewList.map((c) => (
              <PersonSeat key={c.id} person={c} />
            ))}
          </Box>
        </Box>

        <Typography variant="overline" display="block" align="center">
          Business
        </Typography>
        <Row left={["1A", "1B"]} right={["1C", "1D"]} type="business" />

        <Divider sx={{ my: 2 }}>Economy</Divider>
        <Row left={["10A", "10B", "10C"]} right={["10D", "10E", "10F"]} />
        <Row left={["11A", "11B", "11C"]} right={["11D", "11E", "11F"]} />

        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ color: "#ccc", mt: 2 }}
        >
          {vehicle?.totalSeatCount} Total Seats Configured
        </Typography>
      </Paper>
    </Box>
  );
};

export default PlaneView;
