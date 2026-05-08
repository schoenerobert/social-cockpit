export type TabKey = "posts" | "inbox" | "linkedin";

export type Tab = {
  key: TabKey;
  label: string;
  iframeUrl?: string;
  comingSoon?: boolean;
};

export type Tenant = {
  slug: string;
  name: string;
  accent: string;
  tabs: Tab[];
};

export const TENANTS: Record<string, Tenant> = {
  vestrix: {
    slug: "vestrix",
    name: "Vestrix",
    accent: "#7c3aed",
    tabs: [
      { key: "posts", label: "Posts", iframeUrl: process.env.POSTIZ_VESTRIX_URL },
    ],
  },
  robert: {
    slug: "robert",
    name: "Robert",
    accent: "#0891b2",
    tabs: [
      { key: "posts", label: "Posts", iframeUrl: process.env.POSTIZ_ROBERT_URL },
      { key: "inbox", label: "Inbox", iframeUrl: process.env.CHATWOOT_ROBERT_URL },
      { key: "linkedin", label: "LinkedIn", comingSoon: true },
    ],
  },
};

export function getTenant(slug: string): Tenant | null {
  return TENANTS[slug] ?? null;
}

export function listTenants(): Tenant[] {
  return Object.values(TENANTS);
}
