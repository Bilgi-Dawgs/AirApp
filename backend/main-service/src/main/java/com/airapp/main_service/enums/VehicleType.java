package com.airapp.main_service.enums;

public enum VehicleType {
    AIRBUS_A320,
    AIRBUS_A330,
    BOEING_737,
    BOEING_777,
    BOEING_787;

    public static VehicleType fromString(String text) {
        if (text == null) return null;
        try {
            return VehicleType.valueOf(text.toUpperCase());
        } catch (IllegalArgumentException e) {
            return (null);
        }
    }
}