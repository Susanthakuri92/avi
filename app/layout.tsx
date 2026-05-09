import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVI | Visual Storyteller & Photographer",
  description: "Portfolio of Avi Chetri - Capturing moments through a lens, weaving stories through light and shadow.",
  keywords: ["photographer", "visual storyteller", "portfolio", "Avi Chetri", "photography"],
  authors: [{ name: "Avi Chetri" }],
  creator: "Avi Chetri",
  openGraph: {
    title: "AVI | Visual Storyteller & Photographer",
    description: "Capturing moments through a lens, weaving stories through light and shadow.",
    url: "https://avichetri.com",
    siteName: "Avi Chetri Photography",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1449824913935-59597967a563?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Avi Chetri - Urban Exploration Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVI | Visual Storyteller & Photographer",
    description: "Capturing moments through a lens, weaving stories through light and shadow.",
    creator: "@mr_avi_12",
    images: ["https://images.unsplash.com/photo-1449824913935-59597967a563?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Avi Chetri Photography",
  description: "Visual storytelling through photography - capturing moments where light meets shadow.",
  url: "https://avichetri.com",
  image: "https://images.unsplash.com/photo-1449824913935-59597967a563?auto=format&fit=crop&q=80&w=1200&h=630",
  sameAs: ["https://www.instagram.com/mr_avi_12/"],
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceType: "Photography & Visual Storytelling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${outfit.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}