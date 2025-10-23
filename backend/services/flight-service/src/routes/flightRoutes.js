import express from "express";
import * as flightController from "../controllers/flightController.js";
import {
  validateFlightIdParam,
  validateFlightInput,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// public
router.get("/", flightController.listFlights);
router.get("/:id", validateFlightIdParam, flightController.getFlight);

// protected (auth service isn't ready yet)
router.post("/", validateFlightInput, flightController.addFlight);
router.delete("/:id", validateFlightIdParam, flightController.deleteFlight);
router.patch("/:id", validateFlightIdParam, flightController.updateFlight);
router.put(
  "/:id",
  validateFlightIdParam,
  validateFlightInput,
  flightController.replaceFlight
);

export default router;
