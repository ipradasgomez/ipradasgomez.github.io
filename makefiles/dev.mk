.PHONY: dev dev-down build-check

dev:
	$(COMPOSE) up

dev-down:
	$(COMPOSE) down

build-check:
	$(COMPOSE) run --rm dev sh -c "npm install && npm run build"
