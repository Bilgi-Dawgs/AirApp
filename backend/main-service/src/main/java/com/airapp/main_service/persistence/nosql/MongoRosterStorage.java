package com.airapp.main_service.persistence.nosql;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.persistence.RosterStorage;
import com.airapp.main_service.persistence.nosql.documents.RosterDocument;
import com.airapp.main_service.persistence.nosql.mappers.RosterMongoMapper;
import com.airapp.main_service.persistence.nosql.repositories.RosterMongoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class MongoRosterStorage implements RosterStorage
{
    private final RosterMongoRepository rosterRepository;

    @Override
    public Roster save(Roster roster)
    {
        RosterDocument doc = RosterMongoMapper.toDocument(roster);
        RosterDocument saved = rosterRepository.save(doc);
        return RosterMongoMapper.toDomain(saved);
    }

    @Override
    public Optional<Roster> findByFlightNumber(String flightNumber)
    {
        return rosterRepository
                .findByFlightNumber(flightNumber)
                .map(RosterMongoMapper::toDomain);
    }

    @Override
    public Optional<Roster> findById(Long id)
    {
        return Optional.empty();
    }

    @Override
    public boolean existsByFlightNumber(String flightNumber)
    {
        return rosterRepository.existsByFlightNumber(flightNumber);
    }

    @Override
    public List<Roster> findAll()
    {
        log.info("➡️ MONGO findAll START");

        List<RosterDocument> docs = rosterRepository.findAll();
        log.info("➡️ MONGO RAW DOC COUNT: {}", docs.size());

        List<Roster> mapped = docs.stream()
            .map(doc -> {
                log.info("➡️ MAPPING DOC flight={}", doc.getFlightNumber());
                return RosterMongoMapper.toDomain(doc);
            })
            .toList();

        log.info("➡️ MONGO findAll END");
        return mapped;
    }

}
