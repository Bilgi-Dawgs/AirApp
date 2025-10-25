import express from "express";
import * as passengerController from "../controllers/passengerController.js";
import {
  validatePassengerInput,
  validatePassengerIdParam,
  validateFlightIdParam,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// public
router.get("/", passengerController.listPassengers);
router.get("/:pid", validatePassengerIdParam, passengerController.getPassenger);
router.get(
  "/by-flight/:flightid",
  validateFlightIdParam,
  passengerController.getByFlight
);

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
router.get("/internal/list", (req, res) => {
  res.status(200).json({ message: "Not finished" });
});
router.get("/internal/flight/:flightid", (req, res) => {
  res.status(200).json({ message: "Not finished" });
});
router.patch("/internal/status/:pid", (req, res) => {
  res.status(200).json({ message: "Not finished" });
});

export default router;
