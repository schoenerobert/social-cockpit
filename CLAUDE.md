# CLAUDE.md — Social Cockpit

Project-level conventions for Claude Code in VS Code. Read this first.

## What this repo is

XLR8N-branded **Vestrix-Cockpit** — single-page frontend over self-hosted Postiz (posting) + Chatwoot (inbox). Same-Site iframe aggregation under `cockpit.xlr8n.io`. Single-tenant for now (Vestrix only); multi-tenant comes back in Phase B.

**Single Source of Truth (Strategy + Architecture):** `wiki/social-cockpit.md` (via `brain-mcp read_page`).
**Data backbone:** `~/xlr8n/apps/social-data-hub/` (ETL + Chatwoot setup + NocoDB).
**This repo:** Next.js 15 frontend, Docker config, ENVs.

## Read order at session start

1. `CLAUDE.md` (this file) — conventions
2. `SPEC.md` — tech-spec (architecture, iframe constraints, Phase-B path)
3. `TASKS.md` — active kanban
4. `wiki/social-cockpit.md` — strategy + log (lazy-load via brain-mcp)
5. `wiki/social-data-hub.md` — backbone context (Chatwoot/Postiz live inside this hub)

## Stack

| Layer | Tool | Endpoint |
|---|---|---|
| Frontend | Next.js 15 (App Router) on Coolify | `https://cockpit.xlr8n.io` |
| Reverse Proxy | Traefik (Coolify-built-in) | — |
| Backend (Posts) | Postiz (self-hosted) | `https://postiz.xlr8n.io` |
| Backend (Inbox) | Chatwoot (self-hosted) | `https://inbox.xlr8n.io` |
| DNS | Cloudflare | `cockpit.xlr8n.io` A → 157.180.126.72 |
| Auth | _none yet_ — Cloudflare Access or NextAuth Magic-Link in Phase 3 | — |

## Coolify

- **App UUID:** `yema29j8znudahg8dvw3c5mg` (build pack: Dockerfile, port 3000)
- **GitHub:** `schoenerobert/social-cockpit` (private), GitHub-App auth
- **ENVs:** `POSTIZ_URL`, `CHATWOOT_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET` (last two unused yet)
- **Deploy:** push to `main` → Coolify auto-pull (or `mcp__coolify-mcp__deploy_application` for force)

## Iframe constraints

The whole thing only works because cockpit + backends share TLD `xlr8n.io` (Same-Site). Cookies, X-Frame-Options, CSP — all simpler that way.

**Chatwoot X-Frame-Options-Strip** lives in Coolify Compose Custom Labels:
```
traefik.http.middlewares.cw-iframe.headers.customresponseheaders.X-Frame-Options=
traefik.http.routers.https-0-apm1tfmaxtntnz70kajjifp8-chatwoot.middlewares=gzip,cw-iframe
```
Set via `mcp__coolify-mcp__add_service_custom_labels` (the MCP tool we shipped 2026-05-08). Do NOT remove without first switching to Same-Origin embedding via reverse-proxy passthrough.

**Postiz** sends no frame-blocking headers — embeddable out of the box.

## Single-tenant pattern (current)

```ts
// lib/config.ts
TENANT_NAME = "Vestrix"
TABS = [
  { key: "posts", iframeUrl: process.env.POSTIZ_URL },
  { key: "inbox", iframeUrl: process.env.CHATWOOT_URL },
]
```

No DB. Routes are flat: `/posts`, `/inbox`. `/` redirects to `/posts`. Phase B brings DB + multi-tenant + per-tenant workspace IDs.

## Coding conventions

- **App Router** (Next.js 15) — server components by default, `"use client"` only when needed
- **No CSS framework** for now — inline styles via `style={{}}` (matches our deck-design pattern)
- **TypeScript strict** — keep it
- **Server-side env reads** — do NOT use `NEXT_PUBLIC_*` for backend URLs (we keep iframe-target URLs server-side so Coolify ENV updates take effect on redeploy without rebuild leaks)
- **Iframe component** lives in `components/TabRenderer.tsx` — single file responsible for rendering an iframe vs. a fallback message when ENV is missing

## Deploy lifecycle

Standard Stage-3 lifecycle for this app:

1. Local edit in `~/xlr8n/apps/cockpit/` (this dir)
2. `git push origin main` → Coolify auto-deploys
3. ENVs change → `mcp__coolify-mcp__bulk_update_envs` + `deploy_application`
4. Custom Labels (header rules etc.) → `mcp__coolify-mcp__add_service_custom_labels` against the *target service* (e.g. chatwoot UUID `apm1tfmaxtntnz70kajjifp8`), not the cockpit app

## Stage probation (until 2026-05-22)

Currently Stage 3 — **Probation**. Promotion to Productive requires:
- Cockpit replaces direct Postiz/Chatwoot access for >2 weeks without friction
- Auth-Layer active (Cloudflare Access or NextAuth Magic-Link)
- At least one Postiz-Posting + one Chatwoot-Reply done end-to-end through the cockpit

If criteria fail at 2026-05-22 → demote back to `~/prototypes/social-cockpit/` Stage 2.
