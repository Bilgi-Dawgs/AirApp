import jwt from "jsonwebtoken";
import { CustomError } from "./customError.js";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    // debug
    // console.log("JWT payload:", { userId, role });

    req.user = { userId, role };
    next();
  } catch (err) {
    throw new CustomError("Invalid token", 401);
  }
};

export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new CustomError("Forbidden: insufficient permissions", 403);
    }
    next();
  };
};
