import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend'den uçuşları çekiyoruz
    axios
      .get("http://localhost:5000/api/flights") // backend endpoint
      .then((res) => {
        setFlights(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching flights:", err);
        setLoading(false);
      });
      const mockFlights = [
        {
          flight_id: 1,
          flight_number: "AB1234",
          source_airport_code: "IST",
          destination_airport_code: "JFK",
          date_time: "2025-10-21T08:00:00Z",
        },
        {
          flight_id: 2,
          flight_number: "AB5678",
          source_airport_code: "LHR",
          destination_airport_code: "CDG",
          date_time: "2025-10-22T10:30:00Z",
        },
      ];
    
      setFlights(mockFlights);
      setLoading(false);

  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading flights...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Available Flights
      </Typography>

      {flights.length === 0 ? (
        <Typography>No flights available.</Typography>
      ) : (
        <Paper sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Flight Number</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {flights.map((f) => (
                <TableRow key={f.flight_id}>
                  <TableCell>{f.flight_number}</TableCell>
                  <TableCell>{f.source_airport_code}</TableCell>
                  <TableCell>{f.destination_airport_code}</TableCell>
                  <TableCell>
                    {new Date(f.date_time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/roster/${f.flight_id}`}
                    >
                      View Roster
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
