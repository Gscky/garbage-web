'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { copy } from '@/lib/copy'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Cierra el menú mobile si se agranda la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-[12px] shadow-[0_1px_3px_rgba(26,26,26,0.08),0_1px_2px_rgba(26,26,26,0.06)] border-b border-[#E5E5E5]'
            : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-5 md:px-8 lg:px-10">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex-shrink-0 text-xl font-black tracking-[-0.04em] text-[#1A1A1A] hover:text-[#E63000] transition-colors duration-200"
            aria-label="Garbage — volver al inicio"
          >
            {copy.nav.logo}
          </a>

          {/* Nav links — desktop */}
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-8"
          >
            {copy.nav.links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburguesa */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop */}
            <motion.a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contacto') }}
              className="hidden md:inline-flex items-center px-6 py-[10px] rounded-md bg-[#E63000] text-white text-sm font-semibold tracking-[0.02em] transition-colors duration-200 hover:bg-[#C42800] active:bg-[#A82200] shadow-[0_8px_24px_rgba(230,48,0,0.22)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              {copy.nav.cta}
            </motion.a>

            {/* Hamburguesa — mobile */}
            <button
              className="flex md:hidden items-center justify-center w-11 h-11 rounded-md text-[#1A1A1A] hover:bg-[rgba(26,26,26,0.04)] transition-colors duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{menuOpen ? 'Cerrar' : 'Abrir'} menú</span>
              <motion.div
                className="w-5 flex flex-col gap-[5px] items-center"
                animate={menuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className="block h-[2px] w-5 bg-[#1A1A1A] origin-center rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 7 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[2px] w-5 bg-[#1A1A1A] rounded-full"
                  variants={{
                    closed: { opacity: 1, scaleX: 1 },
                    open: { opacity: 0, scaleX: 0 },
                  }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block h-[2px] w-5 bg-[#1A1A1A] origin-center rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -7 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  )
}
