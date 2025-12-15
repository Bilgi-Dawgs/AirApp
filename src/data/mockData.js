// --- src/data/mockData.js ---

// 1. UÇUŞ LİSTESİ (YENİ EKLENDİ)
export const mockAvailableFlights = [
  {
    id: "TK1905",
    route: "IST -> LHR",
    date: "2025-10-30",
    vehicle: "Boeing 737",
  },
  {
    id: "TK2023",
    route: "IST -> JFK",
    date: "2025-10-31",
    vehicle: "Airbus A330",
  },
  {
    id: "LH404",
    route: "FRA -> JFK",
    date: "2025-11-01",
    vehicle: "Boeing 747",
  },
  {
    id: "BA101",
    route: "LHR -> JFK",
    date: "2025-11-02",
    vehicle: "Boeing 777",
  },
  {
    id: "AF332",
    route: "CDG -> BOS",
    date: "2025-11-05",
    vehicle: "Airbus A350",
  },
];

export const mockAvailableCrew = {
  pilots: [
    {
      id: "P1",
      name: "Kpt. Ahmet Yilmaz",
      seniority: "Senior",
      vehicle: "Boeing 737",
      age: 45,
      nationality: "TR",
      languages: ["TR", "EN"],
    },
    {
      id: "P2",
      name: "Kpt. John Doe",
      seniority: "Junior",
      vehicle: "Boeing 737",
      age: 29,
      nationality: "US",
      languages: ["EN"],
    },
    {
      id: "P3",
      name: "Trainee Ali",
      seniority: "Trainee",
      vehicle: "Boeing 737",
      age: 24,
      nationality: "TR",
      languages: ["TR"],
    },
    {
      id: "P4",
      name: "Kpt. Ayse",
      seniority: "Senior",
      vehicle: "Airbus A330",
      age: 50,
      nationality: "TR",
      languages: ["TR", "DE"],
    },
  ],
  cabin: [
    {
      id: "C1",
      name: "Chief Elif",
      type: "Chief",
      age: 35,
      nationality: "TR",
      languages: ["TR", "EN", "FR"],
    },
    {
      id: "C2",
      name: "Chef Burak",
      type: "Chef",
      recipes: ["Steak", "Pasta"],
      age: 32,
      nationality: "TR",
      languages: ["TR", "IT"],
    },
    {
      id: "C3",
      name: "Attendant Can",
      type: "Junior",
      age: 25,
      nationality: "TR",
      languages: ["TR"],
    },
    {
      id: "C4",
      name: "Attendant Ece",
      type: "Junior",
      age: 22,
      nationality: "TR",
      languages: ["TR"],
    },
    {
      id: "C5",
      name: "Attendant Cem",
      type: "Junior",
      age: 26,
      nationality: "TR",
      languages: ["TR"],
    },
  ],
};

export const mockAutoAssignedPassengers = [
  {
    id: "PAX1",
    name: "Emir Salman",
    class: "Business",
    seat: "01A",
    age: 30,
    nationality: "TR",
  },
  {
    id: "PAX2",
    name: "Zeynep Kaya",
    class: "Business",
    seat: "01B",
    age: 28,
    nationality: "TR",
  },
  {
    id: "PAX3",
    name: "Mehmet Demir",
    class: "Economy",
    seat: "14A",
    age: 45,
    nationality: "TR",
  },
  {
    id: "PAX4",
    name: "Ayse Celik",
    class: "Economy",
    seat: "14B",
    age: 40,
    nationality: "TR",
  },
  {
    id: "PAX5",
    name: "Ali Veli",
    class: "Economy",
    seat: "14C",
    age: 22,
    nationality: "TR",
  },
  {
    id: "PAX6",
    name: "Fatma Yilmaz",
    class: "Economy",
    seat: "15A",
    age: 60,
    nationality: "TR",
  },
  {
    id: "PAX7",
    name: "John Smith",
    class: "Economy",
    seat: "15B",
    age: 35,
    nationality: "US",
  },
  {
    id: "PAX8",
    name: "Jane Doe",
    class: "Economy",
    seat: "15C",
    age: 34,
    nationality: "US",
  },
];

// Detay Fonksiyonunu Güncelledik:
// Artık listedeki gerçek vehicle tipini bulup döndürüyor.
export const mockFlightDetails = (flightId) => {
  const foundFlight = mockAvailableFlights.find((f) => f.id === flightId);

  return {
    id: flightId,
    vehicle: foundFlight ? foundFlight.vehicle : "Boeing 737", // Listede varsa onu al, yoksa default
    date: foundFlight ? foundFlight.date : "2025-10-30",
    constraints: {
      pilot: { min: 2, reqSenior: 1 },
      cabin: { min: 4, reqChef: 1 },
    },
  };
};
