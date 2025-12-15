import React from "react";
import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

//===========================================================================

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        // Admin paneli için daha profesyonel, koyu lacivert/gri tonu
        backgroundColor: "#0a1929",
        color: "#e0e0e0", // Neon mavi yerine göz yormayan açık gri
        borderTop: "1px solid rgba(255, 255, 255, 0.12)", // Üstüne ince bir çizgi
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Sol Taraf: Telif Hakkı */}
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Flight Roster Management System
        </Typography>

        {/* Sağ Taraf: Proje Bilgisi ve Versiyon */}
        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
          <Typography
            variant="caption"
            sx={{ mr: 2, color: "rgba(255,255,255,0.7)" }}
          >
            CMPE331 Term Project
          </Typography>

          <MuiLink
            href="#"
            color="inherit"
            underline="hover"
            sx={{ fontSize: "0.875rem" }}
          >
            Version 1.0 (MVP)
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
