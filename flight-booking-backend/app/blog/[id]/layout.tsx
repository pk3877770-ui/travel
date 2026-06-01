import React from 'react'
import { Metadata } from 'next'
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo'
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb'

type Props = {
  children: React.ReactNode
  params: any
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const seo = await getSEOMetadata(`/blog/${params.id}`)
  return mapSEOToMetadata(seo)
}

export default function BlogPostLayout({ children, params }: Props) {
  return (
    <PageWithBreadcrumb routePath={`/blog/${params.id}`}>
      {children}
    </PageWithBreadcrumb>
  )
}
