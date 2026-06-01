import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import TermsClient from './TermsClient';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/terms');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <PageWithBreadcrumb routePath="/terms">
      <TermsClient />
    </PageWithBreadcrumb>
  );
}
