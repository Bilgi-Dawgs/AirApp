package com.airapp.main_service.configs;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ConfigDebugger implements CommandLineRunner {

    // --- 1. SPRING BOOT AYARLARI (Application.yml'dan okunanlar) ---
    
    @Value("${spring.data.mongodb.host:TANIMSIZ}")
    private String springHost;

    @Value("${spring.data.mongodb.port:0}")
    private int springPort;

    @Value("${spring.data.mongodb.database:TANIMSIZ}")
    private String springDatabase;

    // EN ÖNEMLİSİ BU: Eğer URI varsa, Host ve Port geçersiz sayılır!
    @Value("${spring.data.mongodb.uri:URI_YOK}") 
    private String springUri;

    // --- 2. DOCKER ORTAM DEĞİŞKENLERİ (Manual kontrol) ---
    // @Value ile değil, direkt sistemden okuyacağız.


    @Value("${services.flight-service.url:TANIMSIZ}")
    private String flightServiceUrl;

    @Value("${services.pilot-service.url:TANIMSIZ}")
    private String pilotServiceUrl;

    @Value("${services.crew-service.url:TANIMSIZ}")
    private String crewServiceUrl;

    @Value("${services.passenger-service.url:TANIMSIZ}")
    private String passengerServiceUrl;


    @Override
    public void run(String... args) throws Exception {
        System.out.println("==================================================================================");
        System.out.println("🕵️  GELİŞMİŞ CONFIG DEBUGGER - DETAYLI ANALİZ");
        System.out.println("==================================================================================");

        System.out.println("\n--- [A] SPRING BOOT NE GÖRÜYOR? (@Value) ---");
        System.out.println("👉 URI (En Yüksek Öncelik) : " + springUri);
        System.out.println("👉 Host                    : " + springHost);
        System.out.println("👉 Port                    : " + springPort);
        System.out.println("👉 Database                : " + springDatabase);

        System.out.println("\n--- [B] DOCKER PROCESS'İ NE GÖRÜYOR? (System.getenv) ---");
        System.out.println("(İçinde 'MONGO' geçen tüm ortam değişkenleri dökülüyor...)");
        
        Map<String, String> env = System.getenv();
        boolean foundAny = false;
        for (String key : env.keySet()) {
            if (key.toUpperCase().contains("MONGO")) {
                System.out.println("🔹 " + key + " = " + env.get(key));
                foundAny = true;
            }
        }
        
        if (!foundAny) {
            System.out.println("❌ HİÇBİR 'MONGO' DEĞİŞKENİ BULUNAMADI! Docker-compose aktarmıyor olabilir.");
        }

        System.out.println("\n--- [C] DOWNSTREAM SERVICE URL'LERİ (services.*) ---");
        System.out.println("✈️  Flight Service URL     : " + flightServiceUrl);
        System.out.println("🧑‍✈️ Pilot Service URL      : " + pilotServiceUrl);
        System.out.println("🧑‍🤝‍🧑 Crew Service URL       : " + crewServiceUrl);
        System.out.println("🧍 Passenger Service URL   : " + passengerServiceUrl);


        System.out.println("==================================================================================");
    }
}