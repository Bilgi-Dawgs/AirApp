package com.airapp.main_service.mappers;

import org.springframework.stereotype.Component;

import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.dto.responses.PassengerResponse;
import com.airapp.main_service.enums.PersonType;
import com.airapp.main_service.enums.SeatType;

@Component
public class PassengerMapper {

    public RosterPerson toRosterPerson(PassengerResponse dto) {
        if (dto == null) return null;

        RosterPerson person = new RosterPerson();

        person.setPersonId(dto.getId());
        person.setType(PersonType.PASSENGER);

        person.setName(dto.getName());
        person.setAge(dto.getAge());
        person.setGender(dto.getGender());
        person.setNationality(dto.getNationality());

        // === Seat Type ===
        if (dto.getSeatType() != null) {
            try {
                person.setSeatType(
                    SeatType.valueOf(dto.getSeatType().toUpperCase())
                );
            } catch (IllegalArgumentException e) {
                person.setSeatType(SeatType.ECONOMY);
            }
        }

        person.setSeatNumber(dto.getSeatNumber());

        // === Infant Rule ===
        boolean isInfant = dto.getAge() != null && dto.getAge() <= 2;
        person.setIsInfant(isInfant);
        person.setParentId(dto.getGuardianId());

        // === Affiliated Passengers ===
        if (dto.getAffiliatedWith() != null) {
            person.setAffiliatedWith(dto.getAffiliatedWith());
        }

        return person;
    }
}
