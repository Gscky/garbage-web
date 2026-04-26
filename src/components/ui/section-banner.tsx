'use client'

import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

interface SectionBannerProps {
  eyebrow: string
  titulo: string
}

export function SectionBanner({ eyebrow, titulo }: SectionBannerProps) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#0A1628',
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem) clamp(2.5rem, 5vw, 4.5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,10,20,0.75)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Texto */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 700,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '0.75rem',
          }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            lineHeight: 1.1,
            color: '#FFFFFF',
          }}
        >
          {titulo}
        </motion.h1>
      </div>

      {/* Transición suave hacia el contenido */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, #F8F7F4)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </div>
  )
}
