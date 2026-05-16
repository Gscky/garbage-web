'use client'

import { useState, useEffect } from 'react'
import { useTab, TABS } from '@/context/TabContext'
import { NeonButton } from '@/components/ui/neon-button'

export default function Header() {
  const { activeTab, setActiveTab } = useTab()
  const [menuOpen, setMenuOpen] = useState(false)

  // Cerrar drawer al cambiar a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Bloquear scroll del body cuando drawer abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleTab = (id: string) => {
    setActiveTab(id as typeof activeTab)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(10,22,40,0.08)',
          boxShadow: '0 2px 8px rgba(10,22,40,0.06)',
        }}
      >
        {/* ── Fila 1: Logo + CTA + Hamburger ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleTab('inicio')}
            aria-label="Ir al inicio"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
          >
            <img
              src="/images/logo.jpeg"
              alt="Garbage Limpiapiés Personalizados Chile"
              loading="eager"
              style={{ height: '40px', width: 'auto', display: 'block' }}
            />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Botón CTA — desktop */}
            <NeonButton
              variant="navy"
              onClick={() => handleTab('cotizar')}
              className="hidden md:inline-flex"
            >
              Cotizar ahora
            </NeonButton>

            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                color: '#0A1628',
                alignItems: 'center',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ width: '24px', height: '24px', transition: 'transform 0.2s' }}
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Fila 2: Tabs — desktop only ─────────────────────────────── */}
        <nav
          className="hidden md:block"
          aria-label="Navegación por secciones"
          style={{ borderTop: '1px solid rgba(10,22,40,0.06)' }}
        >
          <div
            style={{
              display: 'flex',
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 clamp(1.25rem, 4vw, 3rem)',
              overflowX: 'auto',
            }}
            className="scrollbar-none"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTab(tab.id)}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 500,
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.9rem 1.2rem',
                    background: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: isActive
                      ? '2px solid #C8A96E'
                      : '2px solid transparent',
                    color: isActive ? '#C8A96E' : 'rgba(10,22,40,0.4)',
                    cursor: 'pointer',
                    transition: 'color 0.15s, border-bottom-color 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#0A1628'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(10,22,40,0.4)'
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </nav>
      </header>

      {/* ── Drawer mobile ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0A1628',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 1.5rem 2rem',
            overflowY: 'auto',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: isActive ? '#C8A96E' : 'rgba(255,255,255,0.5)',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  padding: '1.1rem 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 0.15s',
                }}
              >
                {isActive && (
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C8A96E', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                )}
                {tab.label}
              </button>
            )
          })}

          {/* CTA dentro del drawer */}
          <button
            onClick={() => handleTab('cotizar')}
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#FFFFFF',
              color: '#0A1628',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '0.875rem',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Cotizar ahora
          </button>
        </div>
      )}
    </>
  )
}
