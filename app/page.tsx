import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { organizationJsonLd, websiteJsonLd } from "@/data/seo";
import { hreflangAlternates } from "@/data/site";

export const metadata: Metadata = {
  alternates: { languages: hreflangAlternates() }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <LandingPage />
    </>
  );
}

