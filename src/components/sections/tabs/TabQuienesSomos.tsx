'use client'

import { useRef, useEffect, useState } from 'react'
import { TabCTA } from '@/components/ui/tab-cta'
import { SectionBanner } from '@/components/ui/section-banner'
import Proceso from '@/components/sections/Proceso'
import Garantia from '@/components/sections/Garantia'

function useAnimatedCounter(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0)
  const rafRef   = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    startRef.current = null

    function tick(ts: number) {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setCount(target)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active, target, duration])

  return count
}

const VALORES = [
  { titulo: 'Fabricación 100% propia', descripcion: 'Producimos en nuestra planta en Santiago. Sin intermediarios, control total sobre calidad y plazos.' },
  { titulo: 'Logo proporcional garantizado', descripcion: 'Cada diseño se trabaja al milímetro. Tu logo queda centrado, a escala y con los colores correctos.' },
  { titulo: 'Asesoría sin costo', descripcion: 'Te recomendamos el material y tamaño ideal para tu espacio antes de comprometerte con ningún pedido.' },
]

const STATS = [
  { target: 30,  suffix: '+', label: 'años fabricando' },
  { target: 500, suffix: '+', label: 'empresas atendidas' },
  { target: 22,  suffix: '',  label: 'colores disponibles' },
  { target: 15,  suffix: '',  label: 'regiones con cobertura' },
]

function StatCounter({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useAnimatedCounter(stat.target, active)
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily: 'var(--font-playfair)',
        fontWeight: 700,
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: '#0A1628',
        lineHeight: 1,
        marginBottom: '0.25rem',
      }}>
        {count}{stat.suffix}
      </p>
      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 400,
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'rgba(10,22,40,0.5)',
      }}>
        {stat.label}
      </p>
    </div>
  )
}

export default function TabQuienesSomos() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="tab-content-enter">
      <SectionBanner eyebrow="Nuestra historia" titulo="30 años fabricando para Chile" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)', minHeight: '40vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Grid 2 col */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
          alignItems: 'start',
        }}>

          {/* Historia + valores */}
          <div>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(10,22,40,0.6)',
              lineHeight: 1.75,
              marginBottom: '2rem',
            }}>
              Desde 1994 fabricamos limpiapiés y alfombras personalizadas para las empresas más exigentes de Chile.
              Partimos como un taller familiar en Santiago y hoy somos el proveedor de confianza de{' '}
              <strong style={{ color: '#0A1628', fontWeight: 500 }}>
                Líder, Unimarc, Paris, BancoEstado y municipalidades
              </strong>{' '}
              de todo el país.
            </p>

            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(10,22,40,0.6)',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
            }}>
              No somos un proveedor más. Somos la empresa que elige el retail chileno cuando la imagen importa.
              Producimos 100% en nuestra planta de Santiago, sin intermediarios, con control total sobre cada detalle.
            </p>

            {/* 3 valores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {VALORES.map((v) => (
                <div
                  key={v.titulo}
                  style={{
                    borderLeft: '3px solid #0A1628',
                    paddingLeft: '1.25rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                  }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#0A1628',
                    marginBottom: '0.25rem',
                  }}>
                    {v.titulo}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 300,
                    fontSize: '0.875rem',
                    color: 'rgba(10,22,40,0.55)',
                    lineHeight: 1.65,
                  }}>
                    {v.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder imagen */}
          <div style={{
            height: '360px',
            backgroundColor: '#F0EEE9',
            border: '1px dashed rgba(10,22,40,0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '0.72rem',
              color: 'rgba(10,22,40,0.3)',
              fontFamily: 'var(--font-dm-sans)',
              textAlign: 'center',
              padding: '0 2rem',
            }}>
              [ Foto fábrica / equipo ]
            </span>
          </div>
        </div>

        {/* Stats con contador */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem',
            padding: '2.5rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(10,22,40,0.08)',
            borderRadius: '8px',
            boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
          }}
        >
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} active={statsVisible} />
          ))}
        </div>

      </div>
      </div>

      <Proceso />

      <Garantia />

      <TabCTA titulo="30 años a tu servicio" />
    </div>
  )
}
