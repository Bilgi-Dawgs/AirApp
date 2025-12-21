package com.airapp.main_service.dto.responses;

import java.time.LocalDateTime;
import java.util.List;

import com.airapp.main_service.enums.Recipes;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FlightResponse {
    private String flightNumber;
    private LocalDateTime dateTime;
    private Integer durationMinutes;
    private Integer distanceKm;

    // Flat fields matching JSON
    private String sourceAirportCode;
    private String destinationAirportCode;

    // Nested Objects
    private VehicleTypeDTO vehicleType;
    private SharedFlightDTO sharedFlight;

    @Data
    @NoArgsConstructor
    public static class VehicleTypeDTO {
        private String id;
        private String modelName;
        private Integer totalSeats;
        private SeatPlanDTO seatPlan;
        private Integer requiredPilots;
        private Integer requiredAttendants;
        private List<Recipes> menu;
    }

    @Data
    @NoArgsConstructor
    public static class SeatPlanDTO {
        private EconomySectionDTO economy;
        private BusinessSectionDTO business;
    }

    @Data
    @NoArgsConstructor
    public static class EconomySectionDTO {
        private List<Integer> range;
        private String layout;
        private int seatsPerRow;
    }

    @Data
    @NoArgsConstructor
    public static class BusinessSectionDTO {
        private List<Integer> rows;
        private String layout;
        private int seatsPerRow;
    }

    @Data
    @NoArgsConstructor
    public static class SharedFlightDTO {
        private String flightNumber;
        private String companyName;
    }
}