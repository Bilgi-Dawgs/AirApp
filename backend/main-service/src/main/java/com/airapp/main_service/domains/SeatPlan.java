package com.airapp.main_service.domains;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatPlan
{
    private Business business;
    private Economy economy;

    // =========================
    // INNER CLASS: BUSINESS
    // =========================
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Business
    {
        private String layout;
        private List<Integer> rows;
        private int seatsPerRow;
    }

    // =========================
    // INNER CLASS: ECONOMY
    // =========================
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Economy
    {
        private String layout;
        private Range range;
        private int seatsPerRow;
    }

    // =========================
    // INNER CLASS: RANGE
    // =========================
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Range
    {
        private int startRow;
        private int endRow;
    }
}