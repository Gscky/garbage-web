import type { Metadata } from 'next'
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import { ColorProvider } from '@/context/ColorContext'
import { TabProvider } from '@/context/TabContext'
import Header from '@/components/layout/Header'
import { GarbageFooter } from '@/components/ui/garbage-footer'
import { GlobalBackground } from '@/components/ui/global-background'
import StickyBar from '@/components/ui/StickyBar'
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
              description: 'Alfombra publicitaria fabricada a medida con el logo de tu empresa en PVC rizado de alta durabilidad.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Publicitaria sin Logo',
              description: 'Alfombra publicitaria en color sólido sin logo. Disponible en 22 colores.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Tipo Nómada',
              description: 'Alfombra modular de filamento continuo, fácil de instalar, lavar y reubicar.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombra Tipo Cristal',
              description: 'PVC transparente de alta resistencia. Protege pisos delicados.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Stick Matt',
              description: 'Alfombra adhesiva desechable multicapa para retención de suciedad.',
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
            <GlobalBackground />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Header />
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
              <GarbageFooter />
              <StickyBar />
              <a
                href="https://wa.me/56996998344?text=Hola%2C%20quiero%20cotizar%20un%20limpiapi%C3%A9s%20personalizado"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
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
