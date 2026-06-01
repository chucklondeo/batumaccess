export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Batum Technology / 巴图姆（深圳）科技有限公司",
  url: "https://batumaccess.com",
  description:
    "Global smart parking, rail transit access control, barrier gate, radar accessories and parking software technology company.",
  areaServed: ["Hong Kong", "Singapore", "Middle East", "Europe", "Southeast Asia"],
  knowsAbout: [
    "Smart Parking",
    "Barrier Gate",
    "AFC Gate",
    "Platform Screen Door",
    "LPR Camera",
    "Radar Sensor",
    "Parking Management Software",
    "Global Payment Integration"
  ]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Batum Technology",
  url: "https://batumaccess.com",
  inLanguage: ["en", "zh", "es", "ar", "fr", "pt", "ru"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://batumaccess.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

