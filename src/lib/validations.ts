import { z } from 'zod'

// ─── Opciones de producto ─────────────────────────────────────────────────

export const PRODUCTOS = [
  'Limpiapiés Personalizado con Logo',
  'Alfombra Publicitaria',
  'Antideslizante',
  'Alfombra Descarga Electrostática',
  'Cinta de Seguridad',
  'Alfombra en Rollo',
  'No estoy seguro — necesito asesoría',
] as const

// ─── Schema compartido (cliente + servidor) ───────────────────────────────

export const contactSchema = z.object({
  nombre: z.string().min(2, 'Ingresá tu nombre'),
  empresa: z.string().min(2, 'Ingresá el nombre de tu empresa'),
  email: z.string().email('Ese email no parece correcto'),
  telefono: z.string().optional(),
  producto: z.string().min(1, 'Elegí un producto'),
  mensaje: z.string().min(10, 'Contanos un poco sobre tu proyecto'),
})

export type ContactFormData = z.infer<typeof contactSchema>
