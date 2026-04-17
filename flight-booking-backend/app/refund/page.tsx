import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import RefundClient from './RefundClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/refund');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <RefundClient />;
}
