'use client'

import { motion } from 'framer-motion'
import { useColor } from '@/context/ColorContext'

const colores = [
  { id: 1,  nombre: 'Lila / Morado',    hex: '#6B4C8A' },
  { id: 2,  nombre: 'Burdeo',           hex: '#6B1A2E' },
  { id: 3,  nombre: 'Rojo',             hex: '#CC1B1B' },
  { id: 4,  nombre: 'Café',             hex: '#6B3A1F' },
  { id: 5,  nombre: 'Rosado Claro',     hex: '#E8A0B0' },
  { id: 6,  nombre: 'Khaky',            hex: '#8B7355' },
  { id: 7,  nombre: 'Gris Claro',       hex: '#9E9E9E' },
  { id: 8,  nombre: 'Gris Oscuro',      hex: '#555555' },
  { id: 9,  nombre: 'Gris Plata',       hex: '#B8B8B8' },
  { id: 10, nombre: 'Azul Claro',       hex: '#3A7DC9' },
  { id: 11, nombre: 'Azul Oscuro',      hex: '#1A2B6B' },
  { id: 12, nombre: 'Celeste',          hex: '#5BC8F0' },
  { id: 13, nombre: 'Verde Fuji',       hex: '#2D7A3A' },
  { id: 14, nombre: 'Verde Oscuro',     hex: '#1A4A1F' },
  { id: 15, nombre: 'Verde Limón',      hex: '#8BC34A' },
  { id: 16, nombre: 'Negro',            hex: '#1A1A1A', border: true },
  { id: 17, nombre: 'Dorado',           hex: '#C9A227' },
  { id: 18, nombre: 'Amarillo',         hex: '#F5D800' },
  { id: 19, nombre: 'Salmon / Naranja', hex: '#E8632A' },
  { id: 20, nombre: 'Blanco',           hex: '#F5F5F5', border: true },
  { id: 21, nombre: 'Calipso',          hex: '#00BCD4' },
  { id: 22, nombre: 'Fucsia',           hex: '#E91E8C' },
]

const containerVariants = {
  visible: { transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
}

export default function ColoresDisponibles() {
  const { selectedColor, setSelectedColor } = useColor()

  return (
    <section
      id="colores"
      aria-labelledby="colores-heading"
      style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="container-site">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
          >
            Personalización total
          </span>
          <h2
            id="colores-heading"
            className="font-bold max-w-2xl mx-auto mb-4"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
          >
            Elige el color de tu limpiapiés
          </h2>
          <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
            Fabricamos con colores únicos de fábrica. Los logos no son pintados —
            se realiza un trabajo de <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>troquelado y fundido de filamentos</strong> continuos de vinilo.
          </p>
        </motion.div>

        {/* Grid de swatches: 6 col desktop / 4 tablet / 3 mobile */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {colores.map((color) => {
            const isSelected = selectedColor?.nombre === color.nombre
            return (
              <motion.div
                key={color.id}
                variants={itemVariants}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                onClick={() => setSelectedColor({ hex: color.hex, nombre: color.nombre })}
              >
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: color.hex,
                      border: isSelected
                        ? '2px solid #0A1628'
                        : color.border ? '2px solid rgba(240,237,230,0.15)' : '2px solid transparent',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    }}
                    title={color.nombre}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.transform = 'scale(1.08)'
                      el.style.boxShadow = `0 8px 24px ${color.hex}66`
                      el.style.borderColor = '#0A1628'
                      el.style.borderWidth = '2px'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.transform = 'scale(1)'
                      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)'
                      el.style.borderColor = isSelected
                        ? '#0A1628'
                        : color.border ? 'rgba(240,237,230,0.15)' : 'transparent'
                    }}
                  />
                  {isSelected && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      color: '#0A1628',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}>
                      ✓
                    </span>
                  )}
                </div>
                <span
                  className="text-xs text-center leading-tight max-w-[72px]"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
                >
                  {color.nombre}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Nota de fábrica */}
        <div
          className="max-w-2xl mx-auto text-center mb-10 rounded-xl px-6 py-4"
          style={{ backgroundColor: 'rgba(10,22,40,0.06)', border: '1px solid rgba(10,22,40,0.15)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>Nota:</span>{' '}
            Los colores son únicos de fábrica y no tienen variedad de Pantone.
            No fabricamos con degradés ni colores especiales.{' '}
            ¿Necesitás combinar colores para tu logo?{' '}
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ color: 'var(--accent)', fontWeight: 500 }}
              className="hover:underline"
            >
              Escríbenos y te asesoramos.
            </a>
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: '#000000', borderRadius: '2px', padding: '1rem 2rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)' }}
          >
            Cotizar con mi color
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
