import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://batumaccess.com"),
  title: {
    default: "Batum Technology | Global Smart Parking & Access Control Technology",
    template: "%s | Batum Technology"
  },
  description:
    "Batum Technology / 巴圖姆（深圳）科技有限公司 builds low-voltage servo barrier gates, door operators, safety radar accessories, access control hardware and parking software.",
  keywords: [
    "servo barrier gate",
    "door operator",
    "safety radar",
    "parking software",
    "access control manufacturer",
    "low voltage servo control",
    "platform screen door control"
  ],
  openGraph: {
    title: "Batum Technology | Global Smart Parking & Access Control Technology",
    description: "Low-voltage servo access control hardware and parking software for international markets.",
    url: "https://batumaccess.com",
    siteName: "Batum Technology",
    type: "website"
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
