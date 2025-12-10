import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export async function getPilots() {
  try {
    const res = await axios.get(`${BASE_URL}/pilots`);
    return res.data;
  } catch (err) {
    console.warn("Pilots API unreachable, returning mock pilots.", err.message);
    return [
      { pilot_id: 1, name: "Capt. Ahmet", seniority_level: "senior", vehicle_type: "A320", max_range: 6000 },
      { pilot_id: 2, name: "Furkan", seniority_level: "junior", vehicle_type: "A320", max_range: 5000 },
      { pilot_id: 3, name: "Mehmet", seniority_level: "trainee", vehicle_type: "B737", max_range: 3000 }
    ];
  }
}
