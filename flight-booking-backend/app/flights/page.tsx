import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import FlightClient from './FlightClient';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/flights');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <PageWithBreadcrumb routePath="/flights">
      <FlightClient />
    </PageWithBreadcrumb>
  );
}
