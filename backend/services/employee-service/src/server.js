import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Health
app.get("/health", (req, res) => res.json({ message: "ok" }));

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Employee Service running on port ${PORT}`);
});
