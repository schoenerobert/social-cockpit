import type { Tab } from "@/lib/config";
import { TENANT_NAME } from "@/lib/config";

export function TabRenderer({ tab }: { tab: Tab }) {
  if (!tab.iframeUrl) {
    return (
      <div style={messageStyle}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p style={kicker}>{TENANT_NAME} &middot; {tab.label}</p>
          <h2 style={{ fontSize: 24, margin: "8px 0 12px" }}>
            Backend-URL fehlt
          </h2>
          <p style={{ color: "#a4abbd", lineHeight: 1.6 }}>
            Setze die passende Variable im Coolify-ENV und deploye neu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={tab.iframeUrl}
      style={{
        border: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
      title={`${TENANT_NAME} ${tab.label}`}
    />
  );
}

const messageStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "40px",
  color: "#e7e9ee",
};

const kicker: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: "#5a6276",
  margin: 0,
};
