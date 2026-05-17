import type { Metadata } from 'next'
import ConfiguradorClient from './ConfiguradorClient'

export const metadata: Metadata = {
  title: 'Personaliza tu Limpiapiés — Configurador en Vivo',
  description:
    'Sube tu logo, elige entre 22 colores de PVC y visualiza tu limpiapiés personalizado en tiempo real. Cotiza en un click. Envío a todo Chile.',
  alternates: { canonical: 'https://www.garbage.cl/personaliza' },
}

export default function PersonalizaPage() {
  return <ConfiguradorClient />
}
