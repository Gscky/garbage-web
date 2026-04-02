'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { IconExperiencia } from '@/components/icons/IconExperiencia'
import { IconCobertura } from '@/components/icons/IconCobertura'
import { IconPersonalizacion } from '@/components/icons/IconPersonalizacion'
import { IconCalidad } from '@/components/icons/IconCalidad'

const items = [
  {
    titulo: '50+ años en el mercado',
    descripcion:
      'Llevamos más de medio siglo fabricando limpiapiés para las empresas más exigentes de Chile. Ese historial no se improvisa.',
    icono: IconExperiencia,
  },
  {
    titulo: 'Fabricación 100% propia',
    descripcion:
      'No intermediamos. Fabricamos en nuestra planta en Santiago, lo que nos da control total sobre calidad, tiempos y personalización.',
    icono: IconCobertura,
  },
  {
    titulo: 'Cobertura nacional',
    descripcion:
      'Despachamos a todas las regiones de Chile. Sin importar si tus instalaciones están en Arica o Punta Arenas, llegamos.',
    icono: IconCobertura,
  },
  {
    titulo: 'Personalización real',
    descripcion:
      'No es un logo impreso encima. Trabajamos el diseño, los colores y las medidas exactas que necesita tu empresa desde el inicio.',
    icono: IconPersonalizacion,
  },
  {
    titulo: 'Clientes de primer nivel',
    descripcion:
      'Líder, Unimarc, Paris, BancoEstado y municipalidades del país llevan años eligiéndonos. Sus estándares son altos — y los cumplimos.',
    icono: IconCalidad,
  },
  {
    titulo: 'Cotización sin vueltas',
    descripcion:
      'Respondemos en menos de 24 horas con precio, materiales y tiempos de entrega. Sin formularios interminables ni esperas innecesarias.',
    icono: IconCalidad,
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    alt: 'Limpieza industrial y alfombras personalizadas',
  },
  {
    src: 'https://images.unsplash.com/photo-1594153522012-5f13d8d5a2c7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ingreso de edificio con alfombra antideslizante',
  },
  {
    src: 'https://images.unsplash.com/photo-1601972593942-99b0071d4dd5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Trabajo en taller de tapices y diseño',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function PorQueElegirnos() {
  const reduced = useReducedMotion()

  return (
    <section
      id="por-que-elegirnos"
      aria-labelledby="pqe-heading"
      className="w-full py-20 md:py-28 bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Por qué elegirnos
          </p>
          <h2
            id="pqe-heading"
            className="text-3xl md:text-4xl font-black tracking-tight text-slate-900"
          >
            Experiencia, cumplimiento y fabricación propia
          </h2>
        </motion.div>

        {/* Galería de imágenes reales */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-xl shadow-sm border border-[#D2E9F0]">
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={reduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {items.map((item) => {
            const Icon = item.icono
            return (
              <motion.div
                key={item.titulo}
                variants={reduced ? undefined : itemVariants}
                className="group relative bg-white border border-cyan-100 rounded-xl p-6 transition-all duration-200 hover:border-cyan-300 hover:shadow-[0_4px_24px_rgba(14,165,233,0.16)]"
              >
                {/* Ícono */}
                <div className="w-10 h-10 text-cyan-600 mb-4">
                  <Icon className="w-full h-full" />
                </div>
                {/* Texto */}
                <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{item.titulo}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{item.descripcion}</p>
                {/* Flecha hover */}
                <span
                  className="absolute bottom-5 right-5 text-[#E63000] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-lg"
                  aria-hidden="true"
                >
                  →
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
