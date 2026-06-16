import { Metadata } from 'next'
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata("/auth");
  return mapSEOToMetadata(seo);
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageWithBreadcrumb routePath="/auth">
      {children}
    </PageWithBreadcrumb>
  )
}
