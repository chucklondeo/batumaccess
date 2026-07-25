import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/site-shell";
import { LocaleKey, locales, messages, pageSlugs, PageSlug } from "@/data/site";

export function generateStaticParams() {
  return locales
    .filter((locale) => locale.key !== "en")
    .flatMap((locale) => pageSlugs.map((slug) => ({ locale: locale.key, slug })));
}

export function generateMetadata({ params }: { params: { locale: LocaleKey; slug: string } }): Metadata {
  if (!locales.some((locale) => locale.key === params.locale) || !pageSlugs.includes(params.slug as PageSlug)) return {};
  const section = messages[params.locale].sections[params.slug as PageSlug];
  return { title: section.title, description: section.body };
}

export default function LocalizedPage({ params }: { params: { locale: LocaleKey; slug: string } }) {
  if (!locales.some((locale) => locale.key === params.locale) || !pageSlugs.includes(params.slug as PageSlug)) notFound();
  return <PageView locale={params.locale} slug={params.slug as PageSlug} />;
}
