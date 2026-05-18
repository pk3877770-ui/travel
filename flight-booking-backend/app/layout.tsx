export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SessionProvider from "@/components/SessionProvider";

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
    "target": "https://karmana.vercel.app/flights?from={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Karmana",
  "description": "Experience the art of travel with Karmana's premium concierge services.",
  "publisher": {
    "@type": "Organization",
    "name": "Karmana"
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
    const mappedMetadata = mapSEOToMetadata(seo);
    
    return {
      ...mappedMetadata,
      metadataBase: new URL("https://karmana.vercel.app"),
      openGraph: {
        ...mappedMetadata.openGraph,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&h=630&q=80',
            width: 1200,
            height: 630,
            alt: 'Karmana Luxury Travel Concierge',
          },
        ],
      },
    };
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
        <SessionProvider>
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
          <Script
            id="webpage-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
          />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
