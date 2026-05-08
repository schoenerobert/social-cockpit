# TASKS.md — Social Cockpit Kanban

Active task list. Phases mirror `wiki/social-cockpit.md`. Tick `[x]` when done.

## In Progress

_(Stage 3 Probation aktiv bis 2026-05-22 — keine offenen Code-Tasks. Naechster Build-Block ist Auth.)_

## Stage 2 — Sandbox (✅ done 2026-05-07 → 2026-05-08)

- [x] **S2.1** Next.js 15 App-Router Stub
- [x] **S2.2** Cloudflare DNS A-Record fuer `cockpit.xlr8n.io`
- [x] **S2.3** Coolify-Application via private GitHub-Repo + GitHub-App
- [x] **S2.4** Build-Pack Dockerfile (nixpacks failed bei Next-Server)
- [x] **S2.5** Iframe-Layout mit Sidebar (Multi-Tenant initial, dann Single-Tenant Pivot)
- [x] **S2.6** Chatwoot X-Frame-Options-Strip via Traefik Custom Label
- [x] **S2.7** Coolify-MCP-Patch (`add_service_custom_labels`, `update_service` mit `docker_compose_raw`) — ueber Repo `schoenerobert/coolify-mcp` deployed
- [x] **S2.8** Single-Tenant-Refactor: Tenant-Layer raus, Routes flach
- [x] **S2.9** Live-Verifikation: `/posts`, `/inbox` funktionieren, Robert-Browser-Test bestaetigt

## Stage 3 — Probation (2026-05-08 → 2026-05-22)

**Ziel:** zwei Wochen produktiv nutzen, dann Promotion-Entscheidung.

- [ ] **P3.1** Daily-Use durch Robert/Vestrix-Operator — keine Friction-Reports an Robert
- [ ] **P3.2** Mindestens 1 LinkedIn-Post via Cockpit/Postiz-Iframe
- [ ] **P3.3** Mindestens 1 Chatwoot-Reply via Cockpit/Chatwoot-Iframe
- [ ] **P3.4** **Auth-Layer aktiv** — Variante A (Cloudflare Access) oder B (NextAuth Magic-Link). Default-Pick: A fuer Speed.
- [ ] **P3.5** **Cleanup orphan ENVs in Coolify** — `POSTIZ_VESTRIX_URL`, `POSTIZ_ROBERT_URL`, `CHATWOOT_ROBERT_URL` entfernen (werden vom Code nicht mehr gelesen)

**DoD:** alle 5 Tasks ✅ am Stichtag 2026-05-22 → Promotion zu "Stage 3 — Productive".

## Phase B — Multi-Tenant Reaktivierung (later, post-Probation)

Aktivieren erst wenn:
- Vestrix-Cockpit produktiv (Probation bestanden)
- Robert privat will Cockpit-View, **oder** zweiter Vestrix-Operator braucht eigenen View
- Postiz hat mehrere Orgs **oder** Chatwoot hat mehrere Accounts

- [ ] **PB.1** Postgres-Service in Coolify anlegen (oder existing nutzen)
- [ ] **PB.2** Drizzle/Prisma-Schema: `tenant`, `tenant_tab`, `user`, `tenant_membership`
- [ ] **PB.3** NextAuth Magic-Link via Brevo SMTP-Provider (Cloudflare Access ggf. ablösen)
- [ ] **PB.4** `lib/config.ts` ersetzt durch `lib/tenants.ts` (DB-Read)
- [ ] **PB.5** Routes auf `/[tenant]/[tab]` zurueck (git history hat das Pattern noch)
- [ ] **PB.6** Sidebar Tenant-Switcher mit Branding pro Tenant

## Phase C — Cross-Tool-Features (Phase B+)

- [ ] **PC.1** Chatwoot-API: Unread-Counter in Sidebar fuer Inbox-Tab
- [ ] **PC.2** Postiz-API: Pending-Schedule-Counter
- [ ] **PC.3** Analytics-Layer: Daily-Email mit Posts-Reach + Inbox-Volume (separater `/analytics`-Route)
- [ ] **PC.4** Optional: Prosp-Bridge fuer LinkedIn-DMs in Chatwoot-Custom-Channel (nur fuer Robert-Privat-Tenant relevant)

## Backlog / Open Questions

- Branding: XLR8N Wordmark vs nur "XLR8N" Texts in Sidebar? (Jetzt: nur Text)
- Domain bleibt `cockpit.xlr8n.io` (alternative `social.xlr8n.io`, `hub.xlr8n.io` verworfen)
- Iframe-Sandbox-Attribut nutzen? (Aktuell nicht — Trade-Off Sicherheit vs Login-Fluss-Reibung)
