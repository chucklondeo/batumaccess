import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView } from "@/components/site-shell";
import { LocaleKey, locales, messages } from "@/data/site";

export function generateStaticParams() {
  return locales.filter((locale) => locale.key !== "en").map((locale) => ({ locale: locale.key }));
}

export function generateMetadata({ params }: { params: { locale: LocaleKey } }): Metadata {
  if (!locales.some((locale) => locale.key === params.locale) || params.locale === "en") return {};
  return { title: messages[params.locale].heroTitle, description: messages[params.locale].heroBody };
}

export default function LocaleHome({ params }: { params: { locale: LocaleKey } }) {
  if (!locales.some((locale) => locale.key === params.locale) || params.locale === "en") notFound();
  return <HomeView locale={params.locale} />;
}
