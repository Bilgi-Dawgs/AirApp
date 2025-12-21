# ============================
#       BUILD STAGE
# ============================
FROM eclipse-temurin:17-jdk AS builder

# Workdir
WORKDIR /app

# Copy Maven Wrapper + pom to enable dependency caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached if pom.xml unchanged)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the JAR (skip tests for speed)
RUN ./mvnw clean package -DskipTests

# ============================
#      RUNTIME STAGE
# ============================

FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy only the final jar from builder
COPY --from=builder /app/target/*.jar app.jar

# Security: Run as non-root user
RUN groupadd -r spring && useradd -r -g spring spring
USER spring

# Expose the port
EXPOSE 8083

# Run the service
ENTRYPOINT ["java", "-jar", "app.jar"]
