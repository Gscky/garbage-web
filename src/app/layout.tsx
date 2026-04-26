import type { Metadata } from 'next'
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import { ColorProvider } from '@/context/ColorContext'
import { TabProvider } from '@/context/TabContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const SITE_URL = 'https://garbage.cl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Garbage | Limpiapiés Personalizados con Logo para Empresas en Chile',
    template: '%s | Garbage',
  },
  description:
    'Fabricamos limpiapiés y alfombras personalizadas con tu logo para empresas de todo Chile. 30 años de experiencia. Líder, Unimarc, Paris, BancoEstado confían en nosotros. Cotización en 24h.',
  keywords: [
    'limpiapiés personalizados Chile',
    'limpiapiés con logo empresa',
    'alfombras corporativas personalizadas',
    'limpiapiés publicitarios Santiago',
    'alfombras con logo retail',
    'limpiapiés para retail Chile',
    'limpiapiés para bancos Chile',
    'alfombras antideslizantes empresas',
    'fabricante limpiapiés Santiago',
    'limpiapiés a medida Chile',
    'proveedor limpiapiés corporativo Chile',
    'cotizar limpiapiés personalizados Chile',
    'limpiapiés vinilo Chile',
    'limpiapiés tipo nomad',
    'alfombras entrada empresas Chile',
    'proveedor alfombras Santiago',
  ],
  authors: [{ name: 'Garbage' }],
  creator: 'Garbage',
  publisher: 'Garbage',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Garbage — Limpiapiés Personalizados',
    title: 'Limpiapiés Personalizados con Logo para Empresas | Garbage Chile',
    description:
      '30 años fabricando limpiapiés y alfombras personalizadas para las empresas más grandes de Chile. Cotización en 24h. Despacho a todo el país.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Garbage — Limpiapiés Personalizados con Logo para Empresas en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limpiapiés Personalizados con Logo | Garbage Chile',
    description:
      '30 años fabricando limpiapiés para las marcas más grandes de Chile. Cotización en 24h.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#organization`,
      name: 'Garbage',
      description:
        'Fabricamos limpiapiés y alfombras personalizadas con logo para empresas de todo Chile. 30 años de experiencia.',
      url: SITE_URL,
      telephone: ['+56226836012', '+56226841460', '+56996998344', '+56994444244'],
      email: 'ventas@garbage.cl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'La Raza #1695',
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -33.4489,
        longitude: -70.6693,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Chile',
      },
      priceRange: '$$',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Productos Garbage',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Publicitaria con Logo',
              description: 'Alfombra publicitaria fabricada a medida con el logo de tu empresa en PVC rizado de alta durabilidad. Colores únicos de fábrica, medidas personalizadas. Ideal para retail, bancos, municipalidades y oficinas de alto tráfico.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Publicitaria sin Logo',
              description: 'Alfombra publicitaria en color sólido sin logo. Disponible en 22 colores, superficie antideslizante, para interior y exterior.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Tipo Nómada',
              description: 'Alfombra modular de filamento continuo, fácil de instalar, lavar y reubicar. Ideal para eventos, ferias y espacios temporales en Chile.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Tipo Cristal',
              description: 'PVC transparente de alta resistencia. Protege pisos delicados manteniendo la estética del espacio visible.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Stick Matt',
              description: 'Alfombra adhesiva desechable multicapa para retención de suciedad y polvo en zonas de ingreso a áreas limpias o laboratorios.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Garbage',
      description: 'Limpiapiés Personalizados con Logo para Empresas en Chile',
      inLanguage: 'es-CL',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preload" as="image" href="/images/hero-bg.jpg" />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${dmSans.variable} antialiased overflow-x-hidden`}
        style={{ overflowX: 'hidden' }}
      >
        <TabProvider>
          <ColorProvider>
            {children}
          </ColorProvider>
        </TabProvider>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
