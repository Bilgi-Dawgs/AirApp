package com.airapp.main_service.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Recipes {
    BEEF_STROGANOFF("Beef Stroganoff"),
    CHICKEN_CURRY("Chicken Curry"),
    SUSHI("Sushi"),
    CHAMPAGNE("Champagne"),
    LASAGNA("Lasagna"),
    VEGAN_DELIGHT("Vegan Delight"),
    OMLETTE("Omlette"),
    PASTA("Pasta");

    private final String displayName;

    Recipes(String displayName) {
        this.displayName = displayName;
    }

    // JSON oluşturulurken (Serialize) bu değeri kullanır: "Beef Stroganoff"
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    // JSON okunurken (Deserialize) burayı kullanır
    @JsonCreator
    public static Recipes fromString(String text) {
        for (Recipes r : Recipes.values()) {
            if (r.displayName.equalsIgnoreCase(text) || r.name().equalsIgnoreCase(text)) {
                return r;
            }
        }
        // Bilinmeyen bir tarif gelirse null dönebilir veya varsayılan atayabiliriz
        return null; 
    }
}