'use client'

import Image from 'next/image'
import { useTab, TABS } from '@/context/TabContext'
import { CONTACTO } from '@/lib/contact'

export default function Footer() {
  const { setActiveTab } = useTab()

  return (
    <footer style={{ backgroundColor: '#0A1628' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4rem) clamp(1.25rem, 4vw, 3rem) 2rem',
        }}
      >
        {/* Grid 3 columnas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Col 1 — Logo + descripción */}
          <div>
            <Image
              src="/images/logo.jpeg"
              alt="Garbage"
              width={120}
              height={34}
              style={{ height: '34px', width: 'auto', marginBottom: '1rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: '240px',
            }}>
              Fabricamos limpiapiés y alfombras personalizadas con tu logo. 30 años de experiencia. Despacho a todo Chile.
            </p>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '1rem',
            }}>
              Navegación
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.55)',
                      padding: 0,
                      transition: 'color 0.15s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '1rem',
            }}>
              Contacto
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '2px', fontFamily: 'var(--font-dm-sans)' }}>Teléfono</span>
                {CONTACTO.telefonos.map((t) => (
                  <a key={t} href={`tel:${t.replace(/\s/g, '')}`}
                    style={{ display: 'block', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#FFFFFF' }}
                    onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
                  >{t}</a>
                ))}
              </li>
              <li>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '2px', fontFamily: 'var(--font-dm-sans)' }}>Email</span>
                <a href={`mailto:${CONTACTO.email}`}
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
                >{CONTACTO.email}</a>
              </li>
              <li>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '2px', fontFamily: 'var(--font-dm-sans)' }}>Dirección</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)' }}>{CONTACTO.direccion}</span>
              </li>
              <li>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '2px', fontFamily: 'var(--font-dm-sans)' }}>Horario</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)' }}>{CONTACTO.horario}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: '1.25rem' }} />

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
        }}>
          © {new Date().getFullYear()} Garbage Chile. Fabricación 100% chilena.
        </p>
      </div>
    </footer>
  )
}
