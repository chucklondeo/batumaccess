import { contact } from "@/data/site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: contact.company,
  url: "https://batumaccess.com",
  email: contact.email,
  description:
    "Low-voltage servo smart parking, pedestrian access control, platform screen door control, safety radar and parking software manufacturer.",
  areaServed: ["Global", "Hong Kong", "Singapore", "Vietnam", "Malaysia", "Thailand", "Europe", "Middle East"],
  knowsAbout: [
    "Servo barrier gate",
    "Door operator",
    "Safety radar",
    "Parking software",
    "Pedestrian access gate",
    "Platform screen door control"
  ]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Batum Technology",
  url: "https://batumaccess.com",
  inLanguage: ["en", "zh-Hant", "es", "vi", "ms", "th"]
};
