import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Flight Roster System ✈️
      </Typography>
      <Typography>
        You can browse available flights and view crew & passenger details.
      </Typography>
    </Container>
  );
}
