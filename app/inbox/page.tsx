import { TabRenderer } from "@/components/TabRenderer";
import { getTab } from "@/lib/config";

export default function InboxPage() {
  return <TabRenderer tab={getTab("inbox")!} />;
}
