package com.airapp.main_service.dto.responses;

import java.util.List;

import lombok.Data;

@Data
public class PassengerResponse {
    private String id;
    private String name;
    private Integer age;
    private String gender;
    private String nationality;
    private String seatType;   // "BUSINESS" or "ECONOMY"
    private String seatNumber; // e.g., "1A" or null
    private String flightNumber;
    
    // JSON logic: guardianId is null for adults, populated for infants
    private String guardianId; 
    
    // JSON logic: affiliatedWith is a list of IDs ["5", "6"]
    private List<String> affiliatedWith; 

}