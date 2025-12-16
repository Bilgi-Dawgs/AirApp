import prisma from "../db/prismaClient.js";

export const getAllPassengers = async (filters = {}) => {
  const where = {};
  if (filters.flightId) where.flightId = BigInt(filters.flightId);
  if (filters.checkedIn !== undefined) {
    where.checkedIn =
      typeof filters.checkedIn === "string"
        ? filters.checkedIn === "true"
        : Boolean(filters.checkedIn);
  }
  return prisma.passenger.findMany({
    where,
    orderBy: { createdAt: "asc" },
  });
};

export const getPassengerById = async (id) => {
  return prisma.passenger.findUniqueOrThrow({ where: { id: BigInt(id) } });
};

export const getPassengersByFlight = async (flightNumber) => {
  return prisma.passenger.findMany({ where: { flightNumber: flightNumber } });
};

/* dropped due to revised plan 

export const createPassenger = async (data) => {
  const toCreate = {
    firstName: data.firstName,
    lastName: data.lastName,
    passportNumber: data.passportNumber,
    ticketNumber: data.ticketNumber,
    flightId: BigInt(data.flightId),
    seatNumber: data.seatNumber || null,
    classType: data.classType,
    nationality: data.nationality,
  };
  return prisma.passenger.create({ data: toCreate });
};

export const updatePassengerById = async (id, updates) => {
  return prisma.passenger.update({
    where: { id: BigInt(id) },
    data: updates,
  });
};

export const checkinPassenger = async (id) => {
  return prisma.passenger.update({
    where: { id: BigInt(id) },
    data: { checkedIn: true },
  });
};

export const deletePassengerById = async (id) => {
  return prisma.passenger.delete({ where: { id: BigInt(id) } });
};
*/
