'use client'

import { useState, useRef } from 'react'
import { TabCTA } from '@/components/ui/tab-cta'
import { useColor, COLORES_GARBAGE } from '@/context/ColorContext'
import { useTab } from '@/context/TabContext'
import { SectionBanner } from '@/components/ui/section-banner'

// ─── Productos con imagen base ────────────────────────────────────────────────

const PRODUCTOS = [
  {
    id: 'alfombra',
    label: 'Alfombra Publicitaria',
    imagen: '/images/products/alfombra-con-logo.png',
    colorizable: true,
    descripcion: 'PVC rizado con tu logo impreso. Alta durabilidad para zonas de alto tráfico.',
  },
  {
    id: 'nomad',
    label: 'Tipo Nómada',
    imagen: '/images/products/alfombra-con-palabras.png',
    colorizable: true,
    descripcion: 'Diseño modular y portable. Ideal para eventos y espacios temporales.',
  },
  {
    id: 'cristal',
    label: 'Tipo Cristal',
    imagen: '/images/products/cristal.png',
    colorizable: false,
    descripcion: 'Transparente y elegante. Muestra el piso original mientras protege la entrada.',
  },
  {
    id: 'stick',
    label: 'Stick Matt',
    imagen: '/images/products/stick-matt.png',
    colorizable: false,
    descripcion: 'Adhesivo antideslizante ultra-delgado. Sin marco, adherido directo al piso.',
  },
]

// ─── Componente principal ─────────────────────────────────────────────────────

