#!/bin/sh
set -e

# ========================================================================================
#  Secure Entrypoint for User Service
# ========================================================================================

echo "Loading secrets for User Service..."

# Database Username
if [ -f "/run/secrets/user_db_user" ]; then
    export SPRING_DATASOURCE_USERNAME=$(cat /run/secrets/user_db_user)
fi

# Database Password
if [ -f "/run/secrets/user_db_pass" ]; then
    export SPRING_DATASOURCE_PASSWORD=$(cat /run/secrets/user_db_pass)
fi

# JWT Secret Key
if [ -f "/run/secrets/jwt_secret_key" ]; then
    export APPLICATION_SECURITY_JWT_SECRET_KEY=$(cat /run/secrets/jwt_secret_key)
elif [ -n "$JWT_SECRET_KEY" ]; then
    export APPLICATION_SECURITY_JWT_SECRET_KEY="$JWT_SECRET_KEY"
fi

# Validation Warning
if [ -z "$APPLICATION_SECURITY_JWT_SECRET_KEY" ]; then
    echo "WARNING: JWT Secret Key not found! The application will likely fail to start."
fi


# ===============================
#  Wait for Dependencies
# ===============================

echo "Waiting for MySQL at ${USER_DB_HOST}:${USER_DB_PORT}..."

# Loop until netcat (nc) successfully connects to the DB port
while ! nc -z "$USER_DB_HOST" "$USER_DB_PORT"; do
  sleep 2
done

echo "MySQL connection established!"


# ===============================
#  Start Spring Boot Application
# ===============================

echo "Starting User Service on port ${SERVER_PORT:-8085}..."

exec java -jar /app/user-service.jar \
    --server.port="${SERVER_PORT:-8085}" \
    --spring.datasource.url="jdbc:mysql://${USER_DB_HOST}:${USER_DB_PORT}/${USER_DB_NAME}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC" \
    --spring.jpa.hibernate.ddl-auto="${HIBERNATE_DDL_AUTO:-update}" \
    --spring.jpa.show-sql="${SHOW_SQL:-true}" \
    --spring.jpa.properties.hibernate.dialect="${HIBERNATE_DIALECT:-org.hibernate.dialect.MySQLDialect}" \
    --spring.jpa.properties.hibernate.format_sql="${FORMAT_SQL:-true}" \
    --logging.level.org.hibernate.SQL="${LOG_LEVEL_SQL:-DEBUG}" \
    --logging.level.org.hibernate.type.descriptor.sql.BasicBinder="${LOG_LEVEL_BINDER:-TRACE}"