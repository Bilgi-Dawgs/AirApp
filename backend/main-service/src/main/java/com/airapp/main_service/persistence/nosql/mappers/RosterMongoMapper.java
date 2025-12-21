package com.airapp.main_service.persistence.nosql.mappers;

import java.util.ArrayList;
import java.util.HashSet;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.domains.RosterFlightInfo;
import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.exceptions.RosterMappingException;
import com.airapp.main_service.persistence.nosql.documents.RosterDocument;
import com.airapp.main_service.persistence.nosql.documents.RosterPersonDocument;

public final class RosterMongoMapper
{
    private RosterMongoMapper() {}

    // =================================================
    // DOCUMENT -> DOMAIN
    // =================================================

    public static Roster toDomain(RosterDocument doc)
    {
        if (doc == null)
            throw new RosterMappingException("RosterDocument is null");

        if (doc.getFlightNumber() == null)
            throw new RosterMappingException("FlightNumber is null in Mongo document");

        Roster roster = new Roster();

        roster.setId(null); // Mongo ID domain'e taşınmaz
        roster.setFlightNumber(doc.getFlightNumber());
        roster.setFlightDate(doc.getFlightDate());
        roster.setCreatedAt(doc.getCreatedAt());

        roster.setFlightInfoSnapshot(
            toDomainFlightInfo(doc.getFlightInfoSnapshot())
        );

        roster.setPersons(
            doc.getPersons() == null
                ? new ArrayList<>()
                : doc.getPersons()
                      .stream()
                      .map(RosterMongoMapper::toDomainPerson)
                      .toList()
        );

        return roster;
    }

    private static RosterFlightInfo toDomainFlightInfo(RosterFlightInfo src)
    {
        if (src == null)
            return null;

        RosterFlightInfo info = new RosterFlightInfo();

        info.setSourceAirportCode(src.getSourceAirportCode());
        info.setSourceCity(src.getSourceCity());
        info.setDestinationAirportCode(src.getDestinationAirportCode());
        info.setDestinationCity(src.getDestinationCity());

        info.setVehicleModel(src.getVehicleModel());
        info.setTotalSeatCount(src.getTotalSeatCount());
        info.setBusinessSeatCount(src.getBusinessSeatCount());
        info.setEconomySeatCount(src.getEconomySeatCount());

        info.setFlightDurationMinutes(src.getFlightDurationMinutes());
        info.setFlightDistanceKm(src.getFlightDistanceKm());

        info.setMenu(
            src.getMenu() == null
                ? new ArrayList<>()
                : new ArrayList<>(src.getMenu())
        );

        info.setSharedFlightNumber(src.getSharedFlightNumber());
        info.setSharedCompany(src.getSharedCompany());

        return info;
    }

    private static RosterPerson toDomainPerson(RosterPersonDocument doc)
    {
        if (doc == null)
            return null;

        RosterPerson p = new RosterPerson();

        p.setId(null);
        p.setPersonId(doc.getPersonId());
        p.setType(doc.getType());
        p.setName(doc.getName());
        p.setAge(doc.getAge());
        p.setGender(doc.getGender());
        p.setNationality(doc.getNationality());

        p.setSeatNumber(doc.getSeatNumber());
        p.setAssignedAutomatically(doc.isAssignedAutomatically());

        p.setIsInfant(doc.getIsInfant());
        p.setSeatType(doc.getSeatType());
        p.setParentId(doc.getParentId());

        p.setAffiliatedWith(
            doc.getAffiliatedWith() == null
                ? new ArrayList<>()
                : new ArrayList<>(doc.getAffiliatedWith())
        );

        p.setSeniority(doc.getSeniority());
        p.setAttendantType(doc.getAttendantType());

        p.setKnownRecipes(
            doc.getKnownRecipes() == null
                ? new HashSet<>()
                : new HashSet<>(doc.getKnownRecipes())
        );

        p.setVehicleRestrictions(
            doc.getVehicleRestrictions() == null
                ? new HashSet<>()
                : new HashSet<>(doc.getVehicleRestrictions())
        );

        p.setPilotVehicleRestriction(doc.getPilotVehicleRestriction());
        p.setAllowedRangeKm(doc.getAllowedRangeKm());

        return p;
    }

    // =================================================
    // DOMAIN -> DOCUMENT
    // =================================================

    public static RosterDocument toDocument(Roster domain)
    {
        if (domain == null)
            return null;

        RosterDocument doc = new RosterDocument();

        doc.setFlightNumber(domain.getFlightNumber());
        doc.setFlightDate(domain.getFlightDate());
        doc.setCreatedAt(domain.getCreatedAt());

        doc.setFlightInfoSnapshot(
            toDocumentFlightInfo(domain.getFlightInfoSnapshot())
        );

        doc.setPersons(
            domain.getPersons() == null
                ? new ArrayList<>()
                : domain.getPersons()
                        .stream()
                        .map(RosterMongoMapper::toDocumentPerson)
                        .toList()
        );

        return doc;
    }

    private static RosterFlightInfo toDocumentFlightInfo(RosterFlightInfo src)
    {
        if (src == null)
            return null;

        RosterFlightInfo info = new RosterFlightInfo();

        info.setSourceAirportCode(src.getSourceAirportCode());
        info.setSourceCity(src.getSourceCity());
        info.setDestinationAirportCode(src.getDestinationAirportCode());
        info.setDestinationCity(src.getDestinationCity());

        info.setVehicleModel(src.getVehicleModel());
        info.setTotalSeatCount(src.getTotalSeatCount());
        info.setBusinessSeatCount(src.getBusinessSeatCount());
        info.setEconomySeatCount(src.getEconomySeatCount());

        info.setFlightDurationMinutes(src.getFlightDurationMinutes());
        info.setFlightDistanceKm(src.getFlightDistanceKm());

        info.setMenu(
            src.getMenu() == null
                ? new ArrayList<>()
                : new ArrayList<>(src.getMenu())
        );

        info.setSharedFlightNumber(src.getSharedFlightNumber());
        info.setSharedCompany(src.getSharedCompany());

        return info;
    }

    private static RosterPersonDocument toDocumentPerson(RosterPerson p)
    {
        if (p == null)
            return null;

        RosterPersonDocument doc = new RosterPersonDocument();

        doc.setPersonId(p.getPersonId());
        doc.setType(p.getType());
        doc.setName(p.getName());
        doc.setAge(p.getAge());
        doc.setGender(p.getGender());
        doc.setNationality(p.getNationality());

        doc.setSeatNumber(p.getSeatNumber());
        doc.setAssignedAutomatically(p.isAssignedAutomatically());

        doc.setIsInfant(p.getIsInfant());
        doc.setSeatType(p.getSeatType());
        doc.setParentId(p.getParentId());

        doc.setAffiliatedWith(
            p.getAffiliatedWith() == null
                ? new ArrayList<>()
                : new ArrayList<>(p.getAffiliatedWith())
        );

        doc.setSeniority(p.getSeniority());
        doc.setAttendantType(p.getAttendantType());

        doc.setKnownRecipes(
            p.getKnownRecipes() == null
                ? new HashSet<>()
                : new HashSet<>(p.getKnownRecipes())
        );

        doc.setVehicleRestrictions(
            p.getVehicleRestrictions() == null
                ? new HashSet<>()
                : new HashSet<>(p.getVehicleRestrictions())
        );

        doc.setPilotVehicleRestriction(p.getPilotVehicleRestriction());
        doc.setAllowedRangeKm(p.getAllowedRangeKm());

        return doc;
    }
}
