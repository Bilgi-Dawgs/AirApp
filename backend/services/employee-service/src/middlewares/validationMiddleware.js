import { body, param, query, validationResult } from "express-validator";
import { CustomError } from "./customError.js";

const withValidationErrors = (validators) => {
  return [
    ...validators,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg);
        throw new CustomError(messages.join(", "), 400);
      }
      next();
    },
  ];
};

// Employee ID
export const validateEmployeeIdParam = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("Employee ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Employee ID must be a positive integer")
    .bail()
    .customSanitizer((value) => {
      return BigInt(value);
    }),
]);

// Flight ID
export const validateFlightIdParam = withValidationErrors([
  param("flightId")
    .notEmpty()
    .withMessage("flightId is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("flightId must be a positive integer")
    .customSanitizer((value) => {
      return BigInt(value);
    }),
]);

// Assign Flight
export const validateAssignFlight = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("Employee ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Employee ID must be a positive integer")
    .customSanitizer((value) => {
      return BigInt(value);
    }),
  body("assignedFlightId")
    .notEmpty()
    .withMessage("assignedFlightId is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("assignedFlightId must be a positive integer")
    .customSanitizer((value) => {
      return BigInt(value);
    }),
]);

// Status Patch
export const validateStatusPatch = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("Employee ID is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Employee ID must be a positive integer")
    .customSanitizer((value) => {
      return BigInt(value);
    }),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .bail()
    .isIn(["AVAILABLE", "ON_DUTY", "OFF_DUTY"])
    .withMessage("status must be one of: AVAILABLE, ON_DUTY, OFF_DUTY"),
]);

// Employee Input
export const validateEmployeeInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("position")
    .notEmpty()
    .withMessage("position is required")
    .bail()
    .isIn(["PILOT", "FIRST_OFFICER", "FLIGHT_ATTENDANT"])
    .withMessage(
      "position must be one of: PILOT, FIRST_OFFICER, FLIGHT_ATTENDANT"
    ),
  body("licenseNumber").notEmpty().withMessage("licenseNumber is required"),
  body("experienceYears")
    .notEmpty()
    .withMessage("experienceYears is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("experienceYears must be a non-negative integer")
    .bail()
    .toInt(),
  body("assignedFlightId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("assignedFlightId must be a positive integer")
    .bail()
    .customSanitizer((value) => {
      return BigInt(value);
    }),
  body("status")
    .optional()
    .isIn(["AVAILABLE", "ON_DUTY", "OFF_DUTY"])
    .withMessage("status must be one of: AVAILABLE, ON_DUTY, OFF_DUTY"),
]);

// List Query
export const validateListQuery = withValidationErrors([
  query("assignedFlightId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("assignedFlightId must be a positive integer")
    .bail()
    .customSanitizer((value) => {
      return BigInt(value);
    }),
  query("status")
    .optional()
    .isIn(["AVAILABLE", "ON_DUTY", "OFF_DUTY"])
    .withMessage("status must be one of: AVAILABLE, ON_DUTY, OFF_DUTY"),
]);
