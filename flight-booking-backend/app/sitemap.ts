import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://karmana.vercel.app'
  
  const routes = [
    '',
    '/holiday-packages',
    '/hotels',
    '/flights',
    '/services',
    '/about',
    '/contact',
    '/auth',
    '/refund',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
