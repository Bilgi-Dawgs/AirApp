import React, { useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Button,
} from "@mui/material";
import { rosterApi } from "../api/axiosInstance";

// Icons
import TableViewIcon from "@mui/icons-material/TableView";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewListIcon from "@mui/icons-material/ViewList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlightIcon from "@mui/icons-material/Flight";

// Sub-Components
import TabularView from "../components/views/TabularView";
import ExtendedView from "../components/views/ExtendedView";
import PlaneView from "../components/views/PlaneView";

export const rosterLoader = async ({ params }) => {
  try {
    const response = await rosterApi.get(params.flightNumber);
    console.log(response.data);
    return { roster: response.data, error: null };
  } catch (err) {
    return {
      roster: null,
      error: err.response?.status || "unknown",
    };
  }
};

const RosterViewPage = () => {
  const { flightNumber } = useParams();
  const { roster, error } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = location.state?.initialTab || 0;
  const [activeTab, setActiveTab] = useState(initialTab);

  if (error === "404") {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Flight Roster Not Found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(`/workbench/${flightNumber}`)}
        >
          Go to Workbench to Generate
        </Button>
      </Container>
    );
  }

  if (!roster) return <Typography>Loading...</Typography>;
  const { flightInfoSnapshot } = roster;

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
                <FlightIcon color="primary" /> Flight {flightNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>
                  {flightInfoSnapshot.sourceCity} (
                  {flightInfoSnapshot.sourceAirportCode})
                </b>{" "}
                ➔
                <b>
                  {" "}
                  {flightInfoSnapshot.destinationCity} (
                  {flightInfoSnapshot.destinationAirportCode})
                </b>
                <br />
                Flight: <b>{flightInfoSnapshot.vehicleModel}</b> | Date:{" "}
                <b>{new Date(roster.flightDate).toLocaleString()}</b>
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
          {activeTab === 0 && <TabularView people={roster.persons} />}
          {activeTab === 1 && (
            <PlaneView people={roster.persons} vehicle={flightInfoSnapshot} />
          )}
          {activeTab === 2 && <ExtendedView people={roster.persons} />}
        </Box>
      </Container>
    </Box>
  );
};

export default RosterViewPage;
