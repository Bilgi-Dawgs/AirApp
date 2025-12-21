package com.airapp.main_service.persistence.sql.entities;

import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatPlanEmbeddable
{
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(
            name = "layout",
            column = @Column(name = "business_layout")
        ),
        @AttributeOverride(
            name = "seatsPerRow",
            column = @Column(name = "business_seats_per_row")
        )
    })
    private Business business;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(
            name = "layout",
            column = @Column(name = "economy_layout")
        ),
        @AttributeOverride(
            name = "seatsPerRow",
            column = @Column(name = "economy_seats_per_row")
        )
    })
    private Economy economy;

    // =========================
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Business
    {
        private String layout;

        @ElementCollection
        @CollectionTable(
            name = "seatplan_business_rows",
            joinColumns = @JoinColumn(name = "roster_id")
        )
        // DÜZELTME: "row_number" rezerve kelime olduğu için değiştirildi
        @Column(name = "seat_row_num") 
        private List<Integer> rows;

        private Integer seatsPerRow;
    }

    // =========================
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Economy
    {
        private String layout;

        @Embedded
        @AttributeOverrides({
            @AttributeOverride(
                name = "startRow",
                column = @Column(name = "economy_start_row")
            ),
            @AttributeOverride(
                name = "endRow",
                column = @Column(name = "economy_end_row")
            )
        })
        private Range range;

        private Integer seatsPerRow;
    }

    // =========================
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Range
    {
        private Integer startRow;
        private Integer endRow;
    }
}