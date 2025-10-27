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
import { verifyJWT, hasRole } from "../middlewares/authMiddleware.js";

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
  verifyJWT,
  hasRole("crew_manager", "scheduler", "admin"),
  validateAssignFlight,
  employeeController.assignFlight
);
router.patch(
  "/:id/status",
  verifyJWT,
  hasRole("crew_manager", "scheduler", "admin"),
  validateStatusPatch,
  employeeController.updateStatus
);

// admin
router.get(
  "/",
  verifyJWT,
  hasRole("admin"),
  validateListQuery,
  employeeController.listEmployees
);
router.post(
  "/",
  verifyJWT,
  hasRole("admin"),
  validateEmployeeInput,
  employeeController.createEmployee
);
router.put(
  "/:id",
  verifyJWT,
  hasRole("admin"),
  validateEmployeeIdParam,
  validateEmployeeInput,
  employeeController.replaceEmployee
);
router.delete(
  "/:id",
  verifyJWT,
  hasRole("admin"),
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
