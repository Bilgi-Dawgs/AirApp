package com.airapp.main_service.dto.responses;

import com.airapp.main_service.enums.SeniorityLevel;
import com.airapp.main_service.enums.VehicleType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PilotResponse {
    private Long id;
    private String name;
    
    // We keep these as String or Map them to Main Service Enums later
    private VehicleType vehicleRestriction; 
    private int allowedRangeKm;
    private SeniorityLevel seniority; 
}