import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("✈️  Flight Service seeding started...");

  // CLEANUP
  await prisma.sharedFlight.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.vehicleType.deleteMany();
  await prisma.airport.deleteMany();

  console.log("🧹 Old data cleared.");

  // AIRPORTS
  await prisma.airport.createMany({
    data: [
      {
        code: "IST",
        name: "Istanbul Airport",
        city: "Istanbul",
        country: "Turkey",
      },
      {
        code: "ESB",
        name: "Esenboga Airport",
        city: "Ankara",
        country: "Turkey",
      },
      {
        code: "JFK",
        name: "John F. Kennedy",
        city: "New York",
        country: "USA",
      },
      { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
      {
        code: "FRA",
        name: "Frankfurt Airport",
        city: "Frankfurt",
        country: "Germany",
      },
      { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan" },
    ],
  });

  // VEHICLE TYPES

  // BOEING 737
  const b737 = await prisma.vehicleType.create({
    data: {
      modelName: "BOEING_737",
      totalSeats: 162,
      requiredPilots: 2,
      requiredAttendants: 4,
      menu: ["Chicken Sandwich", "Cheese Sandwich", "Water", "Tea"],
      seatPlan: {
        business: {
          rows: [1, 2, 3],
          layout: "2-2",
          seatsPerRow: 4,
        },
        economy: {
          range: [4, 28],
          layout: "3-3",
          seatsPerRow: 6,
        },
      },
    },
  });

  // AIRBUS A320
  const a320 = await prisma.vehicleType.create({
    data: {
      modelName: "AIRBUS_A320",
      totalSeats: 150,
      requiredPilots: 2,
      requiredAttendants: 4,
      menu: ["Pasta", "Meatballs", "Soda", "Coffee"],
      seatPlan: {
        business: { rows: [1, 2], layout: "2-2", seatsPerRow: 4 },
        economy: { range: [3, 26], layout: "3-3", seatsPerRow: 6 },
      },
    },
  });

  // AIRBUS A330
  const a330 = await prisma.vehicleType.create({
    data: {
      modelName: "AIRBUS_A330",
      totalSeats: 250,
      requiredPilots: 3,
      requiredAttendants: 8,
      menu: ["Steak", "Fish", "Vegan Platter", "Wine"],
      seatPlan: {
        business: { rows: [1, 2, 3, 4, 5], layout: "2-2-2", seatsPerRow: 6 },
        economy: { range: [6, 35], layout: "2-4-2", seatsPerRow: 8 },
      },
    },
  });

  // BOEING 777
  const b777 = await prisma.vehicleType.create({
    data: {
      modelName: "BOEING_777",
      totalSeats: 350,
      requiredPilots: 3,
      requiredAttendants: 10,
      menu: ["Beef Stroganoff", "Chicken Curry", "Sushi", "Champagne"],
      seatPlan: {
        business: { rows: [1, 2, 3, 4, 5, 6], layout: "2-2-2", seatsPerRow: 6 },
        economy: { range: [10, 45], layout: "3-4-3", seatsPerRow: 10 },
      },
    },
  });

  // BOEING 787
  const b787 = await prisma.vehicleType.create({
    data: {
      modelName: "BOEING_787",
      totalSeats: 240,
      requiredPilots: 3,
      requiredAttendants: 7,
      menu: ["Gourmet Burger", "Salmon", "Salad", "Juice"],
      seatPlan: {
        business: { rows: [1, 2, 3, 4], layout: "1-2-1", seatsPerRow: 4 }, // Herkes koridora erişir
        economy: { range: [5, 30], layout: "3-3-3", seatsPerRow: 9 },
      },
    },
  });

  // FLIGHTS

  // IST -> JFK
  await prisma.flight.create({
    data: {
      flightNumber: "TK1920",
      dateTime: new Date("2025-11-15T14:30:00Z"),
      durationMinutes: 660,
      distanceKm: 8000,
      sourceAirportCode: "IST",
      destinationAirportCode: "JFK",
      vehicleTypeId: b777.id,
    },
  });

  // IST -> ESB
  await prisma.flight.create({
    data: {
      flightNumber: "TK1071",
      dateTime: new Date("2025-11-16T09:00:00Z"),
      durationMinutes: 60,
      distanceKm: 450,
      sourceAirportCode: "IST",
      destinationAirportCode: "ESB",
      vehicleTypeId: b737.id,
    },
  });

  // Uçuş 3: LHR -> IST
  await prisma.flight.create({
    data: {
      flightNumber: "TK2023",
      dateTime: new Date("2025-11-16T12:00:00Z"),
      durationMinutes: 240,
      distanceKm: 2500,
      sourceAirportCode: "LHR",
      destinationAirportCode: "IST",
      vehicleTypeId: a330.id,
    },
  });

  // HND -> IST
  await prisma.flight.create({
    data: {
      flightNumber: "TK0050",
      dateTime: new Date("2025-11-17T01:00:00Z"),
      durationMinutes: 720,
      distanceKm: 9000,
      sourceAirportCode: "HND",
      destinationAirportCode: "IST",
      vehicleTypeId: b787.id,
    },
  });

  // SHARED FLIGHT
  // FRA -> IST (Lufthansa ile ortak)
  const sharedFlight = await prisma.flight.create({
    data: {
      flightNumber: "TK5005",
      dateTime: new Date("2025-11-18T10:00:00Z"),
      durationMinutes: 180,
      distanceKm: 1900,
      sourceAirportCode: "FRA",
      destinationAirportCode: "IST",
      vehicleTypeId: a320.id,
    },
  });

  await prisma.sharedFlight.create({
    data: {
      flightNumber: sharedFlight.flightNumber,
      partnerCompany: "Lufthansa",
      partnerFlightNumber: "LH3030",
      connectingFlight: null,
    },
  });

  console.log("✅ Flight Service seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
