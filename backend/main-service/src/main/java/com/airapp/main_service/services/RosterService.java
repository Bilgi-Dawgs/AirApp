package com.airapp.main_service.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.airapp.main_service.clients.CabinCrewClient;
import com.airapp.main_service.clients.FlightClient;
import com.airapp.main_service.clients.PassengerClient;
import com.airapp.main_service.clients.PilotClient;
import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.domains.RosterFlightInfo;
import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.domains.SeatPlan;
import com.airapp.main_service.dto.requests.GenerateRosterRequest;
import com.airapp.main_service.dto.responses.CabinCrewResponse;
import com.airapp.main_service.dto.responses.FlightResponse;
import com.airapp.main_service.dto.responses.PassengerResponse;
import com.airapp.main_service.dto.responses.PilotResponse;
import com.airapp.main_service.enums.AttendantType;
import com.airapp.main_service.enums.Recipes;
import com.airapp.main_service.enums.SeniorityLevel;
import com.airapp.main_service.enums.VehicleType;
import com.airapp.main_service.exceptions.FlightNotFoundException;
import com.airapp.main_service.exceptions.RosterAlreadyExistsException;
import com.airapp.main_service.exceptions.RosterRuleViolationException;
import com.airapp.main_service.mappers.CrewMapper;
import com.airapp.main_service.mappers.PassengerMapper;
import com.airapp.main_service.mappers.PilotMapper;
import com.airapp.main_service.persistence.RosterStorage;
import com.airapp.main_service.persistence.RosterStorageFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RosterService {
    // =============================
    // DOMAIN RULE CONSTANTS
    // =============================

    private static final int PILOT_COUNT = 2;

    private static final int MIN_CHIEF = 1;
    private static final int MAX_CHIEF = 4;

    private static final int MIN_JUNIOR = 4;
    private static final int MAX_JUNIOR = 16;

    private static final int MIN_CHEF = 0;
    private static final int MAX_CHEF = 2;

    // =============================
    // DEPENDENCIES
    // =============================
    private final FlightClient flightClient;
    private final PassengerClient passengerClient;
    private final PilotClient pilotClient;
    private final CabinCrewClient cabinCrewClient;

    private final PassengerMapper passengerMapper;
    private final PilotMapper pilotMapper;
    private final CrewMapper crewMapper;

    private final SeatAssignmentService seatAssignmentService;
    private final RosterStorageFactory storageFactory;

    // =============================
    // PUBLIC API
    // =============================
    @Transactional
    public Roster generateAndSave(String flightNumber, GenerateRosterRequest request) {
        RosterStorage storage = storageFactory.get(request.getStorageType());

        if (getRoster(flightNumber) != null) {
            throw new RosterAlreadyExistsException(flightNumber);
        }

        // Fetch flight using the corrected Client
        FlightResponse flight = flightClient.getFlight(flightNumber);
        if (flight == null) {
            throw new FlightNotFoundException(flightNumber);
        }

        Roster roster = new Roster();
        roster.setFlightNumber(flightNumber);
        roster.setFlightDate(flight.getDateTime());
        roster.setCreatedAt(LocalDateTime.now());
        roster.setFlightInfoSnapshot(buildFlightSnapshot(flight));
        roster.setPersons(new ArrayList<>());

        addPassengers(roster);
        addPilots(roster, flight, request);
        addCabinCrew(roster, flight, request);

        validateRoster(roster);

        seatAssignmentService.assignSeats(roster);

        return storage.save(roster);
    }

    public Roster getRoster(String flightNumber) {
        return storageFactory.resolveByFlightNumber(flightNumber);
    }

    // =============================
    // SNAPSHOT
    // =============================
    private RosterFlightInfo buildFlightSnapshot(FlightResponse flight) {
        if (flight == null) {
            throw new IllegalStateException("FlightResponse is null");
        }

        RosterFlightInfo info = new RosterFlightInfo();

        info.setFlightDurationMinutes(flight.getDurationMinutes());
        info.setFlightDistanceKm(
            flight.getDistanceKm() != null ? flight.getDistanceKm().doubleValue() : 0.0
        );

        info.setSourceAirportCode(flight.getSourceAirportCode());
        info.setDestinationAirportCode(flight.getDestinationAirportCode());

        if (flight.getVehicleType() != null) {
            var v = flight.getVehicleType();

            info.setVehicleModel(v.getModelName());
            info.setTotalSeatCount(v.getTotalSeats());

            if (v.getMenu() != null) {
                info.getMenu().addAll(v.getMenu());
            }

            if (v.getSeatPlan() != null) {
                var sp = v.getSeatPlan();
                SeatPlan seatPlan = new SeatPlan();

                int businessSeats = 0;
                if (sp.getBusiness() != null) {
                    var b = sp.getBusiness();
                    seatPlan.setBusiness(new SeatPlan.Business(
                        b.getLayout(),
                        b.getRows(),
                        b.getSeatsPerRow()
                    ));

                    if (b.getRows() != null) {
                        businessSeats = b.getRows().size() * b.getSeatsPerRow();
                    }
                }
                info.setBusinessSeatCount(businessSeats);

                int economySeats = 0;
                if (sp.getEconomy() != null && sp.getEconomy().getRange() != null && sp.getEconomy().getRange().size() == 2) {
                    var e = sp.getEconomy();
                    int start = e.getRange().get(0);
                    int end = e.getRange().get(1);
                    int rows = end - start + 1;
                    
                    economySeats = rows * e.getSeatsPerRow();

                    seatPlan.setEconomy(new SeatPlan.Economy(
                        e.getLayout(),
                        new SeatPlan.Range(start, end),
                        e.getSeatsPerRow()
                    ));
                }
                info.setEconomySeatCount(economySeats);
                
                info.setSeatPlan(seatPlan);
            }
        }

        if (flight.getSharedFlight() != null) {
            info.setSharedFlightNumber(flight.getSharedFlight().getFlightNumber());
            info.setSharedCompany(flight.getSharedFlight().getCompanyName());
        }

        return info;
    }

    // =============================
    // PASSENGERS
    // =============================
    private void addPassengers(Roster roster) {
        List<PassengerResponse> passengers = passengerClient.getPassengersByFlight(roster.getFlightNumber());

        if (passengers == null) {
            return;
        }

        passengers.stream()
                .map(passengerMapper::toRosterPerson)
                .filter(Objects::nonNull)
                .forEach(roster.getPersons()::add);
    }

    // =============================
    // PILOTS (1 SENIOR + 1 JUNIOR)
    // =============================
    private void addPilots(Roster roster, FlightResponse flight, GenerateRosterRequest request) {
        if (flight == null) {
            throw new RosterRuleViolationException("Flight data is missing");
        }

        if (flight.getVehicleType() == null || flight.getVehicleType().getModelName() == null) {
            throw new RosterRuleViolationException(
                    "Flight " + flight.getFlightNumber() + " has no vehicle information"
            );
        }

        VehicleType vehicle = resolveVehicleType(flight.getVehicleType().getModelName());

        int range = flight.getDistanceKm() != null ? flight.getDistanceKm() : 0;

        PilotResponse senior;
        PilotResponse junior;

        if (request.getManualPilotIds() != null && !request.getManualPilotIds().isEmpty()) {
            List<PilotResponse> pilots = pilotClient.getPilotsByIds(request.getManualPilotIds());

            senior = pilots.stream()
                    .filter(p -> p.getSeniority() == SeniorityLevel.SENIOR)
                    .findFirst()
                    .orElseThrow(() -> new RosterRuleViolationException("Manual pilots must include a SENIOR"));

            junior = pilots.stream()
                    .filter(p -> p.getSeniority() == SeniorityLevel.JUNIOR)
                    .findFirst()
                    .orElseThrow(() -> new RosterRuleViolationException("Manual pilots must include a JUNIOR"));
        } else {
            senior = firstOrFail(
                    pilotClient.findEligiblePilots(vehicle, range, SeniorityLevel.SENIOR),
                    "No eligible SENIOR pilot found"
            );

            junior = firstOrFail(
                    pilotClient.findEligiblePilots(vehicle, range, SeniorityLevel.JUNIOR),
                    "No eligible JUNIOR pilot found"
            );
        }

        roster.getPersons().add(pilotMapper.toRosterPerson(senior));
        roster.getPersons().add(pilotMapper.toRosterPerson(junior));
    }

    // =============================
    // CABIN CREW
    // =============================
    private void addCabinCrew(Roster roster, FlightResponse flight, GenerateRosterRequest request) {
        VehicleType vehicle = resolveVehicleType(flight.getVehicleType().getModelName());

        addCrewByRange(
                roster, vehicle, request.getManualCrewIds(),
                AttendantType.CHIEF, MIN_CHIEF, MAX_CHIEF,
                request.getSeniorAttendants()
        );

        addCrewByRange(
                roster, vehicle, request.getManualCrewIds(),
                AttendantType.REGULAR, MIN_JUNIOR, MAX_JUNIOR,
                request.getJuniorAttendants()
        );

        addChefs(
                roster, vehicle, request.getManualCrewIds(),
                request.getChefAttendants()
        );
    }

    private void addCrewByRange(
            Roster roster,
            VehicleType vehicle,
            List<Long> manualIds,
            AttendantType type,
            int min,
            int max,
            Integer requested
    ) {
        int desired = clamp(safe(requested), min, max);

        List<CabinCrewResponse> source = fetchCrew(vehicle, manualIds, type, desired);
        long available = source.stream().filter(Objects::nonNull).count();

        if (available < min) {
            throw new RosterRuleViolationException("Not enough " + type + " attendants (min " + min + ")");
        }

        source.stream()
                .filter(Objects::nonNull)
                .limit(desired)
                .map(crewMapper::toRosterPerson)
                .forEach(roster.getPersons()::add);
    }

    private void addChefs(Roster roster, VehicleType vehicle, List<Long> manualIds, Integer requested) {
        int desired = clamp(safe(requested), MIN_CHEF, MAX_CHEF);
        if (desired == 0) {
            return;
        }

        List<CabinCrewResponse> chefs = fetchCrew(vehicle, manualIds, AttendantType.CHEF, desired);

        chefs.stream()
                .filter(Objects::nonNull)
                .limit(desired)
                .forEach(chef -> {
                    roster.getPersons().add(crewMapper.toRosterPerson(chef));
                    applyChefRecipe(roster, chef);
                });
    }

    // =============================
    // HELPERS
    // =============================
    private List<CabinCrewResponse> fetchCrew(VehicleType vehicle, List<Long> manualIds, AttendantType type, int count) {
        if (manualIds != null && !manualIds.isEmpty()) {
            return cabinCrewClient.getCrewByIds(manualIds, type);
        }
        return cabinCrewClient.getEligibleCabinCrew(vehicle, type, count);
    }

    private void applyChefRecipe(Roster roster, CabinCrewResponse chef) {
        List<Recipes> recipes = new ArrayList<>(chef.getRecipes());
        if (recipes.size() < 2 || recipes.size() > 4) {
            throw new RosterRuleViolationException("Chef must have 2-4 recipes");
        }
        Recipes picked = recipes.get(ThreadLocalRandom.current().nextInt(recipes.size()));
        roster.getFlightInfoSnapshot().getMenu().add(picked);
    }

    private void validateRoster(Roster roster) {
        long pilots = roster.getPersons().stream()
                .filter(p -> "PILOT".equals(String.valueOf(p.getType())))
                .count();
        if (pilots != PILOT_COUNT) {
            throw new RosterRuleViolationException("Roster must contain exactly 2 pilots");
        }
    }

    private <T> T firstOrFail(List<T> list, String msg) {
        if (list == null || list.isEmpty()) {
            throw new RosterRuleViolationException(msg);
        }
        return list.get(0);
    }

    private VehicleType resolveVehicleType(String model) {
        try {
            return VehicleType.valueOf(
                    model.trim()
                            .toUpperCase(Locale.ROOT)
                            .replace('-', '_')
                            .replace(' ', '_')
            );
        } catch (Exception e) {
            throw new RosterRuleViolationException("Unknown vehicle type: " + model);
        }
    }

    private int clamp(int v, int min, int max) {
        return Math.max(min, Math.min(v, max));
    }

    private int safe(Integer v) {
        return v == null ? 0 : v;
    }

    // =============================
    // EXCEPTION
    // =============================
    public List<Roster> getAllRosters() {
        log.info("➡️ getAllRosters START");
        List<Roster> result = new ArrayList<>();
        for (String storageType : storageFactory.getAllStorageTypes()) {
            RosterStorage storage = storageFactory.get(storageType);
            result.addAll(storage.findAll());
        }
        log.info("➡️ getAllRosters END");
        return result;
    }

    private Set<String> getUsedFlightNumbers() {
        Set<String> usedFlightNumbers = new HashSet<>();
        for (String storageType : storageFactory.getAllStorageTypes()) {
            RosterStorage storage = storageFactory.get(storageType);
            List<Roster> rosters = storage.findAll();
            usedFlightNumbers.addAll(
                    rosters.stream()
                            .map(Roster::getFlightNumber)
                            .collect(Collectors.toSet())
            );
        }
        return usedFlightNumbers;
    }

    @Transactional(readOnly = true)
    public List<FlightResponse> getAllAvailableFlights() {
        Set<String> usedFlightNumbers = getUsedFlightNumbers();
        List<FlightResponse> allFlights = flightClient.getAllFlights();

        return allFlights.stream()
                .filter(flight -> !usedFlightNumbers.contains(flight.getFlightNumber()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PassengerResponse> getPassengers(String flightNumber) {
        List<PassengerResponse> passengers = passengerClient.getPassengersByFlight(flightNumber);
        return passengers == null ? new ArrayList<>() : passengers;
    }

    public List<RosterPerson> getPool(String flightNumber) {
        List<RosterPerson> pool = new ArrayList<>();

        FlightResponse flight = flightClient.getFlight(flightNumber);
        if (flight == null) {
            throw new RosterRuleViolationException("Flight not found: " + flightNumber);
        }

        VehicleType vehicle = resolveVehicleType(flight.getVehicleType().getModelName());
        int range = flight.getDistanceKm();

        pilotClient.findEligiblePilots(vehicle, range, SeniorityLevel.JUNIOR).stream()
                .map(pilotMapper::toRosterPerson).forEach(pool::add);
        pilotClient.findEligiblePilots(vehicle, range, SeniorityLevel.SENIOR).stream()
                .map(pilotMapper::toRosterPerson).forEach(pool::add);
        pilotClient.findEligiblePilots(vehicle, range, SeniorityLevel.TRAINEE).stream()
                .map(pilotMapper::toRosterPerson).forEach(pool::add);

        cabinCrewClient.getEligibleCabinCrew(vehicle, AttendantType.CHIEF, 10000).stream()
                .map(crewMapper::toRosterPerson).forEach(pool::add);
        cabinCrewClient.getEligibleCabinCrew(vehicle, AttendantType.REGULAR, 10000).stream()
                .map(crewMapper::toRosterPerson).forEach(pool::add);
        cabinCrewClient.getEligibleCabinCrew(vehicle, AttendantType.CHEF, 10000).stream()
                .map(crewMapper::toRosterPerson).forEach(pool::add);

        return pool;
    }
}
