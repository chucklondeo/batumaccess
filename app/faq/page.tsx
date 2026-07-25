import { PageView } from "@/components/site-shell";
import { faqJsonLd } from "@/data/seo";

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageView locale="en" slug="faq" />
    </>
  );
}
