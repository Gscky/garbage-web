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
}

const PRODUCTOS: Producto[] = [
  {
    label: 'Producto estrella',
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

const AUTOPLAY_MS = 10000

function ProductCard({ producto }: { producto: Producto }) {
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

  // Auto-rotate
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
      {/* Imagen con zoom in-place */}
      <div
        style={{ position: 'relative', height: '280px', overflow: 'hidden', backgroundColor: '#F0EEE9' }}
        onMouseEnter={() => { if (imgRef.current) imgRef.current.style.transform = 'scale(1.08)' }}
        onMouseLeave={() => { if (imgRef.current) imgRef.current.style.transform = 'scale(1)' }}
      >
        <div
          ref={imgRef}
          style={{
            position: 'absolute', inset: 0,
            transition: 'transform 0.45s ease',
          }}
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

        {/* Badge producto */}
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

        {/* Label imagen activa */}
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

        {/* Flechas + dots */}
        {hasMultiple && (
          <>
            {/* Flecha izquierda */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Imagen anterior"
              style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Flecha derecha */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Siguiente imagen"
              style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dots */}
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

        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
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

        <NeonButton variant="navy" onClick={() => setActiveTab('cotizar')} className="w-full mt-auto">
          Cotizar este producto
        </NeonButton>
      </div>
    </div>
  )
}

export default function TabProductos() {
  return (
    <div className="tab-content-enter">
      <SectionBanner eyebrow="Catálogo" titulo="Soluciones para cada espacio" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1.5rem',
          }}>
            {PRODUCTOS.map((p) => (
              <ProductCard key={p.titulo} producto={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Especificaciones técnicas — contenido semántico para SEO */}
      <section
        aria-label="Especificaciones técnicas limpiapiés personalizados"
        style={{
          backgroundColor: '#0A1628',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontWeight: 700,
            fontSize: '0.72rem', textTransform: 'uppercase',
            letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '0.75rem',
          }}>
            Especificaciones técnicas
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair)', fontWeight: 700,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#FFFFFF',
            marginBottom: '2rem',
          }}>
            Limpiapiés de PVC Tipo Nomad — Ficha técnica
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {[
              { label: 'Material', value: 'PVC rizado de alta densidad' },
              { label: 'Espesor', value: '10–14 mm' },
              { label: 'Tráfico', value: 'Medio y alto tráfico' },
              { label: 'Personalización', value: 'Troquelado y fundido de filamentos de vinilo (no pintado)' },
              { label: 'Colores', value: '22 colores únicos de fábrica' },
              { label: 'Medidas', value: 'A medida — cualquier dimensión' },
              { label: 'Mantenimiento', value: 'Lavable con agua a presión' },
              { label: 'Cobertura', value: 'Despacho a todo Chile' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                padding: '1.25rem 1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)', fontWeight: 700,
                  fontSize: '0.65rem', textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: '#C8A96E', marginBottom: '0.4rem',
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
                  fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.5,
                }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontWeight: 300,
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
            marginTop: '1rem',
          }}>
            Los colores son únicos de fábrica y no tienen variedad de Pantone. Los logos no son pintados: se trabajan por troquelado y fundido de filamentos continuos de vinilo, lo que garantiza mayor durabilidad y definición del diseño.
          </p>
        </div>
      </section>

      <TabCTA titulo="Tu logo en el piso de tu empresa" />
    </div>
  )
}
