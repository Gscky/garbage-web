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

  // Cierre con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Bloquea scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Foco al primer link cuando abre
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector<HTMLButtonElement>('button[data-nav]')
      firstLink?.focus()
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
          className="fixed inset-0 z-[100] bg-white flex flex-col"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header del menú */}
          <div className="flex items-center justify-between px-5 h-[72px] border-b border-[#E5E5E5] flex-shrink-0">
            <span className="text-xl font-black tracking-[-0.04em] text-[#1A1A1A]">
              {copy.nav.logo}
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 rounded-md text-[#1A1A1A] hover:bg-[rgba(26,26,26,0.04)] transition-colors duration-200"
              aria-label="Cerrar menú"
            >
              {/* X icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Links de navegación */}
          <nav
            role="navigation"
            aria-label="Navegación mobile"
            className="flex flex-col px-5 pt-6 pb-8 gap-1 flex-1 overflow-y-auto"
          >
            {copy.nav.links.map((link, index) => (
              <motion.button
                key={link.href}
                data-nav
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center text-left w-full min-h-[56px] px-4 py-3 rounded-lg text-[1.125rem] font-semibold text-[#1A1A1A] hover:bg-[#F5F5F5] hover:text-[#E63000] transition-colors duration-150 cursor-pointer border-none bg-transparent"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.08 + index * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* CTA al fondo */}
          <div className="px-5 pb-10 flex-shrink-0">
            <motion.a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick('#contacto')
              }}
              className="flex items-center justify-center w-full min-h-[56px] px-6 py-4 rounded-md bg-[#E63000] text-white text-base font-semibold tracking-[0.02em] shadow-[0_8px_24px_rgba(230,48,0,0.22)] hover:bg-[#C42800] active:bg-[#A82200] transition-colors duration-200"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {copy.nav.cta}
            </motion.a>
          </div>

          {/* Overlay clickeable detrás (por si el menú no cubre toda la pantalla en algún edge case) */}
          <div
            className="absolute inset-0 -z-10"
            onClick={onClose}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
