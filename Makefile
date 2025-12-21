# ==============================
# Global Variables
# ==============================

DOCKER_COMPOSE = docker compose
ENV_FILE =

# ==============================
# Phony Targets
# ==============================

.PHONY: help build up down stop logs clean rebuild service

# ==============================
# Help
# ==============================

help:
	@echo ""
	@echo "Usage:"
	@echo "  make build              Build all services"
	@echo "  make up                 Start all services (detached)"
	@echo "  make down               Stop and remove all services"
	@echo "  make stop               Stop all services"
	@echo "  make logs               Show logs of all services"
	@echo "  make clean              Remove containers, volumes, orphans"
	@echo "  make rebuild            Clean, build and run all"
	@echo ""
	@echo "Service specific:"
	@echo "  make service S=name     Build & run a specific service"
	@echo "  make logs S=name        Show logs for a specific service"
	@echo ""

# ==============================
# Core Commands
# ==============================

build:
	$(DOCKER_COMPOSE) $(ENV_FILE) build

up:
	$(DOCKER_COMPOSE) $(ENV_FILE) up -d

down:
	$(DOCKER_COMPOSE) $(ENV_FILE) down

stop:
	$(DOCKER_COMPOSE) $(ENV_FILE) stop

logs:
ifeq ($(S),)
	$(DOCKER_COMPOSE) $(ENV_FILE) logs -f
else
	$(DOCKER_COMPOSE) $(ENV_FILE) logs -f $(S)
endif

clean:
	$(DOCKER_COMPOSE) $(ENV_FILE) down --volumes --remove-orphans

rebuild: clean build up

# ==============================
# Service Runner
# ==============================

service:
ifndef S
	$(error Usage: make service S=service-name)
endif
	$(DOCKER_COMPOSE) $(ENV_FILE) up -d --build $(S)
