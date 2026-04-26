'use client'

import { motion } from 'framer-motion'

const diferenciadores = [
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    titulo: 'Fabricación 100% propia en Chile',
    descripcion: 'Producimos en nuestra planta en Santiago. Sin intermediarios. Control total sobre calidad y plazos de entrega.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    titulo: '30 años en el mercado',
    descripcion: 'Desde 1994 fabricando para las empresas más exigentes de Chile. Un historial que se defiende con cada pedido.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    titulo: 'Logo proporcional garantizado',
    descripcion: 'Cada diseño se trabaja con medidas exactas al milímetro. El logo de tu empresa queda centrado, a escala y con los colores correctos.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    titulo: 'Clientes de primer nivel',
    descripcion: 'Líder, Unimarc, Paris, BancoEstado y municipalidades de todo Chile nos eligen hace décadas. Sus estándares son altos — y los cumplimos.',
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

export default function PorQueElegirnos() {
  return (
    <section
      id="por-que-elegirnos"
      aria-labelledby="pqe-heading"
      style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '5rem', paddingBottom: '5rem' }}
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
            Por qué Garbage
          </span>
          <h2
            id="pqe-heading"
            className="font-bold max-w-2xl mx-auto"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
          >
            30 años haciendo que tu marca quede bien desde el suelo
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}
          >
            No somos un proveedor más. Somos la empresa que elige el retail chileno cuando la imagen importa.
          </p>
        </motion.div>

        {/* Grid 2×2 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          {diferenciadores.map((item) => (
            <motion.div
              key={item.titulo}
              variants={cardVariants}
              className="group relative rounded-2xl p-6 flex gap-5 items-start transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(10,22,40,0.4)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(10,22,40,0.08)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Ícono */}
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(10,22,40,0.10)', color: 'var(--accent)' }}
              >
                {item.icono}
              </div>

              {/* Texto */}
              <div>
                <h3 className="text-base font-semibold mb-1.5 leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
                  {item.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
                  {item.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stat bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl p-8"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { num: '30+', label: 'años fabricando' },
            { num: '500+', label: 'empresas atendidas' },
            { num: '100%', label: 'fabricación propia' },
            { num: '<24h', label: 'respuesta cotización' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-playfair)' }}
              >
                {stat.num}
              </p>
              <p
                className="text-xs uppercase tracking-wide mt-1"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.1em' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
