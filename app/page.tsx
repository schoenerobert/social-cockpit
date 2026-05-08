export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#7a8295",
            marginBottom: 16,
          }}
        >
          XLR8N — Stage 2 Sandbox
        </p>
        <h1 style={{ fontSize: 48, margin: 0, fontWeight: 700 }}>
          Social Cockpit
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#a4abbd",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          Multi-Tenant Frontend ueber self-hosted Postiz + Chatwoot.
          <br />
          Erste Tenants: Vestrix &middot; Robert.
        </p>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/vestrix" style={cardStyle("#7c3aed")}>→ /vestrix</a>
          <a href="/robert" style={cardStyle("#0891b2")}>→ /robert</a>
        </div>
      </div>
    </main>
  );
}

function cardStyle(accent: string): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "16px 28px",
    background: "#161922",
    color: "#e7e9ee",
    border: `1px solid ${accent}`,
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 16,
  };
}
