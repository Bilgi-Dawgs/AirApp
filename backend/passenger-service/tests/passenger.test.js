import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "./prismaMock.js";
import request from "supertest";
import app from "../src/server.js";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

describe("Passenger Service API Tests", () => {
  describe("GET /passengers", () => {
    it("should return a list of passengers", async () => {
      const mockPassengers = [
        { id: 1n, name: "John Doe", flightNumber: "TK1920", seatNumber: "1A" },
        { id: 2n, name: "Jane Doe", flightNumber: "TK1920", seatNumber: "1B" },
      ];

      prismaMock.passenger.findMany.mockResolvedValue(mockPassengers);

      const res = await request(app).get("/passengers");

      expect(res.statusCode).toBe(200);
      expect(res.body.passengers).toHaveLength(2);
      expect(res.body.passengers[0].id).toBe("1");
    });
  });

  describe("GET /passengers/:pid", () => {
    it("should return a passenger when valid ID is provided", async () => {
      const mockPassenger = {
        id: 10n,
        name: "Test User",
        flightNumber: "TK1920",
      };

      prismaMock.passenger.findUniqueOrThrow.mockResolvedValue(mockPassenger);

      const res = await request(app).get("/passengers/10");

      expect(res.statusCode).toBe(200);
      expect(res.body.passenger.name).toBe("Test User");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/passengers/abc");
      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /passengers/by-flight/:flightNumber", () => {
    it("should return passengers for a valid flight number", async () => {
      const mockList = [
        {
          id: 5n,
          name: "Ali Veli",
          flightNumber: "TK1920",
          infants: [],
          guardian: null,
        },
      ];

      prismaMock.passenger.findMany.mockResolvedValue(mockList);

      const res = await request(app).get("/passengers/by-flight/TK1920");

      expect(res.statusCode).toBe(200);
      expect(res.body.passengers).toHaveLength(1);
    });

    it("should return 400 for invalid flight number format", async () => {
      const res = await request(app).get("/passengers/by-flight/TK1");
      expect(res.statusCode).toBe(400);
    });
  });
});
