import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // backend varsa ayarla

export async function getFlights() {
  try {
    const res = await axios.get(`${BASE_URL}/flights`);
    return res.data;
  } catch (err) {
    console.warn("Flights API unreachable, returning mock flights.", err.message);
    // Mock sample
    return [
      { flight_id: 1, flight_number: "AA1001", date_time: "2025-10-25T10:30:00Z", source_airport_code: "IST", source_airport_name: "Istanbul", destination_airport_code: "JFK", destination_airport_name: "New York", plane_type: "A320", duration: 300, distance: 5000 },
      { flight_id: 2, flight_number: "AA1002", date_time: "2025-10-26T15:00:00Z", source_airport_code: "IST", source_airport_name: "Istanbul", destination_airport_code: "LHR", destination_airport_name: "London", plane_type: "B737", duration: 180, distance: 2500 }
    ];
  }
}

export async function getFlightById(flightId) {
  try {
    const res = await axios.get(`${BASE_URL}/flights/${flightId}`);
    return res.data;
  } catch (err) {
    console.warn("Flight by id API unreachable, returning mock single flight.", err.message);
    return { flight_id: flightId, flight_number: "AA1001", date_time: "2025-10-25T10:30:00Z", source_airport_code: "IST", source_airport_name: "Istanbul", destination_airport_code: "JFK", destination_airport_name: "New York", plane_type: "A320", duration: 300, distance: 5000 };
  }
}
