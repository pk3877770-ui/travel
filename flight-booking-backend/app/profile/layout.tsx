import React from 'react';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWithBreadcrumb routePath="/profile">
      {children}
    </PageWithBreadcrumb>
  );
}
