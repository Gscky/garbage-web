import type { Metadata } from 'next'
import TabProductos from '@/components/sections/tabs/TabProductos'

export const metadata: Metadata = {
  title: 'Productos — Limpiapiés y Alfombras Personalizadas',
  description:
    'Conocé nuestra línea completa: alfombra publicitaria con logo, tipo Nómada, tipo Cristal, Stick Matt y más. Fabricación 100% propia en Santiago. Cotización sin compromiso.',
  alternates: { canonical: 'https://www.garbage.cl/productos' },
}

export default function ProductosPage() {
  return <TabProductos />
}
