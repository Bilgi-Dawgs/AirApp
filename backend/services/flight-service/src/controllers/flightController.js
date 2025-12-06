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
  const {
    airlineId,
    departureTime,
    durationMinutes,
    distanceKm,
    sourceAirportCode,
    destinationAirportCode,
    aircraftTypeId,
    status,
  } = req.body;

  const newFlight = await flightService.createFlight({
    airlineId,
    departureTime,
    durationMinutes,
    distanceKm,
    sourceAirportCode,
    destinationAirportCode,
    aircraftTypeId,
    status,
  });

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
  const updatedFlight = await flightService.updateFlightById(id, { status });

  res.status(200).json({ updatedFlight });
};

export const replaceFlight = async (req, res) => {
  const { id } = req.params;
  const {
    airlineId,
    departureTime,
    durationMinutes,
    distanceKm,
    sourceAirportCode,
    destinationAirportCode,
    aircraftTypeId,
    status,
  } = req.body;

  const replacedFlight = await flightService.replaceFlightById(id, {
    airlineId,
    departureTime,
    durationMinutes,
    distanceKm,
    sourceAirportCode,
    destinationAirportCode,
    aircraftTypeId,
    status,
  });
  res.status(200).json({ replacedFlight });
};

// INTERNAL CONTROLLERS
export const internalList = async (req, res) => {
  const flights = await flightService.getAllFlights(req.query);
  res.status(200).json({ flights });
};

export const internalGetFlight = async (req, res) => {
  const { id } = req.params;
  const flight = await flightService.getFlightById(id);

  res.status(200).json({ flight });
};

export const internalPatchStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedFlight = await flightService.updateFlightById(id, { status });
  res.status(200).json({ updatedFlight });
};
