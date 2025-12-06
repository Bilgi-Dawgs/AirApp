import express from "express";
import * as flightController from "../controllers/flightController.js";
import {
  validateFlightIdParam,
  validateFlightInput,
  validateFlightStatus,
} from "../middlewares/validationMiddleware.js";
import { verifyJWT, hasRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// public
router.get("/", flightController.listFlights);
router.get("/:id", validateFlightIdParam, flightController.getFlight);

// protected
router.post(
  "/",
  verifyJWT,
  hasRole("scheduler", "admin"),
  validateFlightInput,
  flightController.addFlight
);
router.delete(
  "/:id",
  verifyJWT,
  hasRole("scheduler", "admin"),
  validateFlightIdParam,
  flightController.deleteFlight
);
router.patch(
  "/:id",
  verifyJWT,
  hasRole("scheduler", "admin"),
  validateFlightStatus,
  validateFlightIdParam,
  flightController.updateFlight
);
router.put(
  "/:id",
  verifyJWT,
  hasRole("scheduler", "admin"),
  validateFlightIdParam,
  validateFlightInput,
  flightController.replaceFlight
);

// internal
router.get("/internal/list", flightController.internalList);

router.get(
  "/internal/:id",
  validateFlightIdParam,
  flightController.internalGetFlight
);

router.patch(
  "/internal/:id/status",
  validateFlightIdParam,
  validateFlightStatus,
  flightController.internalPatchStatus
);

export default router;
