import type { Metadata } from "next";
import Link from "next/link";
import { TABS, TENANT_NAME, TENANT_ACCENT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Social Cockpit",
  description: "XLR8N — Social Cockpit for Vestrix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#0b0d12",
          color: "#e7e9ee",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "100vh", width: "100vw" }}>
          <aside style={{ background: "#0b0d12", borderRight: "1px solid #1f2330", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#5a6276", margin: 0 }}>XLR8N</p>
              <h1 style={{ fontSize: 18, margin: "4px 0 0", fontWeight: 700, color: "#e7e9ee" }}>Social Cockpit</h1>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: `1px solid ${TENANT_ACCENT}`, background: "#161922", fontSize: 14, fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: TENANT_ACCENT, display: "inline-block" }} />
                {TENANT_NAME}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#5a6276", margin: "0 0 8px" }}>Bereiche</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {TABS.map((tab) => (
                  <Link key={tab.key} href={`/${tab.key}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, textDecoration: "none", color: "#a4abbd", fontSize: 14, fontWeight: 500 }}>
                    {tab.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "auto", fontSize: 11, color: "#5a6276" }}>Stage 2 Sandbox &middot; no auth yet</div>
          </aside>

          <main style={{ background: "#0f1218", overflow: "hidden" }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
