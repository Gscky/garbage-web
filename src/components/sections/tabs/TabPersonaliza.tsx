'use client'

import { useState, useRef } from 'react'
import { TabCTA } from '@/components/ui/tab-cta'
import { useColor, COLORES_GARBAGE } from '@/context/ColorContext'
import { useTab } from '@/context/TabContext'
import { SectionBanner } from '@/components/ui/section-banner'

export default function TabPersonaliza() {
  const { selectedColor, setSelectedColor } = useColor()
  const { setActiveTab, setPrefill } = useTab()
  const matColor = selectedColor?.hex ?? '#2E7D4F'

  const [nombre, setNombre] = useState('')
  const [email, setEmail]   = useState('')
  const [mensaje, setMensaje] = useState('')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleLogoFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setLogoUrl(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#FFFFFF',
    color: '#0A1628',
    border: '1.5px solid rgba(10,22,40,0.15)',
    borderRadius: '4px',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: '0.9rem',
    outline: 'none',
  }

  return (
    <div className="tab-content-enter">
      <SectionBanner eyebrow="Configurador" titulo="Diseña tu limpiapiés" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)', minHeight: '40vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Bloque 1: Vista previa + selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
          alignItems: 'start',
        }}>

          {/* Vista previa con textura real */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Input oculto */}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              style={{ display: 'none' }}
              onChange={(e) => { if (e.target.files?.[0]) handleLogoFile(e.target.files[0]) }}
            />

            {/* Alfombra con foto real + colorización */}
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
                maxWidth: '420px',
                aspectRatio: '4/3',
                borderRadius: '10px',
                transform: 'perspective(900px) rotateX(10deg) rotateY(-1deg)',
                boxShadow: '0 28px 60px rgba(10,22,40,0.18), 0 0 0 1px rgba(10,22,40,0.06)',
                position: 'relative',
                overflow: 'hidden',
                cursor: logoUrl ? 'default' : 'pointer',
              }}
            >
              {/* Foto real de alfombra — muy iluminada para borrar texto/watermark */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/alfombra-con-logo.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(1) brightness(2.2) contrast(0.45)',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />

              {/* Capa de color — multiply sobre la textura */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: matColor,
                mixBlendMode: 'multiply',
                transition: 'background-color 0.4s ease',
              }} />

              {/* Overlay drag */}
              {isDragging && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 10,
                  background: 'rgba(255,255,255,0.2)',
                  border: '3px dashed rgba(255,255,255,0.9)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                    Soltar logo aquí
                  </span>
                </div>
              )}

              {/* Logo o placeholder */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt="Vista previa del logo"
                    style={{
                      maxWidth: '50%',
                      maxHeight: '50%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))',
                      pointerEvents: 'none',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    border: '2px dashed rgba(255,255,255,0.6)',
                    borderRadius: '8px',
                    padding: '0.9rem 2rem',
                    textAlign: 'center',
                    backdropFilter: 'blur(2px)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                      + Subir tu logo
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-dm-sans)', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                      PNG con fondo transparente · Arrastra o click
                    </div>
                  </div>
                )}
              </div>

              {/* Sombra inferior */}
              <div style={{
                position: 'absolute',
                bottom: '-12px', left: '20%', width: '60%', height: '12px',
                background: matColor, filter: 'blur(12px)', opacity: 0.4, borderRadius: '50%',
              }} />
            </div>

            {/* Controles debajo de la alfombra */}
            <div style={{ marginTop: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              {logoUrl ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    style={{
                      fontFamily: 'var(--font-dm-sans)', fontSize: '0.78rem', fontWeight: 500,
                      color: '#0A1628', background: '#fff', border: '1px solid rgba(10,22,40,0.2)',
                      borderRadius: '4px', padding: '0.4rem 0.9rem', cursor: 'pointer',
                    }}
                  >
                    Cambiar logo
                  </button>
                  <button
                    onClick={() => { setLogoUrl(null) }}
                    style={{
                      fontFamily: 'var(--font-dm-sans)', fontSize: '0.78rem', fontWeight: 500,
                      color: '#E63000', background: '#fff', border: '1px solid rgba(230,48,0,0.2)',
                      borderRadius: '4px', padding: '0.4rem 0.9rem', cursor: 'pointer',
                    }}
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => logoInputRef.current?.click()}
                  style={{
                    fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', fontWeight: 600,
                    color: '#0A1628', background: '#fff', border: '1px solid rgba(10,22,40,0.2)',
                    borderRadius: '4px', padding: '0.5rem 1.2rem', cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(10,22,40,0.06)',
                  }}
                >
                  Subir tu logo →
                </button>
              )}

              {/* Badge color activo */}
              {selectedColor ? (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.45rem 0.9rem', backgroundColor: '#FFFFFF',
                  borderRadius: '6px', border: '1px solid rgba(10,22,40,0.12)',
                  boxShadow: '0 2px 8px rgba(10,22,40,0.06)',
                }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '3px',
                    backgroundColor: selectedColor.hex, flexShrink: 0,
                    border: '1px solid rgba(10,22,40,0.1)',
                  }} />
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#0A1628', fontWeight: 500 }}>
                    {selectedColor.nombre}
                  </span>
                </div>
              ) : (
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: 'rgba(10,22,40,0.35)' }}>
                  Selecciona un color →
                </p>
              )}
            </div>
          </div>

          {/* Selector de colores */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: '#0A1628',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              22 colores disponibles
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              {COLORES_GARBAGE.map((color) => {
                const isActive = selectedColor?.nombre === color.nombre
                return (
                  <button
                    key={color.nombre}
                    onClick={() => setSelectedColor(color)}
                    title={color.nombre}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: 'none',
                      outline: isActive ? '2px solid #0A1628' : '2px solid transparent',
                      outlineOffset: '3px',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, outline-color 0.15s ease',
                      boxShadow: '0 2px 6px rgba(10,22,40,0.15)',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.12)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                      }}>
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.85rem',
              color: selectedColor ? '#0A1628' : 'rgba(10,22,40,0.35)',
              fontWeight: selectedColor ? 500 : 300,
              minHeight: '1.2em',
              marginBottom: '0.5rem',
            }}>
              {selectedColor ? selectedColor.nombre : 'Ninguno seleccionado'}
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.72rem',
              color: 'rgba(10,22,40,0.4)',
              lineHeight: 1.5,
            }}>
              Colores únicos de fábrica, sin variedad Pantone
            </p>
          </div>
        </div>

        {/* Bloque 2: Mini formulario */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(10,22,40,0.08)',
          borderRadius: '8px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          maxWidth: '640px',
          boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            fontSize: '1.3rem',
            color: '#0A1628',
            marginBottom: '0.5rem',
          }}>
            ¿Te convenciste? Cotízalo ahora
          </h3>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.85rem',
            color: 'rgba(10,22,40,0.55)',
            marginBottom: '1.5rem',
          }}>
            Te respondemos en menos de 24 horas.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            {/* Color pre-llenado */}
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#F8F7F4',
              border: selectedColor ? '1.5px solid rgba(10,22,40,0.3)' : '1.5px solid rgba(10,22,40,0.1)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              {selectedColor ? (
                <>
                  <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: selectedColor.hex, flexShrink: 0, border: '1px solid rgba(10,22,40,0.1)' }} />
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', color: '#0A1628' }}>
                    {selectedColor.nombre}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#0A1628', fontWeight: 600 }}>✓</span>
                </>
              ) : (
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: 'rgba(10,22,40,0.35)' }}>
                  Color no seleccionado — elige uno arriba ↑
                </span>
              )}
            </div>

            <textarea
              placeholder="¿Cuántas unidades? ¿Medidas? Cualquier detalle..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/56996998344?text=${encodeURIComponent(`Hola, quiero cotizar un limpiapiés${selectedColor ? ` color ${selectedColor.nombre}` : ''}. Nombre: ${nombre}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}
              >
                WhatsApp
              </a>
              <button
                onClick={() => {
                  setPrefill({ nombre, email })
                  setActiveTab('cotizar')
                }}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#0A1628',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a2d4a' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0A1628' }}
              >
                Formulario completo →
              </button>
            </div>
          </div>
        </div>

      </div>
      </div>

      <TabCTA titulo="¿Te gustó el color? Cotízalo ahora" />
    </div>
  )
}
