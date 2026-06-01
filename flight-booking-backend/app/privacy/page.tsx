import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import PrivacyClient from './PrivacyClient';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/privacy');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <PageWithBreadcrumb routePath="/privacy">
      <PrivacyClient />
    </PageWithBreadcrumb>
  );
}
