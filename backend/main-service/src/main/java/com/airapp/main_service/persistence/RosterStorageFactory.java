package com.airapp.main_service.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.persistence.nosql.MongoRosterStorage;
import com.airapp.main_service.persistence.sql.SqlRosterStorage;

@Component
public class RosterStorageFactory 
{

    private final SqlRosterStorage sqlStorage;
    private final MongoRosterStorage mongoStorage;

    public RosterStorageFactory(SqlRosterStorage sqlStorage, MongoRosterStorage mongoStorage) {
        this.sqlStorage = sqlStorage;
        this.mongoStorage = mongoStorage;
    }

    public RosterStorage get(String storageType) {
        if (storageType == null) return sqlStorage;

        return switch (storageType.toLowerCase()) {
            case "mongo", "mongodb", "nosql" -> mongoStorage;
            case "sql" -> sqlStorage;
            default -> throw new IllegalArgumentException("Unsupported storage type: " + storageType);
        };
    }


    public Roster resolveByFlightNumber(String flightNumber) 
    {
        Optional<Roster> roster = sqlStorage.findByFlightNumber(flightNumber);
        if (roster.isPresent()) 
            return roster.get();

        return mongoStorage.findByFlightNumber(flightNumber).orElse(null);
    }

    public Iterable<String> getAllStorageTypes() 
    {
        return java.util.List.of("sql", "nosql");
    }
}