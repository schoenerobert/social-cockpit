export type TabKey = "posts" | "inbox";

export type Tab = {
  key: TabKey;
  label: string;
  iframeUrl?: string;
};

export const TENANT_NAME = "Vestrix";
export const TENANT_ACCENT = "#7c3aed";

export const TABS: Tab[] = [
  { key: "posts", label: "Posts", iframeUrl: process.env.POSTIZ_URL },
  { key: "inbox", label: "Inbox", iframeUrl: process.env.CHATWOOT_URL },
];

export function getTab(key: string): Tab | null {
  return TABS.find((t) => t.key === (key as TabKey)) ?? null;
}
