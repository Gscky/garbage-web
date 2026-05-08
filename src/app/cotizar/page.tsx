import type { Metadata } from 'next'
import TabCotizar from '@/components/sections/tabs/TabCotizar'

export const metadata: Metadata = {
  title: 'Cotizar Limpiapiés Personalizados con Logo',
  description:
    'Solicitá una cotización sin compromiso. Respondemos en menos de 24 horas hábiles. Adjuntá tu logo y recibí un presupuesto detallado para tu empresa.',
  alternates: { canonical: 'https://garbage.cl/cotizar' },
}

export default function CotizarPage() {
  return <TabCotizar />
}
