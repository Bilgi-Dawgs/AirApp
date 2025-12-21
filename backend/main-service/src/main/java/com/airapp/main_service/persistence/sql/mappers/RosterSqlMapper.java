package com.airapp.main_service.persistence.sql.mappers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

import com.airapp.main_service.domains.Roster;
import com.airapp.main_service.domains.RosterFlightInfo;
import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.domains.SeatPlan;
import com.airapp.main_service.persistence.sql.entities.RosterEntity;
import com.airapp.main_service.persistence.sql.entities.RosterFlightInfoEmbeddable;
import com.airapp.main_service.persistence.sql.entities.RosterPersonEntity;
import com.airapp.main_service.persistence.sql.entities.SeatPlanEmbeddable;

public final class RosterSqlMapper
{
    private RosterSqlMapper() {}

    // =================================================
    // ENTITY -> DOMAIN
    // =================================================

    public static Roster toDomain(RosterEntity entity)
    {
        if (entity == null)
            return null;

        Roster roster = new Roster();

        roster.setId(entity.getId());
        roster.setFlightNumber(entity.getFlightNumber());
        roster.setFlightDate(entity.getFlightDate());
        roster.setCreatedAt(entity.getCreatedAt());

        roster.setFlightInfoSnapshot(
            toDomain(entity.getFlightInfoSnapshot())
        );

        roster.setPersons(
            entity.getPersons() == null
                ? new ArrayList<>()
                : entity.getPersons()
                        .stream()
                        .map(RosterSqlMapper::toDomain)
                        .collect(Collectors.toList())
        );

        return roster;
    }

    public static RosterPerson toDomain(RosterPersonEntity entity)
    {
        if (entity == null)
            return null;

        RosterPerson p = new RosterPerson();

        p.setId(entity.getId());
        p.setPersonId(entity.getPersonId());
        p.setType(entity.getType());
        p.setName(entity.getName());
        p.setAge(entity.getAge());
        p.setGender(entity.getGender());
        p.setNationality(entity.getNationality());

        p.setSeatNumber(entity.getSeatNumber());
        p.setAssignedAutomatically(entity.isAssignedAutomatically());

        p.setIsInfant(entity.getIsInfant());
        p.setSeatType(entity.getSeatType());
        p.setParentId(entity.getParentId());

        // ✅ FIX 1 — affiliatedWith DEEP COPY
        p.setAffiliatedWith(
            entity.getAffiliatedWith() == null
                ? new ArrayList<>()
                : new ArrayList<>(entity.getAffiliatedWith())
        );

        p.setSeniority(entity.getSeniority());
        p.setAttendantType(entity.getAttendantType());

        // ✅ FIX 2 — Set alanları DEEP COPY
        p.setKnownRecipes(
            entity.getKnownRecipes() == null
                ? new HashSet<>()
                : new HashSet<>(entity.getKnownRecipes())
        );

        p.setVehicleRestrictions(
            entity.getVehicleRestrictions() == null
                ? new HashSet<>()
                : new HashSet<>(entity.getVehicleRestrictions())
        );

        p.setPilotVehicleRestriction(entity.getPilotVehicleRestriction());
        p.setAllowedRangeKm(entity.getAllowedRangeKm());

        return p;
    }

    private static RosterFlightInfo toDomain(RosterFlightInfoEmbeddable emb)
    {
        if (emb == null)
            return null;

        RosterFlightInfo info = new RosterFlightInfo();

        info.setSourceAirportCode(emb.getSourceAirportCode());
        info.setSourceCity(emb.getSourceCity());
        info.setDestinationAirportCode(emb.getDestinationAirportCode());
        info.setDestinationCity(emb.getDestinationCity());

        info.setVehicleModel(emb.getVehicleModel());
        info.setTotalSeatCount(emb.getTotalSeatCount());
        info.setBusinessSeatCount(emb.getBusinessSeatCount());
        info.setEconomySeatCount(emb.getEconomySeatCount());

        info.setFlightDurationMinutes(emb.getFlightDurationMinutes());
        info.setFlightDistanceKm(emb.getFlightDistanceKm());

        // ✅ FIX 3 — menu DEEP COPY
        info.setMenu(
            emb.getMenu() == null
                ? new ArrayList<>()
                : new ArrayList<>(emb.getMenu())
        );

        info.setSharedFlightNumber(emb.getSharedFlightNumber());
        info.setSharedCompany(emb.getSharedCompany());

        // ⚠️ EKLENDİ: SeatPlan Dönüşümü
        info.setSeatPlan(toDomain(emb.getSeatPlan()));

        return info;
    }

    private static SeatPlan toDomain(SeatPlanEmbeddable emb)
    {
        if (emb == null) return null;

        SeatPlan plan = new SeatPlan();

        // Business
        if (emb.getBusiness() != null) {
            SeatPlan.Business b = new SeatPlan.Business();
            b.setLayout(emb.getBusiness().getLayout());
            b.setSeatsPerRow(emb.getBusiness().getSeatsPerRow());
            b.setRows(
                emb.getBusiness().getRows() == null 
                ? new ArrayList<>() 
                : new ArrayList<>(emb.getBusiness().getRows())
            );
            plan.setBusiness(b);
        }

        // Economy
        if (emb.getEconomy() != null) {
            SeatPlan.Economy e = new SeatPlan.Economy();
            e.setLayout(emb.getEconomy().getLayout());
            e.setSeatsPerRow(emb.getEconomy().getSeatsPerRow());
            
            if (emb.getEconomy().getRange() != null) {
                SeatPlan.Range r = new SeatPlan.Range();
                r.setStartRow(emb.getEconomy().getRange().getStartRow());
                r.setEndRow(emb.getEconomy().getRange().getEndRow());
                e.setRange(r);
            }
            plan.setEconomy(e);
        }

        return plan;
    }

