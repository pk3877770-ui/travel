import React from 'react';
import { getSEOMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site-url';

type Props = {
  routePath: string;
  children: React.ReactNode;
};

function prettifySegment(seg: string) {
  return seg
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export default async function PageWithBreadcrumb({ routePath, children }: Props) {
  const siteUrl = getSiteUrl();

  // Normalize and split path into segments
  const normalized = routePath && routePath.startsWith('/') ? routePath : `/${routePath}`;
  const trimmed = normalized.replace(/(^\/|\/$)/g, '');
  const segments = trimmed === '' ? [] : trimmed.split('/');

  // Build cumulative paths like /blog, /blog/123
  const cumulativePaths = segments.map((_, idx) => '/' + segments.slice(0, idx + 1).join('/'));

  // Fetch SEO metadata for each cumulative path in parallel
  const seoList = await Promise.all(cumulativePaths.map((p) => getSEOMetadata(p)));

  const itemListElement: any[] = [];

  // Home item
  itemListElement.push({
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: siteUrl,
  });

  // Add each segment as a breadcrumb item
  for (let i = 0; i < cumulativePaths.length; i++) {
    const p = cumulativePaths[i];
    const seo = seoList[i] || {};
    const name = seo.title || prettifySegment(segments[i]);
    const item = seo.og_url || seo.canonical || `${siteUrl}${p}`;
    itemListElement.push({
      '@type': 'ListItem',
      position: i + 2,
      name,
      item,
    });
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
