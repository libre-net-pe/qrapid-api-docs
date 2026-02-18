# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Start interactive preview server (live reload)
npm test         # Lint/validate the OpenAPI definition
npm run build    # Bundle definition into dist/ folder
```

## Architecture

This is an OpenAPI 3.0.2 documentation project using Redocly tooling for the QRapid API — a REST API for generating, managing, and tracking static and dynamic QR codes.

### Structure

- `openapi/openapi.yaml` — Root specification (entry point). References all paths and components via `$ref`.
- `openapi/paths/` — One YAML file per endpoint (e.g., `qr-codes@{id}.yaml` for `/qr-codes/{id}`).
- `openapi/components/schemas/` — Reusable data models.
- `openapi/components/securitySchemes/` — Auth definitions (`firebase_jwt`, `api_key`).
- `.redocly.yaml` — Redocly config: lint rules, HTML template path, and theme settings.
- `docs/index.html` — Custom HTML template for the Redoc preview renderer.

### API Resources

The spec covers four resource groups (tags):

| Tag | Paths |
|-----|-------|
| QR Codes | `POST/GET /qr-codes`, `GET/PATCH/DELETE /qr-codes/{id}` |
| Dynamic QR Codes | `POST/GET /dynamic-qr-codes`, `GET/PATCH/DELETE /dynamic-qr-codes/{id}` |
| Assets | `POST /assets/logo` |
| Folders | `POST/GET /folders`, `GET/PATCH/DELETE /folders/{id}` |

### Authentication

Every endpoint accepts either security scheme:
- **`firebase_jwt`** — Firebase ID token (`Authorization: Bearer <token>`, expires 1 h)
- **`api_key`** — Long-lived key from the dashboard (`Authorization: Bearer sk_live_<key>`)

### Error Format

All error responses use RFC 7807 Problem Details with `Content-Type: application/problem+json`. Schemas reference `Problem.yaml`.

### Conventions

- Use `$ref` to reference components instead of inlining definitions.
- Path files use `@` as a separator for path parameters (e.g., `qr-codes@{id}.yaml` → `/qr-codes/{id}`).
- `$ref` paths inside `openapi/paths/` files use `../components/...` (relative to the file's location).
- List endpoints return paginated envelopes (e.g., `PaginatedQrCodes.yaml`) with `page` and `limit` query params.
- The `npm test` lint command enforces Redocly's recommended ruleset; `no-unused-components` is set to warning.

### Adding a New Endpoint

1. Create `openapi/paths/<resource>@{id}.yaml` with the HTTP operations.
2. Register it in `openapi/openapi.yaml` under `paths:` with a `$ref`.
3. Add any new schemas to `openapi/components/schemas/`.
4. Run `npm test` to validate.
