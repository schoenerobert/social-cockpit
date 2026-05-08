import { TabRenderer } from "@/components/TabRenderer";
import { getTab } from "@/lib/config";

export default function PostsPage() {
  return <TabRenderer tab={getTab("posts")!} />;
}
