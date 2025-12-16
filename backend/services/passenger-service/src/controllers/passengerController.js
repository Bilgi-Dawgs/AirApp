import * as passengerService from "../services/passengerService.js";
import { CustomError } from "../middlewares/customError.js";

export const listPassengers = async (req, res) => {
  const passengers = await passengerService.getAllPassengers(req.query);
  if (!passengers) {
    throw new CustomError("No passengers found", 404);
  }
  res.status(200).json({ passengers });
};

export const getPassenger = async (req, res) => {
  const { pid } = req.params;
  const passenger = await passengerService.getPassengerById(pid);
  if (!passenger) {
    throw new CustomError("Passenger not found", 404);
  }
  res.status(200).json({ passenger });
};

export const getByFlight = async (req, res) => {
  const { flightNumber } = req.params;
  const list = await passengerService.getPassengersByFlight(flightNumber);

  res.status(200).json({ passengers: list || [] });
};

// internal endpoints
export const internalList = async (req, res) => {
  const passengers = await passengerService.getAllPassengers(req.query);
  res.status(200).json({ passengers });
};

export const internalByFlight = async (req, res) => {
  const { flightNumber } = req.params;
  const list = await passengerService.getPassengersByFlight(flightNumber);
  res.status(200).json({ passengers: list });
};

/* Dropped due to revised plan

export const internalPatchStatus = async (req, res) => {
  const { pid } = req.params;
  const { checkedIn } = req.body;
  const p = await passengerService.updatePassengerById(pid, { checkedIn });
  res.status(200).json({ updated: p });
};

export const addPassenger = async (req, res) => {
  const {
    firstName,
    lastName,
    passportNumber,
    ticketNumber,
    flightId,
    seatNumber,
    classType,
    nationality,
  } = req.body;

  const created = await passengerService.createPassenger({
    firstName,
    lastName,
    passportNumber,
    ticketNumber,
    flightId,
    seatNumber,
    classType,
    nationality,
  });
  res.status(201).json({ passenger: created });
};

export const updatePassenger = async (req, res) => {
  const { pid } = req.params;
  const {
    firstName,
    lastName,
    passportNumber,
    ticketNumber,
    seatNumber,
    classType,
    nationality,
    checkedIn,
  } = req.body;

  const updated = await passengerService.updatePassengerById(pid, {
    firstName,
    lastName,
    passportNumber,
    ticketNumber,
    seatNumber,
    classType,
    nationality,
    checkedIn,
  });
  res.status(200).json({ updated });
};

export const checkinPassenger = async (req, res) => {
  const { pid } = req.params;
  const checked = await passengerService.checkinPassenger(pid);
  res.status(200).json({ checked });
};

export const deletePassenger = async (req, res) => {
  const { pid } = req.params;
  await passengerService.deletePassengerById(pid);
  res.status(200).json({ message: "Passenger deleted successfully" });
};
*/
