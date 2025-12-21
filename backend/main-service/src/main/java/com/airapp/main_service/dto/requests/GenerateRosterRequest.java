package com.airapp.main_service.dto.requests;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenerateRosterRequest {

    private String storageType; 

    private List<Long> manualPilotIds;
    private List<Long> manualCrewIds;

    private int seniorAttendants = 1;
    private int juniorAttendants = 4;
    private int chefAttendants = 0;
}