import type { Metadata } from 'next'
import TabContacto from '@/components/sections/tabs/TabContacto'

export const metadata: Metadata = {
  title: 'Contacto — Garbage Limpiapiés Personalizados Chile',
  description:
    'Contáctanos por teléfono, WhatsApp o email. La Raza #1695, Santiago. Atención lunes a viernes 09:00–18:00 hrs. También despachamos a todas las regiones de Chile.',
  alternates: { canonical: 'https://garbage.cl/contacto' },
}

export default function ContactoPage() {
  return <TabContacto />
}
