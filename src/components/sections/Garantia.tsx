'use client'

import { motion } from 'framer-motion'

const garantias = [
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    titulo: 'Ves el diseño antes de fabricar',
    descripcion: 'Te enviamos la prueba visual con tu logo aplicado. Si no te convence, lo ajustamos. Ningún pedido entra a producción sin tu aprobación.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    titulo: 'Logo exacto o lo rehacemos',
    descripcion: 'Trabajamos con medidas al milímetro. Si el resultado no coincide con el diseño aprobado, lo fabricamos nuevamente sin costo adicional.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    titulo: 'Sin cantidad mínima de pedido',
    descripcion: 'Fabricamos desde una unidad hasta cientos de piezas para grandes cadenas. El mismo estándar de calidad en todos los pedidos.',
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

export default function Garantia() {
  return (
    <section
      id="garantia"
      aria-labelledby="garantia-heading"
      style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="container-site">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
          >
            Sin letra chica
          </span>
          <h2
            id="garantia-heading"
            className="font-bold max-w-2xl mx-auto"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
          >
            Tu pedido sale bien o no sale
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}
          >
            Tres compromisos concretos que hacen que trabajar con nosotros sea sin riesgo.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {garantias.map((item) => (
            <motion.div
              key={item.titulo}
              variants={cardVariants}
              className="relative rounded-2xl p-7 flex flex-col gap-5"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderBottom: `3px solid var(--accent)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(10,22,40,0.4)'
                e.currentTarget.style.borderBottomColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.borderBottomColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Ícono con fondo */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(10,22,40,0.12)', color: 'var(--accent)' }}
              >
                {item.icono}
              </div>

              {/* Texto */}
              <div>
                <h3 className="text-lg font-semibold mb-2 leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
                  {item.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
                  {item.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
