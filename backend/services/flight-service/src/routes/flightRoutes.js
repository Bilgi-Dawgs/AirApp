import express from "express";
import * as flightController from "../controllers/flightController.js";

const router = express.Router();

router.get("/", flightController.listFlights);
router.get("/:id", flightController.getFlight);
router.post("/", flightController.addFlight);

export default router;
