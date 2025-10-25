import express from "express";
import * as passengerController from "../controllers/passengerController.js";
import {
  validatePassengerInput,
  validatePassengerIdParam,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// public
router.get("/", passengerController.listPassengers);
router.get("/:pid", validatePassengerIdParam, passengerController.getPassenger);
router.get("/by-flight/:flightid", passengerController.getByFlight);

// protected (auth service not ready yet)
router.post("/", validatePassengerInput, passengerController.addPassenger);
router.put(
  "/:pid",
  validatePassengerIdParam,
  validatePassengerInput,
  passengerController.updatePassenger
);
router.patch(
  "/checkin/:pid",
  validatePassengerIdParam,
  passengerController.checkinPassenger
);
router.delete(
  "/:pid",
  validatePassengerIdParam,
  passengerController.deletePassenger
);

// internal
router.get("/internal/list", passengerController.internalList);
router.get("/internal/flight/:flightid", passengerController.internalByFlight);
router.patch(
  "/internal/status/:pid",
  validatePassengerIdParam,
  passengerController.internalPatchStatus
);

export default router;
