import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prismaMock";
import {
  getAllFlights,
  getFlightByNumber,
} from "../../src/services/flightService.js";

// White Box Testing

describe("Flight Service (Unit Tests)", () => {
  it("should return all flights with relations included", async () => {
    const mockFlights = [
      {
        flightNumber: "TK1234",
        sourceAirportCode: "IST",
        destinationAirportCode: "JFK",
      },
    ];
    prismaMock.flight.findMany.mockResolvedValue(mockFlights);

    const result = await getAllFlights({});

    expect(result).toHaveLength(1);
    expect(result[0].flightNumber).toBe("TK1234");
    expect(prismaMock.flight.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          sharedFlight: true,
          vehicleType: true,
        }),
      })
    );
  });

  it("should apply filters for origin and destination", async () => {
    prismaMock.flight.findMany.mockResolvedValue([]);

    const filters = { origin: "IST", destination: "JFK" };
    await getAllFlights(filters);

    expect(prismaMock.flight.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          sourceAirportCode: "IST",
          destinationAirportCode: "JFK",
        },
      })
    );
  });

  it("should return a specific flight by flightNumber", async () => {
    const mockFlight = { flightNumber: "TK1071", durationMinutes: 60 };
    prismaMock.flight.findUnique.mockResolvedValue(mockFlight);

    const result = await getFlightByNumber("TK1071");

    expect(result).toEqual(mockFlight);
    expect(prismaMock.flight.findUnique).toHaveBeenCalledWith({
      where: { flightNumber: "TK1071" },
      include: expect.any(Object),
    });
  });

  it("should return null if flight does not exist", async () => {
    prismaMock.flight.findUnique.mockResolvedValue(null);

    const result = await getFlightByNumber("TK9999");

    expect(result).toBeNull();
  });
});
