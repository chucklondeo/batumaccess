import type { Metadata } from "next";
import { PageView } from "@/components/site-shell";
import { hreflangAlternates } from "@/data/site";

export const metadata: Metadata = { alternates: { languages: hreflangAlternates("seo-hub") } };

export default function Page() { return <PageView locale="en" slug="seo-hub" />; }
