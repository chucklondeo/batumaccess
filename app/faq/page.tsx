import type { Metadata } from "next";
import { PageView } from "@/components/site-shell";
import { faqJsonLd } from "@/data/seo";
import { hreflangAlternates } from "@/data/site";

export const metadata: Metadata = { alternates: { languages: hreflangAlternates("faq") } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageView locale="en" slug="faq" />
    </>
  );
}
