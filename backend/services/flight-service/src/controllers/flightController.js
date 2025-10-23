import * as flightService from "../services/flightService.js";

export const listFlights = async (req, res, next) => {
  try {
    const flights = await flightService.getAllFlights(req.query);
    res.json(flights);
  } catch (err) {
    next(err);
  }
};

export const getFlight = async (req, res, next) => {
  try {
    const flight = await flightService.getFlightById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (err) {
    next(err);
  }
};

export const addFlight = async (req, res, next) => {
  try {
    const newFlight = await flightService.createFlight(req.body);
    res.status(201).json(newFlight);
  } catch (err) {
    next(err);
  }
};
