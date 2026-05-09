import { MetadataRoute } from 'next'

// Bloquea indexación en staging (.vercel.app).
// Cuando garbage.cl apunte a Vercel, agregar NEXT_PUBLIC_SITE_URL=https://www.garbage.cl
// en las env vars de Vercel para habilitar el crawl en producción.
const isProduction = process.env.NEXT_PUBLIC_SITE_URL === 'https://www.garbage.cl'

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
