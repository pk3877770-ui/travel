export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavbarShell from "@/components/NavbarShell";
import Script from "next/script";
import { getSiteUrl } from "@/lib/site-url";
import { BookingProvider } from "@/context/BookingContext";
import SessionProvider from "@/components/SessionProvider";
import TabSessionGuard from "@/components/TabSessionGuard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

function getStructuredData(siteUrl: string) {
  return {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Kramana",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
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
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Kramana",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/flights?from={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    webPage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Kramana",
      description:
        "Experience the art of travel with Kramana's premium concierge services.",
      publisher: {
        "@type": "Organization",
        name: "Kramana",
      },
    },
  };
}

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
  const siteUrl = getSiteUrl();

  return {
    ...mappedMetadata,
    verification: {
      google: "WunfK7xwxVIaTuQXXc70LxW_WAvNzGitj-HgGWeRjN0",
    },

    metadataBase: new URL(siteUrl),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const structuredData = getStructuredData(siteUrl);
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent/30`}
      >
        <SessionProvider session={session}>
          <TabSessionGuard />
          <NavbarShell />
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
                __html: JSON.stringify(structuredData.organization),
              }}
            />
            <Script
              id="website-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData.website),
              }}
            />
            <Script
              id="webpage-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData.webPage),
              }}
            />
            <Script id="google-translate-init" strategy="lazyOnload">
              {`
                function googleTranslateElementInit() {
                  new window.google.translate.TranslateElement(
                    {pageLanguage: 'en', includedLanguages: 'en,hi,fr,es', autoDisplay: false}, 
                    'google_translate_element'
                  );
                }
              `}
            </Script>
            <Script 
              src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
              strategy="lazyOnload" 
            />
            <div id="google_translate_element" className="hidden"></div>
            <BookingProvider>
              <main className="min-h-screen">{children}</main>
            </BookingProvider>
            <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
