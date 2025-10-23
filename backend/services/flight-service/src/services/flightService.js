import prisma from "../db/prismaClient.js";

export const getAllFlights = async (filters = {}) => {
  const { origin, destination } = filters;
  return prisma.flight.findMany({
    where: {
      ...(origin && { sourceAirportCode: origin }),
      ...(destination && { destinationAirportCode: destination }),
    },
    include: {
      airline: true,
      sourceAirport: true,
      destinationAirport: true,
      aircraftType: true,
    },
    orderBy: { departureTime: "asc" },
  });
};

export const getFlightById = async (id) => {
  return prisma.flight.findUnique({
    where: { id: Number(id) },
    include: {
      airline: true,
      aircraftType: true,
      sourceAirport: true,
      destinationAirport: true,
    },
  });
};

export const createFlight = async (data) => {
  // validation will change
  if (!data.flightNumber) throw new Error("flightNumber required");
  return prisma.flight.create({ data });
};
