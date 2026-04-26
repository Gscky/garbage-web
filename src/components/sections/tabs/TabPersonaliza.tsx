'use client'

import { useState } from 'react'
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

          {/* Vista previa — rectángulo CSS puro */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '4/3',
              borderRadius: '10px',
              background: matColor,
              transition: 'background 0.5s ease',
              transform: 'perspective(700px) rotateX(18deg) rotateY(-4deg)',
              boxShadow: '0 40px 80px rgba(10,22,40,0.15), 0 0 0 1px rgba(10,22,40,0.04)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {/* Textura dots */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1.2px, transparent 1.2px)',
                backgroundSize: '8px 8px',
              }} />
              {/* Zona logo */}
              <div style={{
                border: '2px dashed rgba(255,255,255,0.45)',
                borderRadius: '6px',
                padding: '0.8rem 2rem',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.2em',
                }}>
                  LOGO
                </div>
                <div style={{
                  fontSize: '0.62rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '0.2rem',
                  fontFamily: 'var(--font-dm-sans)',
                }}>
                  Tu diseño aquí
                </div>
              </div>
              {/* Sombra inferior */}
              <div style={{
                position: 'absolute',
                bottom: '-16px',
                left: '15%',
                width: '70%',
                height: '16px',
                background: matColor,
                filter: 'blur(16px)',
                opacity: 0.5,
                borderRadius: '50%',
              }} />
            </div>

            {/* Badge color activo */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              {selectedColor ? (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid rgba(10,22,40,0.12)',
                  boxShadow: '0 2px 8px rgba(10,22,40,0.06)',
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: selectedColor.hex,
                    flexShrink: 0,
                    border: '1px solid rgba(10,22,40,0.1)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8rem',
                    color: '#0A1628',
                    fontWeight: 500,
                  }}>
                    {selectedColor.nombre}
                  </span>
                </div>
              ) : (
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.8rem',
                  color: 'rgba(10,22,40,0.35)',
                }}>
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
