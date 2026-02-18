# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Start interactive preview server (live reload)
npm test         # Lint/validate the OpenAPI definition
npm run build    # Bundle definition into dist/ folder
```

## Architecture

This is an OpenAPI 3.0.2 documentation project using Redocly tooling.

### Structure

- `openapi/openapi.yaml` — Root specification (entry point). References all paths and components via `$ref`.
- `openapi/paths/` — One YAML file per endpoint (e.g., `users@{username}.yaml` for `/users/{username}`).
- `openapi/components/schemas/` — Reusable data models (User, Email).
- `openapi/components/securitySchemes/` — Auth definitions (OAuth2, API Key, Basic Auth).
- `openapi/components/headers/` — Reusable HTTP headers.
- `.redocly.yaml` — Redocly config: lint rules, HTML template path, and theme settings.
- `docs/index.html` — Custom HTML template for the Redoc preview renderer.

### Conventions

- Use `$ref` to reference components instead of inlining definitions — keeps files DRY.
- Path files use `@` as a separator for path parameters (e.g., `users@{username}.yaml` → `/users/{username}`).
- The `npm test` lint command enforces Redocly's recommended ruleset; `no-unused-components` is set to warning.
