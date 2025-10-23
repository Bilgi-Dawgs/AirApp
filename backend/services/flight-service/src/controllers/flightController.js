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

  // Basic validations
  const requiredFields = [
    "flightNumber",
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
