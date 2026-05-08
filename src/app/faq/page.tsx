import type { Metadata } from 'next'
import TabFAQ from '@/components/sections/tabs/TabFAQ'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes — Limpiapiés Personalizados Chile',
  description:
    'Resolvemos tus dudas: tiempos de fabricación, cantidad mínima, materiales, envíos y precios. Todo sobre limpiapiés personalizados con logo en Chile.',
  alternates: { canonical: 'https://garbage.cl/faq' },
}

export default function FAQPage() {
  return <TabFAQ />
}
