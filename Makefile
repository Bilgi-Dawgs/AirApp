# ==============================
# Global Variables
# ==============================

DOCKER_COMPOSE = docker compose
ENV_FILE = --env-file ./env/.env
USER_SERVICE_PATH = ./backend/services/user-service
AUTH_SERVICE_PATH = ./backend/services/auth-service

# ==============================
# Commands
# ==============================

.PHONY: help build run stop clean rebuild logs user-service

help:
	@echo "Available commands:"
	@echo "  make build        - Build all Docker images"
	@echo "  make run          - Start all services (in detached mode)"
	@echo "  make stop         - Stop all containers"
	@echo "  make logs         - Show logs"
	@echo "  make clean        - Remove containers, volumes, and orphans"
	@echo "  make rebuild      - Clean and rebuild everything"
	@echo "  make user-service - Build only user-service module"
	@echo "  make auth-service - Build only auth-service module"

# ==============================
# Build / Run / Clean
# ==============================

build:
	$(DOCKER_COMPOSE) $(ENV_FILE) build

run:
	$(DOCKER_COMPOSE) $(ENV_FILE) up -d

stop:
	$(DOCKER_COMPOSE) $(ENV_FILE) down

logs:
	$(DOCKER_COMPOSE) $(ENV_FILE) logs -f

clean:
	$(DOCKER_COMPOSE) $(ENV_FILE) down --volumes --remove-orphans

rebuild: clean build run

# ==============================
# Individual Service Builds
# ==============================

user-service:
	cd $(USER_SERVICE_PATH) && mvn clean package -DskipTests -q
	$(DOCKER_COMPOSE) $(ENV_FILE) build user-service

auth-service:
	cd $(AUTH_SERVICE_PATH) && mvn clean package -DskipTests -q
	$(DOCKER_COMPOSE) $(ENV_FILE) build auth-service
