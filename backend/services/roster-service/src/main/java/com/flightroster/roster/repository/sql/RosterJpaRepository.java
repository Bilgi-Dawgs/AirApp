package com.flightroster.roster.repository.sql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightroster.roster.entity.Roster;
import com.flightroster.roster.repository.RosterRepositoryBase;

@Repository
public interface RosterJpaRepository extends JpaRepository<Roster, Long>, RosterRepositoryBase { }