export default function TabPersonaliza() {
  const { selectedColor, setSelectedColor } = useColor()
  const { setActiveTab, setPrefill } = useTab()

  const [productoId, setProductoId] = useState(PRODUCTOS[0].id)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const producto = PRODUCTOS.find((p) => p.id === productoId) ?? PRODUCTOS[0]
  const matColor = selectedColor?.hex ?? '#2E7D4F'

  const handleLogoFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setLogoUrl(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleCotizar = () => {
    setPrefill({ nombre: '', email: '' })
    setActiveTab('cotizar')
  }

  return (
    <div className="tab-content-enter">
      <SectionBanner eyebrow="Configurador" titulo="Diseña tu limpiapiés" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Grid principal */}
          <div
            className="personaliza-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: '3rem',
              alignItems: 'start',
            }}
          >

            {/* ── Columna izquierda: Vista previa ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Input oculto */}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                style={{ display: 'none' }}
                onChange={(e) => { if (e.target.files?.[0]) handleLogoFile(e.target.files[0]) }}
              />

              {/* Etiqueta */}
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(10,22,40,0.4)', margin: 0 }}>
                Vista previa
              </p>

              {/* Alfombra */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  const file = e.dataTransfer.files[0]
                  if (file) handleLogoFile(file)
                }}
                onClick={() => { if (!logoUrl) logoInputRef.current?.click() }}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '12px',
                  transform: 'perspective(900px) rotateX(10deg) rotateY(-1deg)',
                  boxShadow: '0 28px 60px rgba(10,22,40,0.18), 0 0 0 1px rgba(10,22,40,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: logoUrl ? 'default' : 'pointer',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {/* Foto del producto */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={producto.imagen}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: producto.colorizable
                      ? 'grayscale(1) brightness(2.2) contrast(0.45)'
                      : 'brightness(1.05)',
                    display: 'block',
                    pointerEvents: 'none',
                    transition: 'filter 0.4s',
                  }}
                />

                {/* Capa de color — solo productos colorizable */}
                {producto.colorizable && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: matColor,
                    mixBlendMode: 'multiply',
                    transition: 'background-color 0.4s ease',
                  }} />
                )}

                {/* Overlay drag */}
                {isDragging && (
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 10,
                    background: 'rgba(255,255,255,0.15)',
                    border: '3px dashed rgba(255,255,255,0.9)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                      Soltar logo aquí
                    </span>
                  </div>
                )}

                {/* Logo o placeholder */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoUrl}
                      alt="Vista previa del logo"
                      style={{
                        maxWidth: '50%', maxHeight: '50%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))',
                        pointerEvents: 'none',
                      }}
                    />
                  ) : (
                    <div style={{
                      border: '2px dashed rgba(255,255,255,0.55)',
                      borderRadius: '8px',
                      padding: '0.75rem 1.5rem',
                      textAlign: 'center',
                      backdropFilter: 'blur(2px)',
                    }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem', fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                        + Subir tu logo
                      </div>
                      <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-dm-sans)', marginTop: '2px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        PNG transparente · arrastrá o click
                      </div>
                    </div>
                  )}
                </div>

                {/* Sombra inferior */}
                <div style={{
                  position: 'absolute', bottom: '-12px', left: '20%', width: '60%', height: '12px',
                  background: producto.colorizable ? matColor : '#888',
                  filter: 'blur(12px)', opacity: 0.35, borderRadius: '50%',
                }} />
              </div>

              {/* Controles logo */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {logoUrl ? (
                  <>
                    <button onClick={() => logoInputRef.current?.click()} style={btnSecondaryStyle}>
                      Cambiar logo
                    </button>
                    <button onClick={() => setLogoUrl(null)} style={{ ...btnSecondaryStyle, color: '#E63000', borderColor: 'rgba(230,48,0,0.2)' }}>
                      Quitar
                    </button>
                  </>
                ) : (
                  <button onClick={() => logoInputRef.current?.click()} style={btnSecondaryStyle}>
                    Subir logo →
                  </button>
                )}
              </div>

              {/* Nota */}
              <p style={{ textAlign: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: '0.68rem', color: 'rgba(10,22,40,0.35)', margin: 0 }}>
                Vista previa aproximada · El diseño final se confirma antes de producción
              </p>
            </div>

            {/* ── Columna derecha: Controles ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Paso 1: Producto */}
              <div>
                <p style={stepLabelStyle}>1 · Tipo de limpiapiés</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {PRODUCTOS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setProductoId(p.id)
                        if (!p.colorizable) setSelectedColor(null)
                      }}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        border: productoId === p.id ? '1.5px solid #0A1628' : '1.5px solid rgba(10,22,40,0.12)',
                        backgroundColor: productoId === p.id ? '#0A1628' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                        border: productoId === p.id ? '4px solid #FFFFFF' : '1.5px solid rgba(10,22,40,0.3)',
                        backgroundColor: productoId === p.id ? '#FFFFFF' : 'transparent',
                        transition: 'all 0.15s',
                      }} />
                      <div>
                        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', fontWeight: 600, color: productoId === p.id ? '#FFFFFF' : '#0A1628', margin: 0 }}>
                          {p.label}
                        </p>
                        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', color: productoId === p.id ? 'rgba(255,255,255,0.65)' : 'rgba(10,22,40,0.45)', margin: '2px 0 0' }}>
                          {p.descripcion}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2: Color (solo si el producto lo permite) */}
              {producto.colorizable && (
                <div>
                  <p style={stepLabelStyle}>2 · Color del limpiapiés</p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: '0.6rem',
                    marginBottom: '0.75rem',
                  }}>
                    {COLORES_GARBAGE.map((color) => {
                      const isActive = selectedColor?.nombre === color.nombre
                      return (
                        <button
                          key={color.nombre}
                          onClick={() => setSelectedColor(color)}
                          title={color.nombre}
                          style={{
                            width: '38px', height: '38px',
                            borderRadius: '50%',
                            backgroundColor: color.hex,
                            border: 'none',
                            outline: isActive ? '2.5px solid #0A1628' : '2px solid transparent',
                            outlineOffset: '3px',
                            cursor: 'pointer',
                            transition: 'transform 0.15s, outline-color 0.15s',
                            boxShadow: '0 2px 6px rgba(10,22,40,0.15)',
                            position: 'relative',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                        >
                          {isActive && (
                            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                              ✓
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.78rem', color: selectedColor ? '#0A1628' : 'rgba(10,22,40,0.35)', fontWeight: selectedColor ? 500 : 400, margin: 0 }}>
                    {selectedColor ? selectedColor.nombre : 'Ninguno seleccionado'}
                    {selectedColor && <span style={{ color: 'rgba(10,22,40,0.4)', fontWeight: 400 }}> · colores únicos de fábrica</span>}
                  </p>
                </div>
              )}

              {/* Resumen del diseño */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(10,22,40,0.08)',
                borderRadius: '10px',
                padding: '1.25rem',
                boxShadow: '0 2px 12px rgba(10,22,40,0.05)',
              }}>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(10,22,40,0.4)', margin: '0 0 0.75rem' }}>
                  Tu diseño
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <ResumenRow label="Producto" value={producto.label} />
                  {producto.colorizable && (
                    <ResumenRow
                      label="Color"
                      value={selectedColor?.nombre ?? 'Sin seleccionar'}
                      dot={selectedColor?.hex}
                    />
                  )}
                  <ResumenRow label="Logo" value={logoUrl ? 'Cargado ✓' : 'Sin logo (opcional)'} />
                </div>

                <button
                  onClick={handleCotizar}
                  style={{
                    marginTop: '1.25rem',
                    width: '100%',
                    backgroundColor: '#0A1628',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '0.875rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a2d4a' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0A1628' }}
                >
                  Cotizar este diseño →
                </button>

                <a
                  href={`https://wa.me/56996998344?text=${encodeURIComponent(`Hola, quiero cotizar un limpiapiés ${producto.label}${selectedColor ? ` color ${selectedColor.nombre}` : ''}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    marginTop: '0.5rem',
                    width: '100%',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.105 1.513 5.831L.057 23.882l6.219-1.431A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.36-.213-3.69.849.872-3.6-.234-.37A9.818 9.818 0 1112 21.818z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <TabCTA titulo="¿Listo para verlo en tu empresa?" />

      <style>{`
        @media (max-width: 768px) {
          .personaliza-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Estilos reutilizables ────────────────────────────────────────────────────

const stepLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(10,22,40,0.45)',
  marginBottom: '0.75rem',
}

const btnSecondaryStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: '#0A1628',
  background: '#fff',
  border: '1px solid rgba(10,22,40,0.18)',
  borderRadius: '6px',
  padding: '0.4rem 1rem',
  cursor: 'pointer',
}

function ResumenRow({ label, value, dot }: { label: string; value: string; dot?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.78rem', color: 'rgba(10,22,40,0.45)' }}>
        {label}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-dm-sans)', fontSize: '0.78rem', fontWeight: 500, color: '#0A1628' }}>
        {dot && <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: dot, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />}
        {value}
      </span>
    </div>
  )
}
