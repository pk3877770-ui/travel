import { Metadata } from 'next'
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata("/blog");
  return mapSEOToMetadata(seo);
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageWithBreadcrumb routePath="/blog">
      {children}
    </PageWithBreadcrumb>
  )
}
