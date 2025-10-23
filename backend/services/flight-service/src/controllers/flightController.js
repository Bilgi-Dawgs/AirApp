import * as flightService from "../services/flightService.js";
import { CustomError } from "../middlewares/customError.js";

// (Temporary validations)

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
  if (!flight) {
    throw new CustomError(`Flight with ID ${id} not found`, 404);
  }

  res.status(200).json({ flight });
};

export const addFlight = async (req, res) => {
  const data = req.body;

  // (Temporary validations)
  const requiredFields = [
    "airlineId",
    "departureTime",
    "sourceAirportCode",
    "destinationAirportCode",
    "aircraftTypeId",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new CustomError(`Missing required field: ${field}`, 400);
    }
  }

  const newFlight = await flightService.createFlight(data);

  res.status(201).json({ newFlight });
};

export const deleteFlight = async (req, res) => {
  const { id } = req.params;

  const deleted = await flightService.deleteFlightById(id);
  // (Temporary validations)
  if (!deleted) {
    throw new CustomError(`Flight with ID ${id} not found`, 404);
  }

  res.status(200).json({ message: "Flight deleted successfully" });
};

export const updateFlight = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // (Temporary validations)
  if (!id) {
    throw new CustomError(`Flight with ID ${id} not found`, 404);
  }
  if (!status) {
    throw new CustomError("Status field can't be empty.", 400);
  }
  const updatedFlight = await flightService.updateFlightById(id, {
    status,
  });

  res.status(200).json({ updatedFlight });
};

export const replaceFlight = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // (Temporary validations)
  const requiredFields = [
    "airlineId",
    "departureTime",
    "sourceAirportCode",
    "destinationAirportCode",
    "aircraftTypeId",
  ];

  if (!id) {
    throw new CustomError(`Flight with ID ${id} not found`, 404);
  }

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new CustomError(`Missing required field: ${field}`, 400);
    }
  }

  const replacedFlight = await flightService.replaceFlightById(id, data);
  res.status(200).json({ replacedFlight });
};
