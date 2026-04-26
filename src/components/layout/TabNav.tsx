'use client'

import { useRef, useEffect } from 'react'
import { useTab, TABS } from '@/context/TabContext'

export default function TabNav() {
  const { activeTab, setActiveTab } = useTab()
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll al tab activo en mobile cuando cambia
  useEffect(() => {
    const btn = buttonRefs.current.get(activeTab)
    if (btn && containerRef.current) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeTab])

  return (
    <nav
      aria-label="Navegación por secciones"
      style={{
        position: 'sticky',
        top: 'var(--navbar-height)',
        zIndex: 40,
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(5,10,20,0.75)',
        pointerEvents: 'none',
      }} />
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          overflowX: 'auto',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
        className="scrollbar-none"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const isCotizar = tab.id === 'cotizar'
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) buttonRefs.current.set(tab.id, el)
                else buttonRefs.current.delete(tab.id)
              }}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                flexShrink: 0,
                padding: isCotizar ? '0.6rem 1.25rem' : '1rem 1.5rem',
                margin: isCotizar ? '0.5rem 0.5rem 0.5rem 1rem' : undefined,
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: isCotizar ? 600 : 500,
                fontSize: '0.78rem',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap' as const,
                color: isCotizar ? (isActive ? '#0A1628' : '#0A1628') : (isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)'),
                background: isCotizar ? '#C8A96E' : 'none',
                cursor: 'pointer',
                borderRadius: isCotizar ? '4px' : undefined,
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: isCotizar ? 'none' : (isActive ? '2px solid #FFFFFF' : '2px solid transparent'),
                transition: 'color 0.2s ease, border-bottom-color 0.2s ease, background-color 0.2s ease',
                opacity: isCotizar && isActive ? 0.85 : 1,
              }}
              onMouseEnter={(e) => {
                if (isCotizar) { e.currentTarget.style.backgroundColor = '#E2C98A' }
                else if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
              }}
              onMouseLeave={(e) => {
                if (isCotizar) { e.currentTarget.style.backgroundColor = '#C8A96E' }
                else if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
