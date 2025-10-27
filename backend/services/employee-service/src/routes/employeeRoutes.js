import express from "express";
import * as employeeController from "../controllers/employeeController.js";
import {
  validateEmployeeIdParam,
  validateFlightIdParam,
  validateAssignFlight,
  validateStatusPatch,
  validateEmployeeInput,
  validateListQuery,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// public
router.get("/:id", validateEmployeeIdParam, employeeController.getEmployee);
router.get(
  "/by-flight/:flightId",
  validateFlightIdParam,
  employeeController.getByFlight
);

// protected
router.patch(
  "/:id/assignFlight",
  validateAssignFlight,
  employeeController.assignFlight
);
router.patch(
  "/:id/status",
  validateStatusPatch,
  employeeController.updateStatus
);

// admin
router.get("/", validateListQuery, employeeController.listEmployees);
router.post("/", validateEmployeeInput, employeeController.createEmployee);
router.put(
  "/:id",
  validateEmployeeIdParam,
  validateEmployeeInput,
  employeeController.replaceEmployee
);
router.delete(
  "/:id",
  validateEmployeeIdParam,
  employeeController.deleteEmployee
);

// internal
router.get("/internal/list", employeeController.internalList);
router.get("/internal/available", employeeController.internalAvailable);
router.patch(
  "/internal/status/:id",
  validateEmployeeIdParam,
  employeeController.internalPatchStatus
);
router.patch(
  "/internal/assign/:id/:flightId",
  validateEmployeeIdParam,
  validateFlightIdParam,
  employeeController.internalAssign
);

export default router;
