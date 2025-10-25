package com.flightroster.roster.repository;

import java.util.List;
import java.util.Optional;

import com.flightroster.roster.entity.Roster;

/**
 * @brief Common repository interface for SQL and NoSQL implementations.
 * @details Allows RosterService to access repositories in a unified way.
 */
public interface RosterRepositoryBase
{
    Roster save(Roster roster);

    List<Roster> findAll();

    Optional<Roster> findById(Long id);

    void deleteById(Long id);

    boolean existsById(Long id);
}
