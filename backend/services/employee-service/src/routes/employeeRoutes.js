import express from "express";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

// public
router.get("/:id", employeeController.getEmployee);
router.get("/by-flight/:flightId", employeeController.getByFlight);

// protected
router.patch("/:id/assignFlight", employeeController.assignFlight);
router.patch("/:id/status", employeeController.updateStatus);

// admin
router.get("/", employeeController.listEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.replaceEmployee);
router.delete("/:id", employeeController.deleteEmployee);

// internal
router.get("/internal/list", employeeController.internalList);
router.get("/internal/available", employeeController.internalAvailable);
router.patch("/internal/status/:id", employeeController.internalPatchStatus);
router.patch(
  "/internal/assign/:id/:flightId",
  employeeController.internalAssign
);

export default router;
