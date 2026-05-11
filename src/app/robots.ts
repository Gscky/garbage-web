import { MetadataRoute } from 'next'

// VERCEL_ENV es automático: 'production' | 'preview' | 'development'
// No necesita configuración manual en Vercel.
const isProduction = process.env.VERCEL_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.garbage.cl/sitemap.xml',
  }
}
