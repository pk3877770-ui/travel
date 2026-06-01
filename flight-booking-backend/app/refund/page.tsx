import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import RefundClient from './RefundClient';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/refund');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <PageWithBreadcrumb routePath="/refund">
      <RefundClient />
    </PageWithBreadcrumb>
  );
}
