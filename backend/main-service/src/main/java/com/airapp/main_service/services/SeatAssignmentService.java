package com.airapp.main_service.services;

import org.springframework.stereotype.Service;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.domains.RosterFlightInfo;
import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.enums.PersonType;
import com.airapp.main_service.enums.SeatType;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SeatAssignmentService {

    public void assignSeats(Roster roster) {

        Set<String> occupiedSeats = new HashSet<>();

        List<RosterPerson> passengers = roster.getPersons().stream()
                .filter(p -> p.getType() == PersonType.PASSENGER)
                .collect(Collectors.toList());

        passengers.stream()
                .map(RosterPerson::getSeatNumber)
                .filter(Objects::nonNull)
                .forEach(occupiedSeats::add);

        RosterFlightInfo info = roster.getFlightInfoSnapshot();

        // Affiliated passengers
        for (RosterPerson p : passengers) {
            if (shouldAssignSeat(p) && hasAffiliations(p)) {
                assignNeighboringSeats(p, passengers, occupiedSeats, info);
            }
        }

        // Remaining individuals
        for (RosterPerson p : passengers) {
            if (shouldAssignSeat(p)) {
                try {
                    String seat = findNextFreeSeat(p.getSeatType(), occupiedSeats, info);
                    p.setSeatNumber(seat);
                    p.setAssignedAutomatically(true);
                    occupiedSeats.add(seat);
                } catch (IllegalStateException ignored) {}
            }
        }
    }

    // =============================
    // Helpers
    // =============================

    private boolean shouldAssignSeat(RosterPerson p) {
        return p.getSeatNumber() == null && !Boolean.TRUE.equals(p.getIsInfant());
    }

    private boolean hasAffiliations(RosterPerson p) {
        return p.getAffiliatedWith() != null && !p.getAffiliatedWith().isEmpty();
    }

    private void assignNeighboringSeats(
            RosterPerson primary,
            List<RosterPerson> all,
            Set<String> occupied,
            RosterFlightInfo info
    ) {
        try {
            String primarySeat = findNextFreeSeat(primary.getSeatType(), occupied, info);
            primary.setSeatNumber(primarySeat);
            primary.setAssignedAutomatically(true);
            occupied.add(primarySeat);

            for (String partnerId : primary.getAffiliatedWith()) {
                all.stream()
                    .filter(p -> partnerId.equals(p.getPersonId()) && shouldAssignSeat(p))
                    .findFirst()
                    .ifPresent(p -> {
                        try {
                            SeatType type = Optional.ofNullable(p.getSeatType())
                                                    .orElse(primary.getSeatType());
                            String seat = findNextFreeSeat(type, occupied, info);
                            p.setSeatNumber(seat);
                            p.setAssignedAutomatically(true);
                            occupied.add(seat);
                        } catch (IllegalStateException ignored) {}
                    });
            }
        } catch (IllegalStateException ignored) {}
    }

    private String findNextFreeSeat(
            SeatType type,
            Set<String> occupied,
            RosterFlightInfo info
    ) {
        String prefix = (type == SeatType.BUSINESS) ? "B" : "E";
        int capacity = (type == SeatType.BUSINESS)
                ? info.getBusinessSeatCount()
                : info.getEconomySeatCount();

        for (int i = 1; i <= capacity; i++) {
            String seat = prefix + i;
            if (!occupied.contains(seat)) {
                return seat;
            }
        }
        throw new IllegalStateException("No " + type + " seats remaining");
    }
}
