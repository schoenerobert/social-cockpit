import { notFound } from "next/navigation";
import { getTenant, type TabKey } from "@/lib/tenants";

export default async function TabPage({
  params,
}: {
  params: Promise<{ tenant: string; tab: string }>;
}) {
  const { tenant: slug, tab: tabKey } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  const tab = tenant.tabs.find((t) => t.key === (tabKey as TabKey));
  if (!tab) notFound();

  if (tab.comingSoon) {
    return (
      <div style={messageStyle}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p style={kicker}>{tenant.name} &middot; {tab.label}</p>
          <h2 style={{ fontSize: 24, margin: "8px 0 12px" }}>Phase B</h2>
          <p style={{ color: "#a4abbd", lineHeight: 1.6 }}>
            LinkedIn-DMs landen via Prosp + Unipile-Bridge in Chatwoot. Wird nach Stage-3-Promotion aktiviert.
          </p>
        </div>
      </div>
    );
  }

  if (!tab.iframeUrl) {
    return (
      <div style={messageStyle}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p style={kicker}>{tenant.name} &middot; {tab.label}</p>
          <h2 style={{ fontSize: 24, margin: "8px 0 12px" }}>Backend-URL fehlt</h2>
          <p style={{ color: "#a4abbd", lineHeight: 1.6 }}>
            Setze die passende Variable in <code style={codeStyle}>.env.local</code>{" "}
            und starte den Dev-Server neu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={tab.iframeUrl}
      style={{ border: 0, width: "100%", height: "100%", display: "block" }}
      title={`${tenant.name} ${tab.label}`}
    />
  );
}

const messageStyle: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", color: "#e7e9ee" };
const kicker: React.CSSProperties = { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#5a6276", margin: 0 };
const codeStyle: React.CSSProperties = { background: "#161922", padding: "2px 6px", borderRadius: 4, fontSize: 13 };
