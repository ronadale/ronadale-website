import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

const siteTitle = "RONADALE";
const siteDescription = "44 Ronadale road, Craryville NY. Open by Appointment";
const siteUrl = "https://ronadale.com";
const heroImage = "/hero.jpg";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: ["art residency", "artists", "contemporary art", "gallery", "exhibitions"],
  authors: [{ name: siteTitle }],
  creator: siteTitle,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: heroImage,
        width: 1920,
        height: 1080,
        alt: `${siteTitle} - Art Gallery and Residency`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [heroImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="navigation-layer">
          <Navigation />
        </div>
        <div className="content-layer">
          {children}
        </div>
      </body>
    </html>
  );
}
