import express from "express";
import * as flightController from "../controllers/flightController.js";

const router = express.Router();

// public
router.get("/", flightController.listFlights);
router.get("/:id", flightController.getFlight);

// protected
router.post("/", flightController.addFlight);
router.delete("/:id", flightController.deleteFlight);
router.patch("/:id", flightController.updateFlight);
router.put("/:id", flightController.replaceFlight);

export default router;
