import { notFound, redirect } from "next/navigation";
import { getTenant } from "@/lib/tenants";

export default async function TenantIndex({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  const firstTab = tenant.tabs[0];
  if (!firstTab) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#a4abbd", fontSize: 16 }}>
        Kein Bereich konfiguriert für <strong>{tenant.name}</strong>.
      </div>
    );
  }

  redirect(`/${tenant.slug}/${firstTab.key}`);
}
