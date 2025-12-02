# =========================
# Stage 1 - Build Stage
# =========================
FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# =========================
# Stage 2 - Runtime Stage
# =========================
FROM eclipse-temurin:17-jdk-jammy

# Install netcat for health/wait checks
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/target/*.jar /app/user-service.jar
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8085

RUN useradd -ms /bin/bash springuser
USER springuser

ENTRYPOINT ["/bin/sh", "-c", "/app/entrypoint.sh"]
