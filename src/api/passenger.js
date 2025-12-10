import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export async function getPassengers(flightId) {
  try {
    const res = await axios.get(`${BASE_URL}/passengers?flight_id=${flightId}`);
    return res.data;
  } catch (err) {
    console.warn("Passengers API unreachable, returning mock passengers.", err.message);
    // some with seat_number, some without
    return [
      { passenger_id: 1, flight_id: flightId, name: "John Doe", age: 34, seat_type: "business", seat_number: "1A" },
      { passenger_id: 2, flight_id: flightId, name: "Jane Roe", age: 28, seat_type: "economy", seat_number: null },
      { passenger_id: 3, flight_id: flightId, name: "Baby Sam", age: 1, seat_type: null, seat_number: null, parent_id: 2 },
      { passenger_id: 4, flight_id: flightId, name: "Alice", age: 45, seat_type: "economy", seat_number: null }
    ];
  }
}
