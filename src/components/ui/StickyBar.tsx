'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }

    const contactoEl = document.getElementById('contacto')
    let observer: IntersectionObserver | null = null

    if (contactoEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(false)
        },
        { threshold: 0.1 }
      )
      observer.observe(contactoEl)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer?.disconnect()
    }
  }, [])

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-[60] hidden md:flex items-center justify-between px-6 py-3"
          style={{
            backgroundColor: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}>
            Limpiapiés personalizados con tu logo —{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>respuesta en menos de 24h</span>
          </p>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: '#000000', borderRadius: '2px', padding: '0.5rem 1.2rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)' }}
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
