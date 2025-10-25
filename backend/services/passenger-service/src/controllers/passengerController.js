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
  const { flightid } = req.params;
  const list = await passengerService.getPassengersByFlight(flightid);
  if (!list || list.length === 0) {
    throw new CustomError("No passengers found for this flight", 404);
  }
  res.status(200).json({ passengers: list });
};

export const addPassenger = async (req, res) => {
  const data = req.body;
  const created = await passengerService.createPassenger(data);
  res.status(201).json({ passenger: created });
};

export const updatePassenger = async (req, res) => {
  const { pid } = req.params;
  const updates = req.body;
  const updated = await passengerService.updatePassengerById(pid, updates);
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
  res.status(204).send();
};
