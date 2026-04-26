'use client'

import { motion, type Variants } from 'framer-motion'
import { Circle } from 'lucide-react'
import { useTab } from '@/context/TabContext'

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.4 + i * 0.18,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const TRUST_BADGES = [
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Fabricación propia' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '30 años' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Despacho nacional' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Cotización en <24h' },
]

export default function Hero() {
  const { setActiveTab } = useTab()
  const scrollToCarrusel = () =>
    document.getElementById('carrusel-trabajos')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      aria-label="Hero"
      className="hero-bg"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: '120%',
        backgroundPosition: '45% 15%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay oscuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 10, 20, 0.60)',
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto',
          padding: 'clamp(110px, 14vw, 140px) clamp(1.25rem, 5vw, 2.5rem) 80px',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: '100px',
            padding: '0.35rem 1rem 0.35rem 0.75rem',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '2rem',
          }}
        >
          <Circle
            className="h-2 w-2 flex-shrink-0"
            style={{ fill: 'rgba(255,255,255,0.55)', stroke: 'none' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Fabricación propia · 30 años · Chile
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '1.5rem',
          }}
        >
          La primera impresión
          <br />
          está a tus pies.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '560px',
            marginBottom: '2.25rem',
          }}
        >
          Logo al milímetro, materiales para{' '}
          <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>
            miles de pisadas al día
          </strong>
          {' '}— entrega en 7 a 15 días hábiles a todo Chile. Asesoría sin costo, apruebas el diseño antes de fabricar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <button
            onClick={() => setActiveTab('cotizar')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0A1628',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '0.875rem 2rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF' }}
          >
            Cotizar ahora
          </button>
          <button
            onClick={scrollToCarrusel}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '0.95rem',
              padding: '0.875rem 2rem',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FFFFFF' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
          >
            Ver trabajos
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem 0.75rem',
          }}
        >
          {TRUST_BADGES.map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '100px',
                padding: '0.35rem 0.875rem',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '14px', height: '14px', flexShrink: 0 }}
              >
                <path d={icon} />
              </svg>
              <span
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
