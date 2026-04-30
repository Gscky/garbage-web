'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useTab } from '@/context/TabContext'
import { TabCTA } from '@/components/ui/tab-cta'
import { NeonButton } from '@/components/ui/neon-button'
import { SectionBanner } from '@/components/ui/section-banner'

type Producto = {
  titulo: string
  subtitulo?: string
  descripcion: string
  detalles: string[]
  imagenes: { src: string; label?: string }[]
  label?: string
  hasFicha?: boolean
}

const PRODUCTOS: Producto[] = [
  {
    label: 'Producto estrella',
    hasFicha: true,
    imagenes: [
      { src: '/images/products/alfombra-con-logo.png',     label: 'Con logo' },
      { src: '/images/products/alfombra-con-palabras.png', label: 'Con slogan' },
    ],
    titulo: 'Limpiapiés Tipo Nomad',
    subtitulo: 'Con logo · Sin logo · Con slogan',
    descripcion: 'Alfombra de filamento continuo de PVC rizado de alta densidad. Disponible personalizada con el logo de tu empresa por troquelado y fundido de filamentos (no pintado), con slogan o en color sólido. Soporta alto tráfico, lavable con agua a presión y disponible en 22 colores únicos de fábrica.',
    detalles: ['PVC rizado alta densidad', 'Logo por troquelado', '22 colores únicos', 'Medidas personalizadas', 'Alto tráfico', 'Entrega a todo Chile'],
  },
  {
    imagenes: [
      { src: '/images/products/cristal.png', label: 'Tipo Cristal' },
    ],
    titulo: 'Tipo Cristal',
    descripcion: 'Vinilo transparente de alta resistencia. Protege pisos delicados mientras mantiene la estética del espacio visible. Ideal para oficinas y locales con pisos de madera o cerámica.',
    detalles: ['Vinilo transparente', 'Alta resistencia', 'Protege pisos delicados', 'Sin alterar la estética'],
  },
  {
    imagenes: [
      { src: '/images/products/stick-matt.png',           label: 'En uso' },
      { src: '/images/products/stick-matt- despegando.png', label: 'Capa desechable' },
    ],
    titulo: 'Stick Matt',
    descripcion: 'Alfombra adhesiva desechable multicapa. Retiene suciedad y polvo en zonas de ingreso a áreas limpias o laboratorios. Cada capa se despega cuando está saturada.',
    detalles: ['Multicapa desechable', 'Retiene polvo y suciedad', 'Zonas limpias / laboratorios', 'Fácil recambio'],
  },
]

const FICHA_NOMAD_SPECS = [
  { label: 'Material',        value: 'PVC rizado de alta densidad' },
  { label: 'Espesor',         value: '10–14 mm' },
  { label: 'Tráfico',         value: 'Medio y alto tráfico' },
  { label: 'Personalización', value: 'Troquelado y fundido de filamentos de vinilo (no pintado)' },
  { label: 'Colores',         value: '22 colores únicos de fábrica' },
  { label: 'Medidas',         value: 'A medida — cualquier dimensión' },
  { label: 'Mantenimiento',   value: 'Lavable con agua a presión' },
  { label: 'Cobertura',       value: 'Despacho a todo Chile' },
]

const FICHA_NOMAD_NOTA = 'Los colores son únicos de fábrica y no tienen variedad de Pantone. Los logos no son pintados: se trabajan por troquelado y fundido de filamentos continuos de vinilo, lo que garantiza mayor durabilidad y definición del diseño.'

const AUTOPLAY_MS = 10000

// ── Drawer de ficha técnica ──────────────────────────────────────────────────
function FichaDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(10,22,40,0.65)',
          backdropFilter: 'blur(3px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel lateral — siempre en el DOM para que Google indexe las specs */}
      <aside
        aria-label="Ficha técnica Limpiapiés Tipo Nomad"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 101,
          width: 'min(520px, 95vw)',
          backgroundColor: '#0A1628',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-dm-sans)', fontWeight: 700,
                fontSize: '0.65rem', textTransform: 'uppercase',
                letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '0.4rem',
              }}>
                Especificaciones técnicas
              </p>
              <h2 style={{
                fontFamily: 'var(--font-playfair)', fontWeight: 700,
                fontSize: '1.3rem', color: '#FFFFFF', margin: 0,
              }}>
                Limpiapiés Tipo Nomad
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar ficha técnica"
              style={{
                flexShrink: 0, marginTop: '0.2rem',
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Tabla de specs */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', overflow: 'hidden',
          }}>
            {FICHA_NOMAD_SPECS.map(({ label, value }, i) => (
              <div
                key={label}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.6fr',
                  gap: '0.5rem', alignItems: 'start',
                  padding: '0.9rem 1.25rem',
                  borderBottom: i < FICHA_NOMAD_SPECS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-dm-sans)', fontWeight: 700,
                  fontSize: '0.65rem', textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: '#C8A96E', margin: 0,
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
                  fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.5, margin: 0,
                }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Nota */}
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontWeight: 300,
            fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.65, margin: 0,
          }}>
            {FICHA_NOMAD_NOTA}
          </p>

        </div>
      </aside>
    </>
  )
}

