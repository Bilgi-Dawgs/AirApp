package com.airapp.main_service.persistence.sql.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "rosters")
public class RosterEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String flightNumber;

    private LocalDateTime flightDate;

    @Embedded
    private RosterFlightInfoEmbeddable flightInfoSnapshot;

    @JsonIgnore
    @OneToMany(
        mappedBy = "roster",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<RosterPersonEntity> persons = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();
}
