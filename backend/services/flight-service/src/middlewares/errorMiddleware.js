export const errorHandler = (err, req, res, next) => {
  console.error("Error caught:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Prisma Unique Constraint --> ValidationMiddleware will be added
  if (err.code === "P2002") {
    statusCode = 400;
    message = `Duplicate field value: ${err.meta?.target}`;
  }

  // Validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.isCustom) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Dev
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      error: message,
      stack: err.stack,
    });
  }

  // Prod
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
