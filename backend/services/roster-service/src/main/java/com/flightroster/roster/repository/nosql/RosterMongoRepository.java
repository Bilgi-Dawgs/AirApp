package com.flightroster.roster.repository.nosql;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.flightroster.roster.entity.Roster;
import com.flightroster.roster.repository.RosterRepositoryBase;

@Repository
public interface RosterMongoRepository extends MongoRepository<Roster, Long>, RosterRepositoryBase { }
