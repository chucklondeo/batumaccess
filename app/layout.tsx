import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://batumaccess.com"),
  title: {
    default: "Batum Technology | Global Smart Parking & Access Control Technology",
    template: "%s | Batum Technology"
  },
  description:
    "Batum Technology / 巴图姆（深圳）科技有限公司 builds global smart parking, rail transit AFC gates, barrier gate control, safety radar accessories and parking software with local server, cloud platform, multilingual and global payment integration.",
  keywords: [
    "smart parking system",
    "parking management software",
    "barrier gate manufacturer",
    "AFC gate",
    "platform screen door",
    "LPR camera",
    "radar sensor",
    "parking payment software",
    "local server parking system",
    "cloud parking platform"
  ],
  openGraph: {
    title: "Batum Technology | Global Smart Parking & Access Control Technology",
    description:
      "Smart parking hardware, rail transit access control and global parking software for international markets.",
    url: "https://batumaccess.com",
    siteName: "Batum Technology",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Batum Technology",
    description: "Global smart parking and access control technology."
  }
};

export const viewport: Viewport = {
  themeColor: "#04070f",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

