import type { Metadata } from 'next'
import TabPersonaliza from '@/components/sections/tabs/TabPersonaliza'

export const metadata: Metadata = {
  title: 'Personaliza tu Limpiapiés — Configurador de Colores',
  description:
    'Diseña tu limpiapiés personalizado: elige entre 22 colores únicos de fábrica y visualiza el resultado antes de cotizar. Envío a todo Chile.',
  alternates: { canonical: 'https://www.garbage.cl/personaliza' },
}

export default function PersonalizaPage() {
  return <TabPersonaliza />
}
