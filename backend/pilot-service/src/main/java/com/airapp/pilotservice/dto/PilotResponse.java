package com.airapp.pilotservice.dto;

import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PilotResponse 
{

    private Long id;

    private String name;

    private VehicleType vehicleRestriction;

    private int allowedRangeKm;

    private SeniorityLevel seniority;

}
