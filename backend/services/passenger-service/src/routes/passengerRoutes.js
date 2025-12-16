import express from "express";
import * as passengerController from "../controllers/passengerController.js";
import {
  validatePassengerInput,
  validatePassengerIdParam,
  validateFlightNumberParam,
} from "../middlewares/validationMiddleware.js";
import { verifyJWT, hasRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// public
router.get("/", passengerController.listPassengers);
router.get("/:pid", validatePassengerIdParam, passengerController.getPassenger);
router.get(
  "/by-flight/:flightNumber",
  validateFlightNumberParam,
  passengerController.getByFlight
);

// internal (service-to-service authorization logic awaits)
router.get("/internal/list", passengerController.internalList);
router.get("/internal/flight/:flightid", passengerController.internalByFlight);

export default router;

/* Dropped due to revised plan
router.patch(
  "/internal/status/:pid",
  validatePassengerIdParam,
  passengerController.internalPatchStatus
);

// protected (auth service not ready yet)
router.post(
  "/",
  verifyJWT,
  hasRole("admin", "scheduler"),
  validatePassengerInput,
  passengerController.addPassenger
);
router.put(
  "/:pid",
  verifyJWT,
  hasRole("admin", "scheduler"),
  validatePassengerIdParam,
  validatePassengerInput,
  passengerController.updatePassenger
);
router.patch(
  "/checkin/:pid",
  verifyJWT,
  hasRole("passenger", "admin", "scheduler", "crew_manager"),
  validatePassengerIdParam,
  passengerController.checkinPassenger
);
router.delete(
  "/:pid",
  verifyJWT,
  hasRole("admin", "scheduler"),
  validatePassengerIdParam,
  passengerController.deletePassenger
);
*/
