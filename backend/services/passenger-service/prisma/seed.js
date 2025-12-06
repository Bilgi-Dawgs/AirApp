import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding process started...");

  await prisma.passenger.deleteMany();

  const FLIGHT_TK = "TK1920";
  const FLIGHT_LH = "TK1542";

  // 1. Pre-assigned Business Class Passenger
  // Tests if the system respects existing seat assignments.
  await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "Murat Yilmaz",
      age: 45,
      gender: "Male",
      nationality: "TR",
      seatType: "BUSINESS",
      seatNumber: "1A",
      affiliatedWith: [],
    },
  });

  // Unassigned Business Class Passenger
  // Tests if the system correctly assigns a Business seat to a VIP user.
  await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "Elizabeth Smith",
      age: 38,
      gender: "Female",
      nationality: "UK",
      seatType: "BUSINESS",
      seatNumber: null,
      affiliatedWith: [],
    },
  });

  // Family Group (Guardian & Infant)
  // Tests logic for associating infants with guardians.
  const parentPassenger = await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "Ayse Demir",
      age: 29,
      gender: "Female",
      nationality: "TR",
      seatType: "ECONOMY",
      seatNumber: null,
      affiliatedWith: [],
    },
  });

  await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "Can Demir",
      age: 1,
      gender: "Male",
      nationality: "TR",
      seatType: "ECONOMY",
      seatNumber: null,
      guardianId: parentPassenger.id,
      affiliatedWith: [],
    },
  });

  // Affiliated Passengers (Couple)
  // Tests greedy approach for seating groups together.
  const partnerA = await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "John Doe",
      age: 30,
      gender: "Male",
      nationality: "US",
      seatType: "ECONOMY",
      seatNumber: null,
      affiliatedWith: [],
    },
  });

  const partnerB = await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "Jane Doe",
      age: 28,
      gender: "Female",
      nationality: "US",
      seatType: "ECONOMY",
      seatNumber: null,
      affiliatedWith: [partnerA.id],
    },
  });

  await prisma.passenger.update({
    where: { id: partnerA.id },
    data: { affiliatedWith: [partnerB.id] },
  });

  // Bulk Economy Passengers
  // Tests general seat filling logic.
  const bulkPassengers = [
    { name: "Hans Mueller", age: 52, nat: "DE" },
    { name: "Lars Jensen", age: 24, nat: "DK" },
    { name: "Maria Garcia", age: 31, nat: "ES" },
    { name: "Sophie Martin", age: 27, nat: "FR" },
  ];

  for (const p of bulkPassengers) {
    await prisma.passenger.create({
      data: {
        flightNumber: FLIGHT_TK,
        name: p.name,
        age: p.age,
        gender: "Female",
        nationality: p.nat,
        seatType: "ECONOMY",
        seatNumber: null,
        affiliatedWith: [],
      },
    });
  }

  // 6. Shared Flight Passengers
  // Tests data isolation between flights.
  await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_LH,
      name: "Klaus Schmidt",
      age: 40,
      gender: "Male",
      nationality: "DE",
      seatType: "BUSINESS",
      seatNumber: "2F",
      affiliatedWith: [],
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
