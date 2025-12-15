import React from "react";
import { Box, Paper, Typography, Divider, Tooltip, Chip } from "@mui/material";

const PlaneView = ({ people }) => {
  // Personel Listelerini Filtrele (Dinamik Render için)
  const cabinCrewList = people.filter((p) => p.type === "Cabin Crew");
  const pilotList = people.filter((p) => p.type === "Pilot");

  // Renk Mantığı
  const getSeatColor = (person) => {
    if (!person) return "#e0e0e0";
    if (person.type === "Pilot") return "#ef5350";
    if (person.type === "Cabin Crew") return "#ff9800";
    if (person.role === "Business") return "#1a237e";
    return "#2196f3";
  };

  // Tooltip Mantığı
  const getTooltip = (person) => {
    if (!person) return "Empty";
    let details = `${person.type.toUpperCase()}\nName: ${person.name}\nRole: ${
      person.role
    }`;
    // Ekstra detaylar eklenebilir
    return details;
  };

  // DİNAMİK KOLTUK BİLEŞENİ (Personel Objesi Alır)
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
          borderRadius: "8px", // Personel koltukları biraz daha kare olsun
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
        {person.seat} {/* CREW-1, PLT-1 vs yazar */}
      </Box>
    </Tooltip>
  );

  // STANDART KOLTUK BİLEŞENİ (Yolcular için - Seat ID ile çalışır)
  const Seat = ({ seatNo, type = "economy" }) => {
    const person = people.find((p) => p.seat === seatNo);
    const width = type === "business" ? 50 : 40;

    // Yolcu Tooltip'i
    const tooltipText = person
      ? `${person.type.toUpperCase()}\nName: ${person.name}\nClass: ${
          person.role
        }`
      : `Seat ${seatNo}: Empty`;

    return (
      <Tooltip
        title={<pre style={{ margin: 0 }}>{tooltipText}</pre>}
        arrow
        placement="top"
      >
        <Box
          sx={{
            width: { xs: width - 8, sm: width },
            height: { xs: 36, sm: 44 },
            bgcolor: person
              ? person.role === "Business"
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

  // SATIR DÜZENİ (YOLCULAR İÇİN)
  const Row = ({ leftSeats, rightSeats, type = "economy" }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 1,
        px: 2,
      }}
    >
      <Box sx={{ display: "flex" }}>
        {leftSeats.map((s) => (
          <Seat key={s} seatNo={s} type={type} />
        ))}
      </Box>
      <Box sx={{ display: "flex" }}>
        {rightSeats.map((s) => (
          <Seat key={s} seatNo={s} type={type} />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        overflowX: "auto",
        pb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          minWidth: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        {/* 1. KOKPİT (Dynamic Map) */}
        <Paper
          elevation={4}
          sx={{
            width: { xs: 200, sm: 260 },
            py: 3,
            mb: -1,
            borderRadius: "50% 50% 0 0",
            bgcolor: "#cfd8dc",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{ color: "#546e7a" }}
          >
            COCKPIT
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {pilotList.map((pilot) => (
              <PersonSeat key={pilot.id} person={pilot} />
            ))}
          </Box>
        </Paper>

        {/* 2. UÇAK GÖVDESİ */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#fff",
            border: "2px solid #b0bec5",
            borderTop: "none",
            minHeight: 500,
            borderRadius: "0 0 100px 100px",
            width: "fit-content",
            pb: 8,
          }}
        >
          {/* GALLEY / CREW AREA (TAMAMEN DİNAMİK) */}
          <Box
            sx={{
              bgcolor: "#fff3e0",
              py: 2,
              mb: 3,
              borderBottom: "2px dashed #ff9800",
              textAlign: "center",
              px: 2,
            }}
          >
            <Typography
              variant="overline"
              color="warning.dark"
              fontWeight="bold"
              sx={{ letterSpacing: 2 }}
            >
              CABIN CREW ({cabinCrewList.length})
            </Typography>

            {/* Burası Crew sayısı kadar kutu oluşturur */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
                mt: 1,
                maxWidth: 300,
              }}
            >
              {cabinCrewList.map((crew) => (
                <PersonSeat key={crew.id} person={crew} />
              ))}
            </Box>
          </Box>

          {/* PASSENGER SEATING */}
          <Typography
            variant="overline"
            color="primary"
            display="block"
            align="center"
          >
            Business Class
          </Typography>
          <Row
            leftSeats={["01A", "01B"]}
            rightSeats={["01E", "01F"]}
            type="business"
          />
          <Row
            leftSeats={["02A", "02B"]}
            rightSeats={["02E", "02F"]}
            type="business"
          />

          <Divider sx={{ my: 3 }}>Economy Class</Divider>

          <Row
            leftSeats={["14A", "14B", "14C"]}
            rightSeats={["14D", "14E", "14F"]}
          />
          <Row
            leftSeats={["15A", "15B", "15C"]}
            rightSeats={["15D", "15E", "15F"]}
          />
          <Row
            leftSeats={["16A", "16B", "16C"]}
            rightSeats={["16D", "16E", "16F"]}
          />

          <Typography
            variant="caption"
            display="block"
            align="center"
            sx={{ my: 2, color: "#aaa" }}
          >
            ... rows 17-30 ...
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default PlaneView;
