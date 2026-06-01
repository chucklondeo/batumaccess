"use client";

import { ChevronDown, Languages } from "lucide-react";
import { LocaleKey, locales } from "@/data/site";

export function LanguageSwitcher({
  locale,
  onLocaleChange
}: {
  locale: LocaleKey;
  onLocaleChange: (locale: LocaleKey) => void;
}) {
  return (
    <label className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white shadow-glow backdrop-blur-xl">
      <Languages className="h-4 w-4 text-gold" />
      <select
        className="cursor-pointer appearance-none bg-transparent pr-5 font-medium outline-none"
        value={locale}
        onChange={(event) => onLocaleChange(event.target.value as LocaleKey)}
        aria-label="Switch language"
      >
        {locales.map((item) => (
          <option key={item.key} value={item.key} className="bg-obsidian text-white">
            {item.label} / {item.market}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none -ml-6 h-4 w-4 text-steel transition group-hover:text-white" />
    </label>
  );
}

