package com.airapp.main_service.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.dto.requests.GenerateRosterRequest;
import com.airapp.main_service.dto.responses.FlightResponse;
import com.airapp.main_service.dto.responses.PassengerResponse;
import com.airapp.main_service.services.RosterService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/rosters")
@RequiredArgsConstructor
public class RosterController {

    private final RosterService rosterService;

    @PostMapping("/{flightNumber}")
    public ResponseEntity<Roster> generateRoster(
            @PathVariable String flightNumber,
            @RequestBody GenerateRosterRequest request) {

        if (request.getStorageType() == null || request.getStorageType().isEmpty()) {
            request.setStorageType("sql");
        }

        Roster roster = rosterService.generateAndSave(flightNumber, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(roster);
    }

    @GetMapping("/{flightNumber}")
    public ResponseEntity<Roster> getRoster(@PathVariable String flightNumber) {
        return ResponseEntity.ok(rosterService.getRoster(flightNumber));
    }

    @GetMapping("/health")
    public ResponseEntity<String> getHealth() {
        return ResponseEntity.accepted().body("Roster Service is Healthy");
    }

    @GetMapping
    public ResponseEntity<List<Roster>> getAllRosters()
    {
        List<Roster> rosters = rosterService.getAllRosters();

        log.info("➡️ CONTROLLER RETURNING {} ROSTERS", rosters.size());

        return ResponseEntity.ok(rosters);
    }

    @GetMapping("/available-flights")
    public ResponseEntity<List<FlightResponse>> getAllAvailableFlights() {
        return ResponseEntity.ok(rosterService.getAllAvailableFlights());
    }


    @GetMapping("/passengers/{flightNumber}")
    public ResponseEntity<List<PassengerResponse>> getPassengers(@PathVariable String flightNumber) {
        return ResponseEntity.ok(rosterService.getPassengers(flightNumber));
    }

    @GetMapping("/pool/{flightNumber}")
    public ResponseEntity<List<RosterPerson>> getPool(@PathVariable String flightNumber) {
        return ResponseEntity.ok(rosterService.getPool(flightNumber));
    }

}
