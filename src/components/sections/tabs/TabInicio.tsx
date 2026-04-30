'use client'

import { useEffect, useRef, useState } from 'react'
import Hero from '@/components/sections/Hero'
import { ImageAutoSlider } from '@/components/ui/image-auto-slider'
import { useTab } from '@/context/TabContext'
import { TabCTA } from '@/components/ui/tab-cta'

// ── Carrusel — 15 imágenes seleccionadas ──────────────────────────────────────
const CARRUSEL_IMAGES = [
  '/images/gallery/IMG_5051.JPG',
  '/images/gallery/IMG_5047.JPG',
  '/images/gallery/IMG_5054.JPG',
  '/images/gallery/p_1157.jpg',
  '/images/gallery/p_1141.jpg',
  '/images/gallery/p_1154.jpg',
  '/images/gallery/p_1155.jpg',
  '/images/gallery/x_1.jpg',
  '/images/gallery/x_5.jpg',
  '/images/gallery/x_10.jpg',
  '/images/gallery/r_1.jpg',
  '/images/gallery/r_3.jpg',
  '/images/gallery/r_5.jpg',
  '/images/gallery/IMG_5027.JPG',
  '/images/gallery/IMG_5034.JPG',
]

const CARRUSEL_ALTS = [
  'Limpiapiés con logo personalizado para supermercado en Santiago Chile',
  'Alfombra corporativa con logo troquelado para entrada de local comercial',
  'Limpiapiés PVC rizado con logo empresa retail Chile',
  'Alfombra publicitaria personalizada con logotipo para banco',
  'Limpiapiés tipo nomad con isotipo empresa para acceso de oficinas',
  'Alfombra de alto tráfico con logo para municipalidad Chile',
  'Limpiapiés personalizado con logo para cadena de tiendas retail',
  'Alfombra antideslizante con logo corporativo entrada empresa',
  'Limpiapiés PVC con logo a color para local comercial Santiago',
  'Alfombra entrada personalizada con logo marca reconocida Chile',
  'Limpiapiés con logo y slogan empresa para acceso principal oficina',
  'Alfombra corporativa medida especial con logo troquelado vinilo',
  'Limpiapiés personalizados en lote para cadena de sucursales Chile',
  'Alfombra PVC rizado con logo empresa fabricación propia Santiago',
  'Limpiapiés con logo empresa para zona de alto tráfico retail',
]

// ── Beneficios (solo texto + ícono) ──────────────────────────────────────────
const BENEFICIOS = [
  {
    titulo: 'Atrapa suciedad y gérmenes',
    descripcion: 'Los loops PVC capturan hasta el 90% de la suciedad antes de que entre a tu espacio.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    titulo: 'Barrera activa contra bacterias',
    descripcion: 'El sistema de loops neutraliza bacterias, hongos y gérmenes en cada pisada, sin químicos.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    titulo: 'La diferencia es inmediata',
    descripcion: 'Con limpiapiés, tu piso interior queda limpio desde el primer paso. Sin él, la suciedad entra directo.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    titulo: 'Construcción de alta durabilidad',
    descripcion: 'Loops PVC de alta densidad, base antideslizante y material ultra resistente para alto tráfico.',
    icono: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
type StatDef = { target: number; suffix: string; label: string; display?: string }

const STATS: StatDef[] = [
  { target: 30,  suffix: '+', label: 'Años de experiencia' },
  { target: 500, suffix: '+', label: 'Empresas clientes' },
  { target: 22,  suffix: '',  label: 'Colores disponibles' },
  { target: 0,   suffix: '',  label: 'Despacho a todo Chile', display: 'Todo Chile' },
]

function useCounter(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(target) // valor real para SSR — Google indexa "30+", no "0+"
  useEffect(() => {
    if (!active || target === 0) return
    setValue(0) // reset para iniciar animación desde 0
    let startTs: number | null = null
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return value
}

function StatItem({ stat, active }: { stat: StatDef; active: boolean }) {
  const count = useCounter(stat.target, active)
  const displayText = stat.display ?? `${count}${stat.suffix}`
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#C8A96E',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {displayText}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.55)',
          marginTop: '0.5rem',
        }}
      >
        {stat.label}
      </div>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────────
export default function TabInicio() {
  const { setActiveTab } = useTab()
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStatsActive(true); obs.disconnect() }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="tab-content-enter">

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── 2. Stats ────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        style={{
          backgroundColor: '#0A1628',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} active={statsActive} />
          ))}
        </div>
      </section>

      {/* ── 3. Carrusel ─────────────────────────────────────────────────── */}
      <section
        id="carrusel-trabajos"
        style={{ backgroundColor: '#F0EEE9', padding: '3rem 0 2.5rem' }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 700,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C8A96E',
            marginBottom: '1.5rem',
          }}
        >
          Algunos de nuestros trabajos
        </p>
        <ImageAutoSlider images={CARRUSEL_IMAGES} alts={CARRUSEL_ALTS} height={180} />
      </section>

      {/* ── 4. Por qué funciona ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#F8F7F4',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 700,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C8A96E',
            marginBottom: '0.75rem',
          }}>
            Por qué funciona
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: '#0A1628',
            marginBottom: '2.5rem',
          }}>
            Beneficios de los Limpiapiés de PVC con Logo
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.25rem',
          }}>
            {BENEFICIOS.map((b) => (
              <div
                key={b.titulo}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(10,22,40,0.08)',
                  borderRadius: '10px',
                  padding: '1.75rem 1.5rem',
                  boxShadow: '0 2px 12px rgba(10,22,40,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,22,40,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(10,22,40,0.04)'
                }}
              >
                <div style={{ color: '#C8A96E', marginBottom: '1rem', lineHeight: 0 }}>
                  {b.icono}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#0A1628',
                  marginBottom: '0.5rem',
                }}>
                  {b.titulo}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 300,
                  fontSize: '0.85rem',
                  color: 'rgba(10,22,40,0.5)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {b.descripcion}
                </p>
              </div>
            ))}
          </div>

          {/* CTA inline */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => setActiveTab('cotizar')}
              style={{
                backgroundColor: '#0A1628',
                color: '#FFFFFF',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '0.875rem 2.5rem',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a2d4a' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0A1628' }}
            >
              Cotizar limpiapiés personalizado →
            </button>
          </div>
        </div>
      </section>

      <TabCTA titulo="Tu logo en el piso de tu empresa" />

    </div>
  )
}
