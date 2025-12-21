package com.airapp.crewservice.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airapp.crewservice.dto.CabinCrewResponse;
import com.airapp.crewservice.enums.AttendantType;
import com.airapp.crewservice.enums.VehicleType;
import com.airapp.crewservice.services.CabinCrewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cabin-crew-service")
@RequiredArgsConstructor
public class CabinCrewController 
{
    private final CabinCrewService cabinCrewService;

    // =================================================
    //                      GET REQUESTS
    // =================================================

    @GetMapping("/health")
    public ResponseEntity<Object> getHealth() {
        return ResponseEntity.accepted().body(Map.of("message", "Healthy"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CabinCrewResponse> getCabinCrew(@PathVariable Long id) {
        return ResponseEntity.ok(cabinCrewService.getCabinCrew(id));
    }


    @GetMapping("/all")
    public ResponseEntity<List<CabinCrewResponse>> getAllCabinCrew() {
        return ResponseEntity.ok(cabinCrewService.getAllCabinCrew());
    }

    @GetMapping("/eligible")
    public ResponseEntity<List<CabinCrewResponse>> getEligibleCabinCrew(
            @RequestParam("vehicleType") VehicleType vehicleType, // Client: ?vehicleType=...
            @RequestParam("type") AttendantType type             // Client: &type=...
    ) {
        List<CabinCrewResponse> eligibleCrew = cabinCrewService.findEligibleCabinCrew(vehicleType, type);
        return ResponseEntity.ok(eligibleCrew);
    }

    @GetMapping("/by-ids")
    public ResponseEntity<List<CabinCrewResponse>> getCrewByIds(
        @RequestParam List<Long> ids,
        @RequestParam AttendantType type
    )
    {
        if (ids == null || ids.isEmpty())
            return ResponseEntity.badRequest().build();

        List<CabinCrewResponse> crew =
            cabinCrewService.getCrewByIds(ids, type);

        return ResponseEntity.ok(crew);
    }

}