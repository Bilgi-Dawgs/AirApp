import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function RosterDetails() {
  const { flightId } = useParams();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Roster Details for Flight ID: {flightId}</Typography>
      <Typography>This page will show crew and passenger details.</Typography>
    </Container>
  );
}
