package com.airapp.pilotservice.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airapp.pilotservice.dto.PilotResponse;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;
import com.airapp.pilotservice.services.PilotService;

@RestController
@RequestMapping("/pilot-service")
public class PilotControllers 
{
    private final PilotService pilotService;

    public PilotControllers(PilotService pilotService) 
    {
        this.pilotService = pilotService;
    }

    // =================================================
    //                      GET REQUESTS
    // =================================================

    @GetMapping("/health")
    public ResponseEntity<Object> getHealth()
    {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                             .body(Map.of("Message", "Healthy"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PilotResponse> getPilot(@PathVariable Long id) 
    {
        PilotResponse pilot = pilotService.getPilot(id);
        return ResponseEntity.ok(pilot);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PilotResponse>> getAllPilots()
    {
        List<PilotResponse> allPilots = pilotService.getAllPilots();
        return ResponseEntity.ok(allPilots);
    }

    @GetMapping("/eligible")
    public ResponseEntity<List<PilotResponse>> getEligiblePilots(
            @RequestParam("vehicleType") VehicleType vehicleType, // Client: ?vehicleType=...
            @RequestParam("range") int range,                     // Client: &range=...
            @RequestParam("seniority") SeniorityLevel seniority   // Client: &seniority=...
    )
    {
        List<PilotResponse> pilots = pilotService.findEligiblePilots(
                vehicleType,
                range,
                seniority
        );

        return ResponseEntity.ok(pilots);
    }
}