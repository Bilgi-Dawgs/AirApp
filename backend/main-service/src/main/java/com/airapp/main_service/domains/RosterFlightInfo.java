package com.airapp.main_service.domains;

import java.util.ArrayList;
import java.util.List;

import com.airapp.main_service.enums.Recipes;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RosterFlightInfo {

    // === Airports ===
    private String sourceAirportCode;
    private String sourceCity;
    
    private String destinationAirportCode;
    private String destinationCity;

    // === Aircraft & Snapshot Data ===
    private String vehicleModel;       
    private Integer totalSeatCount;
    
    // CRITICAL: Calculated from Flight JSON's seatPlan for the Algorithm
    private int businessSeatCount;
    private int economySeatCount;

    // === Flight Details ===
    private Integer flightDurationMinutes;
    private Double flightDistanceKm;

    // === Menu ===
    // Combined from Flight JSON menu + Chef's special recipes
    private List<Recipes> menu = new ArrayList<>();

    // === Shared Flight ===
    private String sharedFlightNumber;
    private String sharedCompany;

    private SeatPlan seatPlan;
}
