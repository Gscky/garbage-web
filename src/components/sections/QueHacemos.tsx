'use client'

import { motion } from 'framer-motion'

const problemas = [
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    problema: 'No todos los limpiapiés son para lo mismo',
    solucion: 'Te asesoramos sin costo. Según el tráfico y uso de tu local, te decimos exactamente qué material conviene. No vendemos lo mismo a todos.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    problema: 'El proveedor anterior no respetó las proporciones del logo',
    solucion: 'Cada diseño se trabaja con medidas exactas al milímetro. Tu logo queda centrado, a la escala correcta y con los colores exactos.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    problema: 'El limpiapiés dura 3 meses y ya está destruido',
    solucion: '30 años fabricando para Líder, Unimarc y BancoEstado. Materiales certificados para miles de personas al día, sin deterioro prematuro.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function QueHacemos() {
  return (
    <section
      id="que-hacemos"
      aria-labelledby="que-hacemos-heading"
      style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="container-site">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
          >
            Lo que hacemos
          </span>
          <h2
            id="que-hacemos-heading"
            className="font-bold max-w-2xl mx-auto"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
          >
            Los problemas que resolvemos antes de que te los traigan
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          {problemas.map((item) => (
            <motion.div
              key={item.problema}
              variants={cardVariants}
              className="relative rounded-2xl p-7 flex flex-col gap-5 transition-all duration-250"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderTop: `3px solid var(--accent)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(10,22,40,0.4)'
                e.currentTarget.style.borderTopColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.borderTopColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Ícono */}
              <div style={{ color: 'var(--accent)' }}>{item.icono}</div>

              {/* Problema */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.1em' }}>
                  El problema
                </p>
                <h3 className="text-lg font-semibold leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
                  {item.problema}
                </h3>
              </div>

              <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

              {/* Solución */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.1em' }}>
                  Nuestra respuesta
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
                  {item.solucion}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 text-[#000000] font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--accent)',
              borderRadius: '2px',
              padding: '1rem 2rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)' }}
          >
            Pedir cotización sin compromiso
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
