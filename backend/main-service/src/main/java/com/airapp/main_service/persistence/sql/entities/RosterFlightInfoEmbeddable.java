package com.airapp.main_service.persistence.sql.entities;

import java.util.ArrayList;
import java.util.List;

import com.airapp.main_service.enums.Recipes;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class RosterFlightInfoEmbeddable
{
    private String sourceAirportCode;
    private String sourceCity;

    private String destinationAirportCode;
    private String destinationCity;

    private String vehicleModel;
    private Integer totalSeatCount;

    private int businessSeatCount;
    private int economySeatCount;

    private Integer flightDurationMinutes;
    private Double flightDistanceKm;

    @ElementCollection
    private List<Recipes> menu = new ArrayList<>();

    private String sharedFlightNumber;
    private String sharedCompany;

    @Embedded
    private SeatPlanEmbeddable seatPlan;
}