    // =================================================
    // DOMAIN -> ENTITY
    // =================================================

    public static RosterEntity toEntity(Roster domain)
    {
        if (domain == null)
            return null;

        RosterEntity entity = new RosterEntity();

        entity.setId(domain.getId());
        entity.setFlightNumber(domain.getFlightNumber());
        entity.setFlightDate(domain.getFlightDate());
        entity.setCreatedAt(domain.getCreatedAt());

        entity.setFlightInfoSnapshot(
            toEntity(domain.getFlightInfoSnapshot())
        );

        entity.setPersons(
            domain.getPersons() == null
                ? new ArrayList<>()
                : domain.getPersons()
                        .stream()
                        .map(p -> toEntity(p, entity))
                        .collect(Collectors.toList())
        );

        return entity;
    }

    private static RosterFlightInfoEmbeddable toEntity(RosterFlightInfo info)
    {
        if (info == null)
            return null;

        RosterFlightInfoEmbeddable emb = new RosterFlightInfoEmbeddable();

        emb.setSourceAirportCode(info.getSourceAirportCode());
        emb.setSourceCity(info.getSourceCity());
        emb.setDestinationAirportCode(info.getDestinationAirportCode());
        emb.setDestinationCity(info.getDestinationCity());

        emb.setVehicleModel(info.getVehicleModel());
        emb.setTotalSeatCount(info.getTotalSeatCount());
        emb.setBusinessSeatCount(info.getBusinessSeatCount());
        emb.setEconomySeatCount(info.getEconomySeatCount());

        emb.setFlightDurationMinutes(info.getFlightDurationMinutes());
        emb.setFlightDistanceKm(info.getFlightDistanceKm());

        // ✅ FIX 4 — ENTITY tarafında da COPY
        emb.setMenu(
            info.getMenu() == null
                ? new ArrayList<>()
                : new ArrayList<>(info.getMenu())
        );

        emb.setSharedFlightNumber(info.getSharedFlightNumber());
        emb.setSharedCompany(info.getSharedCompany());

        // ⚠️ EKLENDİ: SeatPlan Dönüşümü
        emb.setSeatPlan(toEntity(info.getSeatPlan()));

        return emb;
    }

    private static SeatPlanEmbeddable toEntity(SeatPlan plan)
    {
        if (plan == null) return null;

        SeatPlanEmbeddable emb = new SeatPlanEmbeddable();

        // Business
        if (plan.getBusiness() != null) {
            SeatPlanEmbeddable.Business b = new SeatPlanEmbeddable.Business();
            b.setLayout(plan.getBusiness().getLayout());
            b.setSeatsPerRow(plan.getBusiness().getSeatsPerRow());
            b.setRows(
                plan.getBusiness().getRows() == null 
                ? new ArrayList<>() 
                : new ArrayList<>(plan.getBusiness().getRows())
            );
            emb.setBusiness(b);
        }

        // Economy
        if (plan.getEconomy() != null) {
            SeatPlanEmbeddable.Economy e = new SeatPlanEmbeddable.Economy();
            e.setLayout(plan.getEconomy().getLayout());
            e.setSeatsPerRow(plan.getEconomy().getSeatsPerRow());
            
            if (plan.getEconomy().getRange() != null) {
                SeatPlanEmbeddable.Range r = new SeatPlanEmbeddable.Range();
                r.setStartRow(plan.getEconomy().getRange().getStartRow());
                r.setEndRow(plan.getEconomy().getRange().getEndRow());
                e.setRange(r);
            }
            emb.setEconomy(e);
        }

        return emb;
    }

    private static RosterPersonEntity toEntity(RosterPerson p, RosterEntity roster)
    {
        RosterPersonEntity e = new RosterPersonEntity();

        e.setId(p.getId());
        e.setPersonId(p.getPersonId());
        e.setType(p.getType());
        e.setName(p.getName());
        e.setAge(p.getAge());
        e.setGender(p.getGender());
        e.setNationality(p.getNationality());

        e.setSeatNumber(p.getSeatNumber());
        e.setAssignedAutomatically(p.isAssignedAutomatically());

        e.setIsInfant(p.getIsInfant());
        e.setSeatType(p.getSeatType());
        e.setParentId(p.getParentId());

        // ✅ FIX 5 — affiliatedWith COPY
        e.setAffiliatedWith(
            p.getAffiliatedWith() == null
                ? new ArrayList<>()
                : new ArrayList<>(p.getAffiliatedWith())
        );

        e.setSeniority(p.getSeniority());
        e.setAttendantType(p.getAttendantType());

        e.setKnownRecipes(
            p.getKnownRecipes() == null
                ? new HashSet<>()
                : new HashSet<>(p.getKnownRecipes())
        );

        e.setVehicleRestrictions(
            p.getVehicleRestrictions() == null
                ? new HashSet<>()
                : new HashSet<>(p.getVehicleRestrictions())
        );

        e.setPilotVehicleRestriction(p.getPilotVehicleRestriction());
        e.setAllowedRangeKm(p.getAllowedRangeKm());

        e.setRoster(roster);

        return e;
    }
}