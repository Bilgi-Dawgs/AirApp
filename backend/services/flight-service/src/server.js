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
app.use("/api/flights", flightRoutes);

// Health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler (add middleware)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
  console.log(`Flight Service running on port ${PORT}`);
});
