# Social Cockpit — Stage 2 Sandbox

> Multi-Tenant XLR8N-gebrandete Frontend-Hülle über self-hosted **Postiz** (Posts) + **Chatwoot** (DMs). Erste Tenants: **Vestrix** (Postiz only), **Robert** (Postiz + Chatwoot, später Prosp-Bridge).

## Wahrheit

- **Wiki-Page (SoT):** [[social-cockpit]] in brain-mcp wiki
- **Architektur-Board:** https://excalidraw.xlr8n.io/board/EGrjf3xz_L
- **Master-Liste:** [[ideas]] → ID `SC1` (Stage 2, M×S=8)

## Setup

```bash
npm install
npm run dev
# → http://localhost:3000  (lokal: 3030 via Coolify-Preview-Config)
```

`.env.local` aus `.env.example` ableiten — siehe Repo.

## Tech

- Next.js 15 (App Router), React 19, TS
- Iframes auf Postiz/Chatwoot — funktioniert nur Same-Site (cockpit.xlr8n.io)
- Auth (Phase 3): NextAuth + Postgres

## Stage-3-Promotion-Kriterien

Siehe wiki/social-cockpit.md.
