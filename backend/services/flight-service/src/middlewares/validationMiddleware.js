import { body, param, validationResult } from "express-validator";
import { CustomError } from "./customError.js";
import prisma from "../db/prismaClient.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
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

export const validateFlightIdParam = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("Flight ID parameter is required")
    .bail()
    .customSanitizer((value) => BigInt(value))
    .custom(async (value) => {
      const flight = await prisma.flight.findUnique({
        where: { id: value },
      });
      if (!flight) {
        throw new CustomError(`Flight with ID ${value} not found`, 404);
      }
    }),
]);

export const validateFlightInput = withValidationErrors([
  body("airlineId")
    .notEmpty()
    .withMessage("airlineId is required")
    .bail()
    .customSanitizer((value) => BigInt(value))
    .custom((value) => {
      if (value <= 0n) throw new Error("airlineId must be a positive bigint");
      return true;
    }),

  body("departureTime")
    .notEmpty()
    .withMessage("departureTime is required")
    .isISO8601()
    .withMessage("departureTime must be a valid date"),

  body("durationMinutes")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("durationMinutes must be a positive integer"),

  body("distanceKm")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("distanceKm must be a positive number"),

  body("sourceAirportCode")
    .notEmpty()
    .withMessage("sourceAirportCode is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("sourceAirportCode must be 3 letters (IATA code)"),

  body("destinationAirportCode")
    .notEmpty()
    .withMessage("destinationAirportCode is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("destinationAirportCode must be 3 letters (IATA code)"),

  body("aircraftTypeId")
    .notEmpty()
    .withMessage("aircraftTypeId is required")
    .bail()
    .customSanitizer((value) => BigInt(value))
    .custom((value) => {
      if (value <= 0n)
        throw new Error("aircraftTypeId must be a positive bigint");
      return true;
    }),

  body("status")
    .optional()
    .isIn(["scheduled", "ongoing", "delayed", "cancelled", "completed"])
    .withMessage("Invalid flight status value"),
]);

export const validateFlightStatus = withValidationErrors([
  body("status")
    .notEmpty()
    .withMessage("status is required for this operation")
    .isIn(["scheduled", "ongoing", "delayed", "cancelled", "completed"])
    .withMessage("Invalid flight status value"),
]);
