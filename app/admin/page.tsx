import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin-panel";

export const metadata: Metadata = {
  title: "Batum Content Hub",
  description: "Local content management panel for Batum Technology products, datasheets and SEO content."
};

export default function AdminPage() {
  return <AdminPanel />;
}
