.PHONY: release deploy

release: build-check
	@branch=$$(git rev-parse --abbrev-ref HEAD); \
	if [ "$$branch" != "$(DEV_BRANCH)" ]; then \
		echo "Error: run release from '$(DEV_BRANCH)' (current: $$branch)"; \
		exit 1; \
	fi; \
	if ! git diff-index --quiet HEAD --; then \
		echo "Error: working tree is not clean. Commit or stash changes first."; \
		exit 1; \
	fi
	git fetch origin
	git push origin $(DEV_BRANCH)
	@if command -v gh >/dev/null 2>&1; then \
		if ! gh pr list --base $(MAIN_BRANCH) --head $(DEV_BRANCH) --state open --json number --jq '.[0].number' 2>/dev/null | grep -q .; then \
			gh pr create --base $(MAIN_BRANCH) --head $(DEV_BRANCH) \
				--title "$(RELEASE_MSG)" \
				--body "Production release from $(DEV_BRANCH) to $(MAIN_BRANCH)."; \
		fi; \
		echo "Waiting for Build Check on the release PR..."; \
		gh pr checks --watch; \
		echo ""; \
		echo "Build Check passed. Merge the PR on GitHub to deploy."; \
		echo "Site: $(SITE_URL)"; \
	else \
		echo ""; \
		echo "Local build passed. Push done."; \
		echo "Create a PR on GitHub: $(DEV_BRANCH) -> $(MAIN_BRANCH)"; \
		echo "Wait for Build Check to pass, then merge to deploy to $(SITE_URL)"; \
	fi

deploy: release
