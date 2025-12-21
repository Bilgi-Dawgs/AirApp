package com.airapp.main_service.persistence;

import java.util.List;
import java.util.Optional;

import com.airapp.main_service.domains.Roster;

public interface RosterStorage
{
    Roster save(Roster roster);

    Optional<Roster> findByFlightNumber(String flightNumber);

    Optional<Roster> findById(Long id);

    List<Roster> findAll();

    boolean existsByFlightNumber(String flightNumber);
}
