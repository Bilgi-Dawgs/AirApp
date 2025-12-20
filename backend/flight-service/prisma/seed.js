import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Flight Service seeding started...");

  try {
    await prisma.sharedFlight.deleteMany();
    await prisma.flight.deleteMany();
    await prisma.vehicleType.deleteMany();
    await prisma.airport.deleteMany();
    console.log("Old data cleared.");
  } catch (error) {
    console.log("Cleanup skipped (Database might be empty).");
  }

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
      {
        code: "CDG",
        name: "Charles de Gaulle",
        city: "Paris",
        country: "France",
      },
    ],
  });

  const b737 = await prisma.vehicleType.create({
    data: {
      modelName: "BOEING_737",
      totalSeats: 120,
      requiredPilots: 2,
      requiredAttendants: 5,
      menu: ["Chicken Sandwich", "Cheese Sandwich", "Water", "Tea"],
      seatPlan: {
        business: {
          rows: [1, 2, 3],
          layout: "2-2",
          seatsPerRow: 4,
        },
        economy: {
          range: [4, 30],
          layout: "2-2",
          seatsPerRow: 4,
        },
      },
    },
  });

  const a320 = await prisma.vehicleType.create({
    data: {
      modelName: "AIRBUS_A320",
      totalSeats: 112,
      requiredPilots: 2,
      requiredAttendants: 5,
      menu: ["Pasta", "Meatballs", "Soda", "Coffee"],
      seatPlan: {
        business: {
          rows: [1, 2],
          layout: "2-2",
          seatsPerRow: 4,
        },
        economy: {
          range: [3, 28],
          layout: "2-2",
          seatsPerRow: 4,
        },
      },
    },
  });

  const a330 = await prisma.vehicleType.create({
    data: {
      modelName: "AIRBUS_A330",
      totalSeats: 160,
      requiredPilots: 3,
      requiredAttendants: 9,
      menu: ["Steak", "Fish", "Vegan Platter", "Wine"],
      seatPlan: {
        business: {
          rows: [1, 2, 3, 4, 5],
          layout: "2-2",
          seatsPerRow: 4,
        },
        economy: {
          range: [6, 40],
          layout: "2-2",
          seatsPerRow: 4,
        },
      },
    },
  });

  const b777 = await prisma.vehicleType.create({
    data: {
      modelName: "BOEING_777",
      totalSeats: 200,
      requiredPilots: 3,
      requiredAttendants: 16,
      menu: ["Beef Stroganoff", "Chicken Curry", "Sushi", "Champagne"],
      seatPlan: {
        business: {
          rows: [1, 2, 3, 4, 5, 6, 7, 8],
          layout: "2-2",
          seatsPerRow: 4,
        },
        economy: {
          range: [10, 51],
          layout: "2-2",
          seatsPerRow: 4,
        },
      },
    },
  });

  const b787 = await prisma.vehicleType.create({
    data: {
      modelName: "BOEING_787",
      totalSeats: 160,
      requiredPilots: 3,
      requiredAttendants: 9,
      menu: ["Gourmet Burger", "Salmon", "Salad", "Juice"],
      seatPlan: {
        business: {
          rows: [1, 2, 3, 4, 5],
          layout: "2-2",
          seatsPerRow: 4,
        },
        economy: {
          range: [6, 40],
          layout: "2-2",
          seatsPerRow: 4,
        },
      },
    },
  });

  await prisma.flight.create({
    data: {
      flightNumber: "TK1920",
      dateTime: new Date("2025-11-15T14:30:00Z"),
      durationMinutes: 660,
      distanceKm: 8000,
      sourceAirportCode: "IST",
      destinationAirportCode: "JFK",
      vehicleTypeId: a320.id,
    },
  });

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

  await prisma.flight.create({
    data: {
      flightNumber: "TK1821",
      dateTime: new Date("2025-11-17T16:00:00Z"),
      durationMinutes: 210,
      distanceKm: 2200,
      sourceAirportCode: "CDG",
      destinationAirportCode: "IST",
      vehicleTypeId: a320.id,
    },
  });

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

  console.log("Flight Service seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
