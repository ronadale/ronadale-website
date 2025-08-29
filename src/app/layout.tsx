import type { Metadata } from "next";
import "./globals.css";
import { mockSiteSettings } from "@/lib/mock-data";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: {
    default: mockSiteSettings.title,
    template: `%s | ${mockSiteSettings.title}`,
  },
  description: mockSiteSettings.contactText,
  keywords: ["art residency", "artists", "contemporary art", "creative sanctuary", "art programs"],
  authors: [{ name: mockSiteSettings.title }],
  creator: mockSiteSettings.title,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mountainviewresidency.org",
    title: mockSiteSettings.title,
    description: mockSiteSettings.contactText,
    siteName: mockSiteSettings.title,
    images: [
      {
        url: mockSiteSettings.heroImage,
        width: 1920,
        height: 1080,
        alt: `${mockSiteSettings.title} - Art Residency Location`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: mockSiteSettings.title,
    description: mockSiteSettings.contactText,
    images: [mockSiteSettings.heroImage],
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
