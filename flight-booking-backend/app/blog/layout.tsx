import { Metadata } from 'next'
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata("/blog");
  return mapSEOToMetadata(seo);
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
