import * as flightService from "../services/flightService.js";
import { CustomError } from "../middlewares/customError.js";

export const listFlights = async (req, res) => {
  const flights = await flightService.getAllFlights(req.query);
  if (!flights || flights.length === 0) {
    throw new CustomError("No flights found", 404);
  }

  res.status(200).json({ flights });
};

export const getFlight = async (req, res) => {
  const { id } = req.params;
  const flight = await flightService.getFlightById(id);

  res.status(200).json({ flight });
};

export const addFlight = async (req, res) => {
  const data = req.body;
  const newFlight = await flightService.createFlight(data);

  res.status(201).json({ newFlight });
};

export const deleteFlight = async (req, res) => {
  const { id } = req.params;
  const deleted = await flightService.deleteFlightById(id);

  res.status(200).json({ message: "Flight deleted successfully" });
};

export const updateFlight = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedFlight = await flightService.updateFlightById(id, {
    status,
  });

  res.status(200).json({ updatedFlight });
};

export const replaceFlight = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const replacedFlight = await flightService.replaceFlightById(id, data);
  res.status(200).json({ replacedFlight });
};
