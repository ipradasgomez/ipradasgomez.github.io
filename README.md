# ipradasgomez.github.io

Personal site at https://ipradasgomez.github.io built with Vue, Tailwind CSS, and Vite.

## Branches

| Branch | Purpose |
|--------|---------|
| `feature/*` | Feature work |
| `develop` | Integration branch (protected) |
| `main` | Production (protected, deploy on merge) |

## Workflow

```
feature/*  ──PR + Build Check──►  develop  ──PR + Build Check──►  main  ──CI deploy──►  producción
```

1. Open a PR into `develop`. **Build Check** runs automatically; merge only when green.
2. From `develop`, run `make release` (local build + opens PR to `main` + waits for CI).
3. Merge the release PR into `main` to deploy.

## Setup (once)

```bash
make setup-hooks   # pre-commit: block main, dist/, invalid JSON
```

## Local development (Docker)

```bash
make dev          # http://127.0.0.1:5173 (hot reload)
make dev-down     # stop the dev server
make build-check  # verify build locally (same as CI)
```

## Release to production

From `develop` with a clean tree:

```bash
make release   # local build-check → push develop → PR to main → wait for CI
```

Requires [GitHub CLI](https://cli.github.com/) (`gh`) to create the PR and wait for checks. Without `gh`, runs local build-check and prints manual steps.

`make deploy` is an alias for `make release`.

## Build Check (CI)

Workflow **Build Check** runs on **every PR** targeting `develop` or `main`. No labels needed.

Configure branch protection on **both** `develop` and `main`:

- Require a pull request before merging
- Require status checks to pass → **`build`** (from **Build Check**)
- Block force pushes / restrict updates / restrict deletions

The check name appears after the workflow has run once on a PR.

## One-time GitHub setup

**Pages:** Settings → Pages → Source: **GitHub Actions**

**Protect `develop` and `main`:** Settings → Branches → rulesets with the options above.

## Stack

- Vue 3 + Vue Router + Tailwind CSS + Vite
- Docker (local dev)
- GitHub Actions (CI/CD)
