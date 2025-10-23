import "express-async-errors";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import flightRoutes from "./routes/flightRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/flights", flightRoutes);

// Health
app.get("/health", (req, res) => res.json({ message: "ok" }));

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
  console.log(`Flight Service running on port ${PORT}`);
});
