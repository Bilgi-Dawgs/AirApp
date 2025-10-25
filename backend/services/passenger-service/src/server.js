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

const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Flight Service running on port ${PORT}`);
});
