import { body, param, validationResult } from "express-validator";
import { CustomError } from "./customError.js";

const withValidationErrors = (validators) => {
  return [
    validators,
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
    .isInt({ gt: 0 })
    .withMessage("Passenger ID must be a positive integer")
    .toInt(),
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
    .isInt({ gt: 0 })
    .withMessage("flightId must be a positive integer")
    .toInt(),
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
