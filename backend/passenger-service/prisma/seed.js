import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const firstNames = [
  "Ali",
  "Veli",
  "Ayşe",
  "Fatma",
  "John",
  "Jane",
  "Hans",
  "Helga",
  "Pierre",
  "Sophie",
  "Michael",
  "Sarah",
  "David",
  "Emma",
  "Lars",
  "Elena",
  "Marco",
  "Giulia",
  "Hiroshi",
  "Yuki",
  "Mehmet",
  "Zeynep",
  "Can",
  "Elif",
  "Ozan",
  "Selin",
];
const lastNames = [
  "Yilmaz",
  "Demir",
  "Kaya",
  "Celik",
  "Smith",
  "Doe",
  "Mueller",
  "Schmidt",
  "Martin",
  "Dubois",
  "Johnson",
  "Brown",
  "Jensen",
  "Nielsen",
  "Rossi",
  "Bianchi",
  "Tanaka",
  "Sato",
  "Ivanov",
  "Popov",
  "Ozturk",
  "Aydin",
  "Yildiz",
];
const nationalities = [
  "TR",
  "US",
  "DE",
  "FR",
  "UK",
  "DK",
  "IT",
  "JP",
  "RU",
  "ES",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  await prisma.passenger.deleteMany();

  // --- 1. TK1920 (DETAYLI SENARYOLAR) ---
  const FLIGHT_TK = "TK1920";
  console.log(`Seeding specific scenarios for ${FLIGHT_TK}...`);

  await prisma.passenger.create({
    data: {
      flightNumber: FLIGHT_TK,
      name: "Murat Yilmaz",
      age: 45,
      gender: "Male",
      nationality: "TR",
      seatType: "BUSINESS",
      seatNumber: "B1",
      affiliatedWith: [],
    },
  });

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

  // TK1920 Bulk (Kalanları doldur)
  for (let i = 0; i < 70; i++) {
    const isBusiness = i < 6;
    const randomName = `${getRandomElement(firstNames)} ${getRandomElement(
      lastNames
    )}`;
    const randomNat = getRandomElement(nationalities);
    const randomAge = getRandomInt(18, 75);
    const randomGender = Math.random() > 0.5 ? "Male" : "Female";

    let preAssignedSeat = null;
    if (i === 0 && isBusiness) preAssignedSeat = "B4";
    if (i === 20 && !isBusiness) preAssignedSeat = "E15";

    await prisma.passenger.create({
      data: {
        flightNumber: FLIGHT_TK,
        name: randomName,
        age: randomAge,
        gender: randomGender,
        nationality: randomNat,
        seatType: isBusiness ? "BUSINESS" : "ECONOMY",
        seatNumber: preAssignedSeat,
        affiliatedWith: [],
      },
    });
  }

  // --- 2. DİĞER UÇUŞLAR (OTOMATİK DOLDURMA) ---
  const otherFlights = ["TK1071", "TK2023", "TK0050", "TK1821", "TK5005"];

  console.log("Seeding other flights...");

  for (const flightNum of otherFlights) {
    // Her uçuş için rastgele 50 ile 90 arası yolcu üret
    const passengerCount = getRandomInt(50, 90);

    for (let i = 0; i < passengerCount; i++) {
      const isBusiness = i < 5; // İlk 5'i business olsun
      const randomName = `${getRandomElement(firstNames)} ${getRandomElement(
        lastNames
      )}`;
      const randomNat = getRandomElement(nationalities);
      const randomAge = getRandomInt(18, 75);
      const randomGender = Math.random() > 0.5 ? "Male" : "Female";

      // %10 ihtimalle koltuğu önceden seçilmiş olsun
      let preAssignedSeat = null;
      if (Math.random() < 0.1) {
        preAssignedSeat = isBusiness
          ? `B${getRandomInt(1, 4)}`
          : `E${getRandomInt(1, 20)}`;
      }

      await prisma.passenger.create({
        data: {
          flightNumber: flightNum,
          name: randomName,
          age: randomAge,
          gender: randomGender,
          nationality: randomNat,
          seatType: isBusiness ? "BUSINESS" : "ECONOMY",
          seatNumber: preAssignedSeat,
          affiliatedWith: [],
        },
      });
    }
    console.log(` -> ${flightNum} seeded with ${passengerCount} passengers.`);
  }

  // --- 3. HARİCİ UÇUŞ (TEST İÇİN) ---
  await prisma.passenger.create({
    data: {
      flightNumber: "TK1542",
      name: "Klaus Schmidt",
      age: 40,
      gender: "Male",
      nationality: "DE",
      seatType: "BUSINESS",
      seatNumber: "B1",
      affiliatedWith: [],
    },
  });

  console.log(`All seeding completed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
