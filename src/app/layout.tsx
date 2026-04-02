import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Garbage | Limpiapiés Personalizados para Empresas',
  description:
    'Fabricamos limpiapiés y alfombras personalizadas con tu logo para empresas de todo Chile. Más de 50 años de trayectoria. Líder, Unimarc, Paris y cientos de empresas confían en nosotros.',
  keywords: [
    'limpiapiés personalizados',
    'alfombras con logo empresa',
    'limpiapiés para empresas Chile',
    'alfombras publicitarias',
    'limpiapiés corporativos',
    'fabricación limpiapiés Santiago',
  ],
  authors: [{ name: 'Garbage' }],
  creator: 'Garbage',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Garbage',
    title: 'Garbage | Limpiapiés Personalizados para Empresas',
    description:
      'Fabricamos limpiapiés y alfombras personalizadas con tu logo para empresas de todo Chile. Más de 50 años de trayectoria.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-white text-[#1A1A1A]`}
        style={{ overflowX: 'hidden' }}
      >
        {children}
      </body>
    </html>
  )
}
