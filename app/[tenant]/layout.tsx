import { notFound } from "next/navigation";
import Link from "next/link";
import { getTenant, listTenants } from "@/lib/tenants";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  const allTenants = listTenants();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "100vh", width: "100vw" }}>
      <aside style={{ background: "#0b0d12", borderRight: "1px solid #1f2330", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#5a6276", margin: 0 }}>XLR8N</p>
          <h1 style={{ fontSize: 18, margin: "4px 0 0", fontWeight: 700, color: "#e7e9ee" }}>Social Cockpit</h1>
        </div>

        <div>
          <p style={sectionLabel}>Tenant</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {allTenants.map((t) => {
              const active = t.slug === tenant.slug;
              return (
                <Link key={t.slug} href={`/${t.slug}`} style={{ ...switcherItem, background: active ? "#161922" : "transparent", borderColor: active ? t.accent : "transparent", color: active ? "#e7e9ee" : "#a4abbd" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: t.accent, display: "inline-block" }} />
                  {t.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p style={sectionLabel}>Bereiche</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {tenant.tabs.map((tab) => (
              <Link key={tab.key} href={`/${tenant.slug}/${tab.key}`} style={{ ...tabItem, opacity: tab.comingSoon ? 0.5 : 1 }}>
                <span>{tab.label}</span>
                {tab.comingSoon && <span style={badgeStyle}>soon</span>}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto", fontSize: 11, color: "#5a6276" }}>Stage 2 Sandbox &middot; no auth yet</div>
      </aside>

      <main style={{ background: "#0f1218", overflow: "hidden" }}>{children}</main>
    </div>
  );
}

const sectionLabel: React.CSSProperties = { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#5a6276", margin: "0 0 8px" };
const switcherItem: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: "1px solid transparent", textDecoration: "none", fontSize: 14, fontWeight: 500 };
const tabItem: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, textDecoration: "none", color: "#a4abbd", fontSize: 14, fontWeight: 500 };
const badgeStyle: React.CSSProperties = { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#5a6276", border: "1px solid #2a3142", borderRadius: 4, padding: "1px 6px" };
