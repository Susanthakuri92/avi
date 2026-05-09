import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avi Chetri | Visual Storyteller & Photographer",
  description: "Portfolio of Avi Chetri - Capturing moments through a lens, weaving stories through light and shadow. A visual storyteller based in the heart of the cosmos.",
  keywords: ["photographer", "visual storyteller", "portfolio", "Avi Chetri", "photography"],
  openGraph: {
    title: "Avi Chetri | Visual Storyteller & Photographer",
    description: "Capturing moments through a lens, weaving stories through light and shadow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
