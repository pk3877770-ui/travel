export const dynamic = "force-dynamic";

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
  name: "Kramana",
  url: "https://kramana.vercel.app",
  logo: "https://kramana.vercel.app/logo.png",
  sameAs: [
    "https://facebook.com/kramana",
    "https://instagram.com/kramana",
    "https://twitter.com/kramana",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-1234567890",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kramana",
  url: "https://kramana.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kramana.vercel.app/flights?from={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kramana",
  description:
    "Experience the art of travel with Kramana's premium concierge services.",
  publisher: {
    "@type": "Organization",
    name: "Kramana",
  },
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
    verification: {
      google: "WunfK7xwxVIaTuQXXc70LxW_WAvNzGitj-HgGWeRjN0",
    },

    metadataBase: new URL("https://kramana.vercel.app"),
    openGraph: {
      ...mappedMetadata.openGraph,
      images: [
        {
          url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&h=630&q=80",
          width: 1200,
          height: 630,
          alt: "Kramana Luxury Travel Concierge",
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
            src="https://www.googletagmanager.com/gtag/js?id=G-5CW4N3EYJJ"
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-5CW4N3EYJJ');
            `}
          </Script>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
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
          <main className="min-h-screen">{children}</main>
          <Footer />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
