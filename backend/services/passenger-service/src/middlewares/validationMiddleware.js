import { body, param, query, validationResult } from "express-validator";
import { CustomError } from "./customError.js";

const withValidationErrors = (validators) => {
  return [
    ...validators,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg);
        throw new CustomError(messages.join(", "), 400);
      }
      next();
    },
  ];
};

export const validatePassengerIdParam = withValidationErrors([
  param("pid")
    .notEmpty()
    .withMessage("Passenger ID is required")
    .bail()
    .matches(/^\d+$/)
    .withMessage("Passenger ID must be a positive integer")
    .bail()
    .customSanitizer((value) => BigInt(value))
    .custom((value) => {
      if (value <= 0n) throw new Error("passengerId must be a positive bigint");
      return true;
    }),
]);

export const validateFlightNumberParam = withValidationErrors([
  param("flightNumber")
    .notEmpty()
    .withMessage("Flight number parameter is required")
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{2}\d{4}$/)
    .withMessage("Flight number must be in 'AANNNN' format (e.g., TK1071)"),
]);

/*
// Query
export const validateFlightNumberQuery = withValidationErrors([
  query("flightNumber")
    .notEmpty()
    .withMessage("Flight number query parameter is required")
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{2}\d{4}$/)
    .withMessage("Flight number must be in 'AANNNN' format (e.g., TK1071)"),
]);

export const validatePassengerInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("passportNumber")
    .notEmpty()
    .withMessage("passportNumber is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("passportNumber length should be between 5-20"),
  body("ticketNumber")
    .notEmpty()
    .withMessage("ticketNumber is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("ticketNumber length should be between 3-20"),
  body("flightId")
    .notEmpty()
    .withMessage("flightId is required")
    .bail()
    .customSanitizer((value) => BigInt(value))
    .custom((value) => {
      if (value <= 0n) throw new Error("flightID must be a positive bigint");
      return true;
    }),
  body("classType")
    .notEmpty()
    .withMessage("classType is required")
    .bail()
    .isIn(["economy", "business", "first"])
    .withMessage("classType must be one of: economy, business, first"),
  body("nationality")
    .notEmpty()
    .withMessage("nationality is required")
    .isLength({ min: 2, max: 3 })
    .withMessage("nationality should be 2-3 chars ISO code"),
  body("seatNumber")
    .optional()
    .isString()
    .withMessage("seatNumber must be a string"),
]);
*/
