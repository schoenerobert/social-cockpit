import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Cockpit",
  description: "XLR8N — Multi-Tenant Inbox + Posting Cockpit",
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
        {children}
      </body>
    </html>
  );
}
