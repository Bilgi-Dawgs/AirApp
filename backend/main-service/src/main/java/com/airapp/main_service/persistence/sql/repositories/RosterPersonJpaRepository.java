package com.airapp.main_service.persistence.sql.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airapp.main_service.persistence.sql.entities.RosterPersonEntity;

public interface RosterPersonJpaRepository extends JpaRepository<RosterPersonEntity, Long>
{
    List<RosterPersonEntity> findByRosterId(Long rosterId);
}
