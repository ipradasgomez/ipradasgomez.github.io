include makefiles/vars.mk
include makefiles/dev.mk
include makefiles/github-deploy.mk
include makefiles/hooks.mk

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Dev (Docker) — makefiles/dev.mk"
	@echo "  dev           Dev server at http://127.0.0.1:5173"
	@echo "  dev-down      Stop dev server"
	@echo "  build-check   Build site in Docker (same as CI)"
	@echo ""
	@echo "Release — makefiles/github-deploy.mk"
	@echo "  release       Local build + push develop + wait for CI on PR to main"
	@echo "  deploy        Alias for release"
	@echo ""
	@echo "Hooks — makefiles/hooks.mk"
	@echo "  setup-hooks   Install pre-commit validations"
