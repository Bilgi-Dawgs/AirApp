# ==============================
# Global Variables
# ==============================
DOCKER_COMPOSE = docker compose
USER_SERVICE_PATH = ./backend/services/user-service

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
	@echo "  make clean        - Remove containers and images"
	@echo "  make rebuild      - Clean and rebuild everything"
	@echo "  make user-service - Build only user-service"


# ==============================
# Build / Run / Clean
# ==============================

build:
	$(DOCKER_COMPOSE) build

run:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

clean:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

rebuild: clean build run

# ==============================
# Individual Service Builds
# ==============================

user-service:
	cd $(USER_SERVICE_PATH) && mvn clean package -DskipTests
	$(DOCKER_COMPOSE) build user-service
