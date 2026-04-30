export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Karmana",
  "url": "https://karmana.vercel.app",
  "logo": "https://karmana.vercel.app/logo.png",
  "sameAs": [
    "https://facebook.com/karmana",
    "https://instagram.com/karmana",
    "https://twitter.com/karmana"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-1234567890",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Karmana",
  "url": "https://karmana.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://karmana.vercel.app/flight-booking?from={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";
 
 export async function generateMetadata(): Promise<Metadata> {
   const seo = await getSEOMetadata("/"); // Use Home SEO as baseline
   return mapSEOToMetadata(seo);
 }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent/30`}
      >
        <Navbar />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
