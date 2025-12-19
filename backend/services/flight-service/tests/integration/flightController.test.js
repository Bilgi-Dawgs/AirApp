import "express-async-errors";
import { prismaMock } from "../helpers/prismaMock";
import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import flightRouter from "../../src/routes/flightRoutes.js";
import { CustomError } from "../../src/middlewares/customError.js";

const app = express();
app.use(express.json());

// Router
app.use("/api/flights", flightRouter);

// Error Handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});

describe("Flight Controller Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 if flight number format is invalid", async () => {
    const res = await request(app).get("/api/flights/INVALID");
    expect(res.status).toBe(400);
    expect(prismaMock.flight.findUnique).not.toHaveBeenCalled();
  });

  it("should return 400 if flight does not exist (Validation Error)", async () => {
    prismaMock.flight.findUnique.mockResolvedValue(null);

    const res = await request(app).get("/api/flights/TK9999");

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);

    expect(prismaMock.flight.findUnique).toHaveBeenCalled();
  });

  it("should return 200 and flight details if flight exists", async () => {
    const mockFlight = {
      flightNumber: "TK1920",
      sourceAirportCode: "IST",
      dateTime: new Date(),
      vehicleType: { modelName: "BOEING_777" },
      sharedFlight: null,
    };

    prismaMock.flight.findUnique.mockResolvedValue(mockFlight);

    const res = await request(app).get("/api/flights/TK1920");

    expect(res.status).toBe(200);
    expect(res.body.flight).toHaveProperty("flightNumber", "TK1920");
  });

  it("should return 500 if database fails unexpectedly", async () => {
    prismaMock.flight.findUnique.mockRejectedValue(new Error("DB Fail"));

    const res = await request(app).get("/api/flights/TK1920");

    expect(res.status).toBe(500);
  });
});
