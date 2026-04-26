'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { copy } from '@/lib/copy'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavClick: (href: string) => void
}

export default function MobileMenu({ isOpen, onClose, onNavClick }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.querySelector<HTMLButtonElement>('button[data-nav]')?.focus()
    }
  }, [isOpen])

  const handleLinkClick = (href: string) => {
    onNavClick(href)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: '#0A0A0A' }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 flex-shrink-0"
            style={{
              height: '72px',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <img
              src="/images/logo.jpeg"
              alt="Garbage"
              loading="eager"
              style={{ height: '32px', width: 'auto', filter: 'brightness(0.9)' }}
            />
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              aria-label="Cerrar menú"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav
            role="navigation"
            aria-label="Navegación mobile"
            className="flex flex-col px-4 pt-4 pb-6 gap-1 flex-1 overflow-y-auto"
          >
            {copy.nav.links.map((link, index) => (
              <motion.button
                key={link.href}
                data-nav
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center text-left w-full min-h-[52px] px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150 cursor-pointer border-none bg-transparent"
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-dm-sans)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.06 + index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-4 pb-10 flex-shrink-0">
            <motion.a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); handleLinkClick('#contacto') }}
              className="flex items-center justify-center w-full min-h-[52px] text-[#000000] text-base font-semibold tracking-wide transition-colors duration-200"
              style={{
                backgroundColor: 'var(--accent)',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {copy.nav.cta}
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
