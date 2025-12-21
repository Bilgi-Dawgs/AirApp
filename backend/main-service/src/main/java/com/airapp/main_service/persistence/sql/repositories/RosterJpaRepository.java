package com.airapp.main_service.persistence.sql.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airapp.main_service.persistence.sql.entities.RosterEntity;

public interface RosterJpaRepository extends JpaRepository<RosterEntity, Long>
{
    Optional<RosterEntity> findByFlightNumber(String flightNumber);

    boolean existsByFlightNumber(String flightNumber);
}
