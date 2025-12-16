import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";

// Icons
import TableViewIcon from "@mui/icons-material/TableView";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewListIcon from "@mui/icons-material/ViewList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlightIcon from "@mui/icons-material/Flight";

// Mock Data
import {
  mockAvailableCrew,
  mockAutoAssignedPassengers,
  mockFlightDetails,
} from "../data/mockData";

// Sub-Components (Yeni ayırdığımız dosyalar)
import TabularView from "../components/views/TabularView";
import ExtendedView from "../components/views/ExtendedView";
import PlaneView from "../components/views/PlaneView";

const RosterViewPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const flightInfo = mockFlightDetails(flightId || "UNKNOWN");
  const initialTab = location.state?.initialTab || 0;
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mergedPeople, setMergedPeople] = useState([]);

  useEffect(() => {
    // 1. PİLOTLAR (Kokpit) - Genelde 2 kişidir ama dinamik de olabilir
    const pilots = mockAvailableCrew.pilots.slice(0, 2).map((p, index) => ({
      ...p,
      type: "Pilot",
      role: p.seniority,
      seat: `PLT-${index + 1}`,
    }));

    // 2. KABİN EKİBİ (TAMAMEN DİNAMİK)
    // mock verisindeki herkesi alıyoruz, sayı sınırı yok.
    const cabin = mockAvailableCrew.cabin.map((c, index) => ({
      ...c,
      type: "Cabin Crew",
      role: c.type,
      // Koltuk numarası yerine sanal bir ID atıyoruz
      seat: `CREW-${index + 1}`,
    }));

    // 3. YOLCULAR
    const pax = mockAutoAssignedPassengers.map((p) => ({
      ...p,
      type: "Passenger",
      role: p.class,
    }));

    setMergedPeople([...pilots, ...cabin, ...pax]);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", pb: 10 }}>
      {/* HEADER BAR */}
      <Paper
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          mb: 3,
          borderBottom: "1px solid #e0e0e0",
          borderRadius: 0,
        }}
        elevation={1}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={() => navigate("/search-roster")}
              sx={{ border: "1px solid #ddd" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#0a1929",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                <FlightIcon color="primary" /> Flight {flightId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vehicle: <b>{flightInfo.vehicle}</b> | Date:{" "}
                <b>{flightInfo.date}</b>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* CONTENT */}
      <Container maxWidth="xl">
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            textColor="primary"
            indicatorColor="primary"
            sx={{ "& .MuiTab-root": { fontWeight: "bold", fontSize: "1rem" } }}
          >
            <Tab
              icon={<TableViewIcon />}
              label="Tabular View"
              iconPosition="start"
            />
            <Tab
              icon={<GridOnIcon />}
              label="Plane View"
              iconPosition="start"
            />
            <Tab
              icon={<ViewListIcon />}
              label="Extended View"
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        <Box sx={{ minHeight: 400 }}>
          {activeTab === 0 && <TabularView people={mergedPeople} />}
          {activeTab === 1 && <PlaneView people={mergedPeople} />}
          {activeTab === 2 && <ExtendedView people={mergedPeople} />}
        </Box>
      </Container>
    </Box>
  );
};

export default RosterViewPage;