// ── Card de producto ─────────────────────────────────────────────────────────
function ProductCard({
  producto,
  onFichaClick,
}: {
  producto: Producto
  onFichaClick?: () => void
}) {
  const { setActiveTab } = useTab()
  const [activeImg, setActiveImg] = useState(0)
  const imgRef = useRef<HTMLDivElement>(null)
  const hasMultiple = producto.imagenes.length > 1

  const next = useCallback(() => {
    setActiveImg((i) => (i + 1) % producto.imagenes.length)
  }, [producto.imagenes.length])

  const prev = useCallback(() => {
    setActiveImg((i) => (i - 1 + producto.imagenes.length) % producto.imagenes.length)
  }, [producto.imagenes.length])

  useEffect(() => {
    if (!hasMultiple) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [hasMultiple, next])

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(10,22,40,0.08)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,22,40,0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(10,22,40,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Imagen */}
      <div
        style={{ position: 'relative', height: '280px', overflow: 'hidden', backgroundColor: '#F0EEE9' }}
        onMouseEnter={() => { if (imgRef.current) imgRef.current.style.transform = 'scale(1.08)' }}
        onMouseLeave={() => { if (imgRef.current) imgRef.current.style.transform = 'scale(1)' }}
      >
        <div
          ref={imgRef}
          style={{ position: 'absolute', inset: 0, transition: 'transform 0.45s ease' }}
        >
          <Image
            key={producto.imagenes[activeImg].src}
            src={producto.imagenes[activeImg].src}
            alt={`${producto.titulo} — ${producto.imagenes[activeImg].label ?? ''}`}
            fill
            style={{
              objectFit: producto.imagenes[activeImg].src.endsWith('.png') ? 'contain' : 'cover',
              padding: producto.imagenes[activeImg].src.endsWith('.png') ? '1rem' : '0',
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {producto.label && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            backgroundColor: '#0A1628', color: '#FFFFFF',
            fontFamily: 'var(--font-dm-sans)', fontWeight: 700,
            fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '0.3rem 0.7rem', borderRadius: '100px',
          }}>
            {producto.label}
          </span>
        )}

        {producto.imagenes[activeImg].label && (
          <span style={{
            position: 'absolute', bottom: '44px', left: '12px',
            backgroundColor: 'rgba(10,22,40,0.65)', color: '#FFFFFF',
            fontFamily: 'var(--font-dm-sans)', fontWeight: 500,
            fontSize: '0.7rem', letterSpacing: '0.05em',
            padding: '0.2rem 0.6rem', borderRadius: '100px',
            backdropFilter: 'blur(4px)',
          }}>
            {producto.imagenes[activeImg].label}
          </span>
        )}

        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Imagen anterior"
              style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Siguiente imagen"
              style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div style={{
              position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '6px',
            }}>
              {producto.imagenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Imagen ${i + 1}`}
                  style={{
                    width: i === activeImg ? '20px' : '8px', height: '8px',
                    borderRadius: '100px', border: 'none', cursor: 'pointer', padding: 0,
                    backgroundColor: i === activeImg ? '#C8A96E' : 'rgba(255,255,255,0.6)',
                    transition: 'width 0.25s ease, background-color 0.25s ease',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-playfair)', fontWeight: 700,
          fontSize: '1.15rem', color: '#0A1628', marginBottom: '0.25rem',
        }}>
          {producto.titulo}
        </h3>

        {producto.subtitulo && (
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontWeight: 500,
            fontSize: '0.72rem', color: '#C8A96E',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}>
            {producto.subtitulo}
          </p>
        )}

        <p style={{
          fontFamily: 'var(--font-dm-sans)', fontWeight: 300,
          fontSize: '0.875rem', color: 'rgba(10,22,40,0.55)',
          lineHeight: 1.7, marginBottom: '1.25rem',
        }}>
          {producto.descripcion}
        </p>

        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {producto.detalles.map((d) => (
            <li key={d} style={{
              fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem',
              color: '#0A1628', border: '1px solid rgba(10,22,40,0.2)',
              borderRadius: '100px', padding: '0.2rem 0.7rem', listStyle: 'none',
            }}>
              {d}
            </li>
          ))}
        </ul>

        {/* Botón ficha técnica — solo para Tipo Nomad */}
        {onFichaClick && (
          <button
            onClick={onFichaClick}
            style={{
              alignSelf: 'flex-start',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'var(--font-dm-sans)', fontWeight: 500,
              fontSize: '0.78rem', color: '#C8A96E',
              textDecoration: 'underline', textDecorationStyle: 'dotted',
              textUnderlineOffset: '3px', marginBottom: '1.25rem',
              letterSpacing: '0.01em',
            }}
          >
            Ver ficha técnica completa →
          </button>
        )}

        <NeonButton variant="navy" onClick={() => setActiveTab('cotizar')} className="w-full mt-auto">
          Cotizar este producto
        </NeonButton>
      </div>
    </div>
  )
}

// ── Tab principal ────────────────────────────────────────────────────────────
export default function TabProductos() {
  const [fichaOpen, setFichaOpen] = useState(false)

  return (
    <div className="tab-content-enter">
      {/* Drawer de ficha técnica — siempre en el DOM (SEO) */}
      <FichaDrawer open={fichaOpen} onClose={() => setFichaOpen(false)} />

      <SectionBanner eyebrow="Catálogo" titulo="Soluciones para cada espacio" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1.5rem',
          }}>
            {PRODUCTOS.map((p) => (
              <ProductCard
                key={p.titulo}
                producto={p}
                onFichaClick={p.hasFicha ? () => setFichaOpen(true) : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <TabCTA titulo="Tu logo en el piso de tu empresa" />
    </div>
  )
}
