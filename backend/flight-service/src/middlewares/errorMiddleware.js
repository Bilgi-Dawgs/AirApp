import { CustomError } from "./customError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error caught:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Prisma errors (runtime)
  switch (err.code) {
    case "P2000":
      statusCode = 400;
      message = `Value too long for field: ${err.meta?.target || "unknown"}`;
      break;

    case "P2001":
      statusCode = 404;
      message = `Record not found for: ${err.meta?.target || "unknown"}`;
      break;

    case "P2002":
      statusCode = 400;
      message = `Duplicate field value: ${err.meta?.target || "unknown field"}`;
      break;

    case "P2003":
      statusCode = 400;
      message = `Foreign key constraint failed on field: ${
        err.meta?.field_name || "unknown"
      }`;
      break;

    case "P2004":
      statusCode = 400;
      message = `Constraint failed on the database: ${
        err.meta?.constraint || "unknown"
      }`;
      break;

    case "P2005":
      statusCode = 400;
      message = `Invalid value for field type: ${
        err.meta?.field_name || "unknown"
      }`;
      break;

    case "P2006":
      statusCode = 400;
      message = `Invalid data type for field: ${
        err.meta?.field_name || "unknown"
      }`;
      break;

    case "P2011":
      statusCode = 400;
      message = `Null constraint failed on field: ${
        err.meta?.path || "unknown"
      }`;
      break;

    case "P2014":
      statusCode = 400;
      message = `Relation violation: ${
        err.meta?.relation_name || "unknown relation"
      }`;
      break;

    case "P2025":
      statusCode = 404;
      message = `Operation failed: record not found`;
      break;

    case "P2033":
      statusCode = 400;
      message = `Invalid date/time format`;
      break;
  }

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // (express-validator)
  // if (err.errors && Array.isArray(err.errors)) {
  //   message = err.errors.map((e) => e.msg).join(", ");
  //   statusCode = 400;
  // }
  res.status(statusCode).json({ error: message });
};
