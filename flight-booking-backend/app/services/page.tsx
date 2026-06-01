import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import ServicesClient from './ServicesClient';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/services');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <PageWithBreadcrumb routePath="/services">
      <ServicesClient />
    </PageWithBreadcrumb>
  );
}
