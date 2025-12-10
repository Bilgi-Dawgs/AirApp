import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export async function getCabinCrew() {
  try {
    const res = await axios.get(`${BASE_URL}/cabincrew`);
    return res.data;
  } catch (err) {
    console.warn("Cabin API unreachable, returning mock cabin crew.", err.message);
    return [
      { attendant_id: 1, name: "Ayşe", attendant_type: "chief", vehicle_types: ["A320","B737"] },
      { attendant_id: 2, name: "Selin", attendant_type: "regular", vehicle_types: ["A320"] },
      { attendant_id: 3, name: "Burak", attendant_type: "chef", vehicle_types: ["A320","B737"], recipes: ["Chicken Pasta","Beef Stroganoff"] }
    ];
  }
}
