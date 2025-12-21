package com.airapp.main_service.mappers;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.airapp.main_service.domains.RosterFlightInfo;
import com.airapp.main_service.domains.SeatPlan;
import com.airapp.main_service.dto.responses.FlightResponse;
import com.airapp.main_service.exceptions.RosterRuleViolationException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FlightMapper
{
    public RosterFlightInfo toRosterFlightInfo(FlightResponse response)
    {
        if (response == null)
            return null;

        RosterFlightInfo info = new RosterFlightInfo();


        info.setFlightDurationMinutes(response.getDurationMinutes());
        info.setFlightDistanceKm(
            response.getDistanceKm() != null
                ? response.getDistanceKm().doubleValue()
                : 0.0
        );

        // Havalimanı Kodları
        info.setSourceAirportCode(response.getSourceAirportCode());
        info.setDestinationAirportCode(response.getDestinationAirportCode());

        // Uçak (Vehicle) Bilgileri
        if (response.getVehicleType() == null) {
            throw new RosterRuleViolationException(
                "Flight " + response.getFlightNumber() + " has no vehicle info"
            );
        }

        var vehicleDto = response.getVehicleType();
        info.setVehicleModel(vehicleDto.getModelName());
        info.setTotalSeatCount(vehicleDto.getTotalSeats());

        // Menü Mapping
        if (vehicleDto.getMenu() != null && info.getMenu() != null) {
             info.getMenu().addAll(vehicleDto.getMenu());
        }

        // Seat Plan Mapping (DTO -> Domain)
        if (vehicleDto.getSeatPlan() != null) {
            SeatPlan seatPlanEntity = mapSeatPlan(vehicleDto.getSeatPlan());
            info.setSeatPlan(seatPlanEntity);
            
            // Koltuk sayılarını hesapla
            info.setBusinessSeatCount(calculateBusinessSeats(seatPlanEntity));
            info.setEconomySeatCount(calculateEconomySeats(seatPlanEntity));
        }



        return info;
    }

    private SeatPlan mapSeatPlan(FlightResponse.SeatPlanDTO dto) {
        SeatPlan entity = new SeatPlan();

        // 1. Business Bölümü
        if (dto.getBusiness() != null) {
            SeatPlan.Business busEntity = new SeatPlan.Business();
            busEntity.setLayout(dto.getBusiness().getLayout());
            busEntity.setSeatsPerRow(dto.getBusiness().getSeatsPerRow());
            
            if (dto.getBusiness().getRows() != null) {
                busEntity.setRows(dto.getBusiness().getRows());
            } else {
                busEntity.setRows(Collections.emptyList());
            }
            entity.setBusiness(busEntity);
        }

        if (dto.getEconomy() != null) {
            SeatPlan.Economy ecoEntity = new SeatPlan.Economy();
            ecoEntity.setLayout(dto.getEconomy().getLayout());
            ecoEntity.setSeatsPerRow(dto.getEconomy().getSeatsPerRow());

            List<Integer> rangeList = dto.getEconomy().getRange();
            if (rangeList != null && rangeList.size() >= 2) {

                SeatPlan.Range rangeObj = new SeatPlan.Range();
                rangeObj.setStartRow(rangeList.get(0));
                rangeObj.setEndRow(rangeList.get(1));
                
                ecoEntity.setRange(rangeObj);
            }
            entity.setEconomy(ecoEntity);
        }

        return entity;
    }

    private int calculateBusinessSeats(SeatPlan sp) {
        if (sp == null || sp.getBusiness() == null || sp.getBusiness().getRows() == null) {
            return 0;
        }
        return sp.getBusiness().getRows().size() * sp.getBusiness().getSeatsPerRow();
    }

    private int calculateEconomySeats(SeatPlan sp) {

        if (sp == null || sp.getEconomy() == null || sp.getEconomy().getRange() == null) {
            return 0;
        }
        int start = sp.getEconomy().getRange().getStartRow();
        int end = sp.getEconomy().getRange().getEndRow();
        int seatsPerRow = sp.getEconomy().getSeatsPerRow();
        
        if (end < start) return 0;
        return (end - start + 1) * seatsPerRow;
    }
}