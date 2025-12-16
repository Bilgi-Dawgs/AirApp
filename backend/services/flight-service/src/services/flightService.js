import prisma from "../db/prismaClient.js";

export const getAllFlights = async (filters = {}) => {
  const { origin, destination } = filters;
  return prisma.flight.findMany({
    where: {
      ...(origin && { sourceAirportCode: origin }),
      ...(destination && { destinationAirportCode: destination }),
    },
    include: {
      sharedFlight: true,
      sourceAirport: true,
      destinationAirport: true,
      vehicleType: true,
    },
    orderBy: { departureTime: "asc" },
  });
};

export const getFlightByNumber = async (flightNumber) => {
  return prisma.flight.findUnique({
    where: { flightNumber: flightNumber },
    // eager fetch
    include: {
      vehicleType: true,
      sourceAirport: true,
      destinationAirport: true,
      sharedFlight: true,
    },
  });
};

/* Dropped due to revised plan

export const getFlightById = async (id) => {
  return prisma.flight.findUnique({
    where: { id: BigInt(id) },
    include: {
      airline: true,
      aircraftType: true,
      sourceAirport: true,
      destinationAirport: true,
    },
  });
};

const generateFlightNumber = async () => {
  const airlineCode = "TK"; // constant
  const lastFlight = await prisma.flight.findFirst({
    orderBy: { id: "desc" },
  });

  let number = 1000;
  if (lastFlight) {
    const lastNum = parseInt(lastFlight.flightNumber.slice(2));
    number = lastNum + 1;
  }

  return `${airlineCode}${number.toString().padStart(4, "0")}`;
};

export const createFlight = async (data) => {
  const flightNumber = await generateFlightNumber();

  return prisma.flight.create({
    data: {
      ...data,
      flightNumber,
    },
  });
};

export const deleteFlightById = async (id) => {
  return prisma.flight.delete({
    where: { id: BigInt(id) },
  });
};

// patch
export const updateFlightById = async (id, updates) => {
  return prisma.flight.update({
    where: { id: BigInt(id) },
    data: updates,
  });
};

// put
export const replaceFlightById = async (id, data) => {
  return prisma.flight.update({
    where: { id: BigInt(id) },
    data,
  });
};

*/
