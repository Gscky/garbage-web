'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTab } from '@/context/TabContext'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)
  const { activeTab, setActiveTab } = useTab()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ocultar cuando el usuario ya está en el tab de cotizar
  if (activeTab === 'cotizar') return null

  const handleCTA = () => setActiveTab('cotizar')

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between"
          style={{
            backgroundColor: '#0A1628',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            padding: '0.55rem clamp(1rem, 4vw, 2.5rem)',
          }}
        >
          {/* Texto — solo desktop */}
          <p className="hidden md:flex items-center gap-2" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            <span style={{
              display: 'inline-block', width: '6px', height: '6px',
              borderRadius: '50%', backgroundColor: '#E63000', flexShrink: 0,
            }} />
            Limpiapiés personalizados con tu logo
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>—</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Fabricación propia · 30 años de experiencia</span>
          </p>

          {/* Botón CTA */}
          <button
            onClick={handleCTA}
            className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start"
            style={{
              backgroundColor: '#E63000',
              color: '#FFFFFF',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              padding: '0.5rem 1.25rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s, transform 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cc2a00'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#E63000'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Cotizar ahora
            <svg viewBox="0 0 16 16" fill="none" style={{ width: '13px', height: '13px' }}>
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
