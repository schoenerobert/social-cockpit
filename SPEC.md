# SPEC.md — Social Cockpit Tech-Spec

Detailed implementation spec. Strategy + WHY lives in `wiki/social-cockpit.md`.

## Goal-Hierarchie

1. **Top-Goal:** Vestrix-Posts und Vestrix-Inbox in einer XLR8N-gebrandeten UI auf einer Domain.
2. **Sub-Goal A:** Iframe-Aggregation laeuft unter Same-Site (cockpit.xlr8n.io ↔ postiz.xlr8n.io ↔ inbox.xlr8n.io) — Cookies fliessen, Logins persistent.
3. **Sub-Goal B:** Auth-Layer (Phase 3 / Probation-Exit-Kriterium) — entweder Cloudflare Access oder NextAuth Magic-Link.
4. **Sub-Goal C (Phase B):** Multi-Tenant-Reaktivierung — Postgres + Tenant-Mapping + per-Tenant Workspace-Routes — sobald Postiz/Chatwoot echte Workspace-Trennung haben.
5. **Sub-Goal D (Phase B+):** Cross-Tool-Features — Inbox-Counter aus Chatwoot-API in Sidebar, Post-Comment-Reply-Tracking, Analytics-Layer.

## Architektur

```
                ┌──────────────────────────────┐
                │  cockpit.xlr8n.io (Coolify)  │
                │  Next.js 15 Single-Tenant    │
                │  Routes: /posts, /inbox      │
                └──────────────┬───────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                                 │
   ┌──────────▼───────────┐         ┌──────────▼───────────┐
   │ /posts → iframe      │         │ /inbox → iframe      │
   │ postiz.xlr8n.io      │         │ inbox.xlr8n.io       │
   │ (Postiz Self-Host)   │         │ (Chatwoot Self-Host) │
   └──────────────────────┘         └──────────────────────┘
```

Same-Site (`*.xlr8n.io`) ist die Kernbedingung. Cross-Origin (z.B. localhost-Dev) bricht Iframes wegen 3rd-party-Cookie-Blockern.

## File Tree

```
app/
  layout.tsx        # Root: html/body + Sidebar (XLR8N + Vestrix + Tabs)
  page.tsx          # Redirect → /posts
  posts/page.tsx    # Renders TabRenderer with Postiz iframe
  inbox/page.tsx    # Renders TabRenderer with Chatwoot iframe
components/
  TabRenderer.tsx   # iframe vs. "Backend-URL fehlt" fallback
lib/
  config.ts         # TENANT_NAME, TABS (statisch, single-tenant)
Dockerfile          # Next.js production build (port 3000)
.env.example        # POSTIZ_URL, CHATWOOT_URL
```

## Datenmodell

**None for Phase A.** Alles statisch in `lib/config.ts`. Phase B fuegt Postgres-Adapter via NextAuth + Drizzle (oder Prisma) hinzu.

Geplantes Schema fuer Phase B:

```sql
-- Tenants
tenant (id, slug, name, accent_color, created_at)
-- Pro Tenant: 1..N Tab-Konfigurationen
tenant_tab (tenant_id, key, label, iframe_url, sort_order)
-- User
user (id, email, created_at)
-- Membership
tenant_membership (tenant_id, user_id, role)
```

## Iframe-Embedding-Constraints

| Backend | Default | Stand 2026-05-08 |
|---|---|---|
| Postiz | keine X-Frame-Options, keine CSP frame-ancestors | Embeddable, nichts zu tun |
| Chatwoot | `X-Frame-Options: SAMEORIGIN` (hard default in 4.0.0-beta) | **Custom Traefik-Label** strippt den Header — siehe CLAUDE.md |

`FRAME_ANCESTORS`-ENV von Chatwoot wirkt nur auf CSP frame-ancestors, nicht auf X-Frame-Options. Beide setzen → manche Browser blocken trotzdem. Loesung: am Reverse-Proxy strippen.

## Auth-Layer (Phase 3)

Zwei Optionen, Tradeoff-Entscheidung steht aus:

**A) Cloudflare Access** (5 Min Setup, kein Code)
- Cloudflare-Tunnel oder Access-Application vor cockpit.xlr8n.io
- OAuth via Google / GitHub / Email-Magic-Link auf Cloudflare-Seite
- Vorteil: Null Code-Aenderung. Nachteil: External-IDP-Lock-In.

**B) NextAuth Magic-Link** (eigene Code-Base)
- NextAuth installieren, Postgres-Adapter, Email-Provider (Brevo Transactional)
- Login-Page mit XLR8N-Branding, eigene Magic-Link-Mails
- Vorteil: Volle Kontrolle. Nachteil: Tagesarbeit, mehr Wartung.

Tendenz: **A** fuer Probation-Exit (schnell), **B** fuer Phase B sobald Multi-Tenant zurueck ist (User-Tenant-Mapping braucht eigene DB sowieso).

## Phase-B (Multi-Tenant)

Trigger fuer Phase-B-Aktivierung:

1. Vestrix oder zweiter Tenant nutzt Cockpit produktiv (Probation bestanden)
2. Postiz hat mehrere Orgs / Chatwoot hat mehrere Accounts
3. Robert privat will eigenes Cockpit-View

Phase-B-Plan:
1. Postgres-Adapter (Coolify-Postgres oder dediziert)
2. NextAuth Magic-Link
3. `lib/config.ts` ersetzt durch `lib/tenants.ts` (DB-Read)
4. Routes auf `/[tenant]/[tab]` zurueck (wir hatten das schon mal — git history)
5. Sidebar Tenant-Switcher

## Promotion-Kriterien (Stage 3 Probation → Stage 3 Productive)

Stichtag: 2026-05-22 (2 Wochen nach Live-Deploy 2026-05-08).

- [ ] Cockpit ersetzt Direktzugriff auf Postiz/Chatwoot fuer Vestrix-Use-Cases
- [ ] Auth-Layer aktiv (mindestens Variante A — Cloudflare Access)
- [ ] Mindestens 1 Posting via Cockpit + 1 Chatwoot-Reply via Cockpit ohne Direkt-URL-Fallback

Bei Erfuellung: Status in `wiki/projects.md` auf "Stage 3 — Productive". Bei Nicht-Erfuellung: zurueck nach `~/prototypes/social-cockpit/` (Stage 2).
