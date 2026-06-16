import React from 'react';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSEOMetadata("/profile");
  return mapSEOToMetadata(seo);
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWithBreadcrumb routePath="/profile">
      {children}
    </PageWithBreadcrumb>
  );
}
