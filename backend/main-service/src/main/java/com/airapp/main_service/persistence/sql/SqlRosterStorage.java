package com.airapp.main_service.persistence.sql;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.persistence.RosterStorage;
import com.airapp.main_service.persistence.sql.entities.RosterEntity;
import com.airapp.main_service.persistence.sql.mappers.RosterSqlMapper;
import com.airapp.main_service.persistence.sql.repositories.RosterJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SqlRosterStorage implements RosterStorage
{
    private final RosterJpaRepository rosterRepository;
    
    @Override
    @Transactional
    public Roster save(Roster roster)
    {
        RosterEntity entity = RosterSqlMapper.toEntity(roster);

        // Ensure bidirectional relation is consistent
        if (entity.getPersons() != null)
        {
            entity.getPersons().forEach(p -> p.setRoster(entity));
        }

        RosterEntity saved = rosterRepository.save(entity);

        return RosterSqlMapper.toDomain(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Roster> findByFlightNumber(String flightNumber)
    {
        return rosterRepository.findByFlightNumber(flightNumber)
                               .map(RosterSqlMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Roster> findById(Long id)
    {
        return rosterRepository.findById(id)
                               .map(RosterSqlMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByFlightNumber(String flightNumber)
    {
        return rosterRepository.existsByFlightNumber(flightNumber);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Roster> findAll()
    {
        return rosterRepository.findAll()
            .stream()
            .map(RosterSqlMapper::toDomain)
            .toList();
    }
}
