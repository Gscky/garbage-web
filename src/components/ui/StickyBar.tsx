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
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3"
          style={{
            backgroundColor: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          <p className="hidden md:block text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-dm-sans)' }}>
            Limpiapiés personalizados con tu logo —{' '}
            <span style={{ color: '#E63000', fontWeight: 600 }}>respuesta en menos de 24h</span>
          </p>

          <button
            onClick={handleCTA}
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:scale-105 w-full md:w-auto justify-center md:justify-start"
            style={{ backgroundColor: '#FFFFFF', color: '#0A1628', borderRadius: '2px', padding: '0.5rem 1.2rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F0EEE9' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF' }}
          >
            Cotizar ahora
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
