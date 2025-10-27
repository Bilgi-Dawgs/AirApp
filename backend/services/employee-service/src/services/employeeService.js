import prisma from "../db/prismaClient.js";
import { CustomError } from "../middlewares/customError.js";

// for long int
const toBigInt = (v) => (v === undefined || v === null ? null : BigInt(v));

export const getAllEmployees = async (filters = {}) => {
  const where = {};
  if (filters.assignedFlightId)
    where.assignedFlightId = toBigInt(filters.assignedFlightId);
  if (filters.status) where.status = filters.status;
  return prisma.employee.findMany({ where, orderBy: { createdAt: "asc" } });
};

export const getEmployeeById = async (id) => {
  return prisma.employee.findUnique({ where: { id: toBigInt(id) } });
};

export const getEmployeesByFlight = async (flightId) => {
  return prisma.employee.findMany({
    where: { assignedFlightId: toBigInt(flightId) },
  });
};

export const createEmployee = async (data) => {
  const toCreate = {
    firstName: data.firstName,
    lastName: data.lastName,
    position: data.position,
    licenseNumber: data.licenseNumber,
    experienceYears: Number(data.experienceYears || 0),
    assignedFlightId: data.assignedFlightId
      ? toBigInt(data.assignedFlightId)
      : null,
    status: data.status || undefined,
  };

  return prisma.employee.create({ data: toCreate });
};

export const replaceEmployee = async (id, data) => {
  return prisma.employee.update({ where: { id: toBigInt(id) }, data });
};

export const deleteEmployeeById = async (id) => {
  return prisma.employee.delete({ where: { id: toBigInt(id) } });
};

export const assignFlight = async (id, flightId) => {
  return prisma.employee.update({
    where: { id: toBigInt(id) },
    data: { assignedFlightId: toBigInt(flightId) },
  });
};

export const updateStatus = async (id, status) => {
  return prisma.employee.update({
    where: { id: toBigInt(id) },
    data: { status },
  });
};

export const getAvailableEmployees = async () => {
  return prisma.employee.findMany({
    where: { status: "AVAILABLE" },
    orderBy: { createdAt: "asc" },
  });
};
