import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding static data...");

  await prisma.airline.createMany({
    data: [
      { code: "TK", name: "Turkish Airlines" },
      { code: "LH", name: "Lufthansa" },
      { code: "BA", name: "British Airways" },
    ],
    skipDuplicates: true,
  });

  await prisma.airport.createMany({
    data: [
      {
        code: "IST",
        name: "Istanbul Airport",
        city: "Istanbul",
        country: "Turkey",
      },
      {
        code: "LHR",
        name: "Heathrow",
        city: "London",
        country: "United Kingdom",
      },
      {
        code: "FRA",
        name: "Frankfurt Airport",
        city: "Frankfurt",
        country: "Germany",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.aircraftType.createMany({
    data: [
      {
        modelName: "Airbus A320",
        seatCapacity: 180,
        seatingPlanJson: { rows: 30, layout: ["A", "B", "C", "D", "E", "F"] },
        maxCrewCount: 8,
        maxPassengerCount: 180,
        standardMenu: "Standard European",
      },
      {
        modelName: "Boeing 737-800",
        seatCapacity: 189,
        seatingPlanJson: { rows: 31, layout: ["A", "B", "C", "D", "E", "F"] },
        maxCrewCount: 9,
        maxPassengerCount: 189,
        standardMenu: "Standard Short-Haul",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Static data seeded!");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
