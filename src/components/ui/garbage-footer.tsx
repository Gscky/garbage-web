'use client'

import { useRef, useEffect } from 'react'
import { useTab, TABS } from '@/context/TabContext'

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    text: 'La Raza #1695, Santiago',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    text: '+56 2 2683 6012',
    href: 'tel:+56222836012',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    text: '+56 2 2684 1460',
    href: 'tel:+56226841460',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    text: '+56 9 9699 8344',
    href: 'tel:+56996998344',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    text: 'ventas@garbage.cl',
    href: 'mailto:ventas@garbage.cl',
  },
]

const SOCIAL = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/56996998344',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

const COL_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 500,
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: '#FFFFFF',
  marginBottom: '1.2rem',
}

export function GarbageFooter() {
  const { setActiveTab } = useTab()
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cols = [col1Ref, col2Ref, col3Ref]

    // Inicializar invisible
    cols.forEach(({ current }) => {
      if (!current) return
      current.style.opacity = '0'
      current.style.transform = 'translateY(16px)'
      current.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const idx = cols.findIndex((r) => r.current === el)
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, idx * 100)
          observer.unobserve(el)
        })
      },
      { threshold: 0.1 }
    )

    cols.forEach(({ current }) => { if (current) observer.observe(current) })
    return () => observer.disconnect()
  }, [])

  return (
    <footer style={{ backgroundColor: '#0A1628', padding: '2.5rem 5vw 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── 3 columnas ─────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '0',
        }}>

          {/* Col 1 — Marca */}
          <div ref={col1Ref}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              padding: '5px 10px',
              marginBottom: '1rem',
            }}>
              <img
                src="/images/logo.jpeg"
                alt="Garbage"
                loading="eager"
                style={{
                  height: '30px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: '220px',
              margin: 0,
            }}>
              30 años fabricando limpiapiés personalizados para las empresas de Chile.
            </p>

            {/* Redes sociales */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    transition: 'color 0.2s',
                    lineHeight: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navegación */}
          <div ref={col2Ref}>
            <p style={COL_TITLE_STYLE}>Navegación</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.45)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 — Contacto */}
          <div ref={col3Ref}>
            <p style={COL_TITLE_STYLE}>Contacto</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#FFFFFF', flexShrink: 0, lineHeight: 0 }}>
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontWeight: 400,
                        fontSize: '0.82rem',
                        color: 'rgba(255,255,255,0.45)',
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 400,
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.45)',
                    }}>
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Separador ──────────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          margin: '1.5rem 0 1rem',
        }} />

        {/* ── Sección inferior ───────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          {/* Izquierda */}
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}>
            © {new Date().getFullYear()} Garbage Chile. Todos los derechos reservados.
          </p>

          {/* Centro */}
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}>
            <span style={{ color: '#FFFFFF' }}>·</span> Atendemos a todas las regiones de Chile
          </p>

          {/* Derecha — volver arriba */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '2px',
              padding: '0.4rem 1rem',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFFFFF'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
            }}
          >
            Volver arriba ↑
          </button>
        </div>

      </div>
    </footer>
  )
}
