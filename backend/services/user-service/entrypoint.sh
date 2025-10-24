#!/bin/sh
set -e

# ===============================
#  Secure Entrypoint for User Service
# ===============================

echo "Loading secrets for User Service ..."

# Read secrets if available
if [ -f "/run/secrets/user_db_user" ]; then
    DB_USERNAME=$(cat /run/secrets/user_db_user)
fi

if [ -f "/run/secrets/user_db_pass" ]; then
    DB_PASSWORD=$(cat /run/secrets/user_db_pass)
fi

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL at ${USER_DB_HOST}:${USER_DB_PORT} ..."
until nc -z "$USER_DB_HOST" "$USER_DB_PORT"; do
    sleep 2
done
echo "MySQL connection established!"

# ===============================
#  Start Spring Boot Application
# ===============================

echo "Starting User Service on port ${SERVER_PORT:-8085} ..."

exec java -jar /app/user-service.jar \
    --server.port="${SERVER_PORT:-8085}" \
    --spring.datasource.url="jdbc:mysql://${USER_DB_HOST}:${USER_DB_PORT}/${USER_DB_NAME}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC" \
    --spring.datasource.username="${DB_USERNAME}" \
    --spring.datasource.password="${DB_PASSWORD}" \
    --spring.jpa.hibernate.ddl-auto="${HIBERNATE_DDL_AUTO:-update}" \
    --spring.jpa.show-sql="${SHOW_SQL:-true}" \
    --spring.jpa.properties.hibernate.dialect="${HIBERNATE_DIALECT:-org.hibernate.dialect.MySQLDialect}" \
    --spring.jpa.properties.hibernate.format_sql="${FORMAT_SQL:-true}" \
    --logging.level.org.hibernate.SQL="${LOG_LEVEL_SQL:-DEBUG}" \
    --logging.level.org.hibernate.type.descriptor.sql.BasicBinder="${LOG_LEVEL_BINDER:-TRACE}"
