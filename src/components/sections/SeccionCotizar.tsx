'use client'

import { useRef, useEffect, useState } from 'react'
import { useColor } from '@/context/ColorContext'

const PASOS = [
  {
    numero: '01',
    titulo: 'Tu logo',
    descripcion:
      'Envíanos tu logo en PNG, PDF o AI con fondo transparente. Si no tienes el archivo, podemos trabajar con una foto clara.',
  },
  {
    numero: '02',
    titulo: 'Medidas',
    descripcion:
      'Indicanos el ancho y largo en centímetros. Si no estás seguro, te asesoramos según el tamaño de tu entrada.',
  },
  {
    numero: '03',
    titulo: 'Color',
    descripcion:
      'Elegí uno de nuestros 22 colores arriba. Al seleccionarlo el formulario se completa automáticamente.',
  },
  {
    numero: '04',
    titulo: 'Cantidad y comentarios',
    descripcion:
      '¿Cuántas unidades? ¿Borde de color, señalética, uso en zona húmeda? Cualquier detalle ayuda.',
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function MatSVG({ matColor }: { matColor: string }) {
  return (
    <svg
      viewBox="0 0 420 320"
      width="100%"
      style={{
        filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))',
        transform: 'perspective(900px) rotateX(6deg)',
        transition: 'transform 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(900px) rotateX(6deg)'
      }}
      aria-label="Vista previa del limpiapiés personalizado"
      role="img"
    >
      <defs>
        <pattern id="cotizar-loops" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.07)" />
          <circle cx="6" cy="6" r="1.2" fill="rgba(255,255,255,0.07)" />
        </pattern>
        <linearGradient id="cotizar-matShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
        <filter id="cotizar-blur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Sombra del mat */}
      <ellipse
        cx="210" cy="295"
        rx="130" ry="12"
        fill="rgba(0,0,0,0.4)"
        filter="url(#cotizar-blur)"
      />

      {/* Cuerpo principal */}
      <rect
        x="70" y="20" width="280" height="220"
        rx="8" ry="8"
        fill={matColor}
        style={{ transition: 'fill 0.4s ease' }}
      />

      {/* Textura loops PVC */}
      <rect
        x="70" y="20" width="280" height="220"
        rx="8" ry="8"
        fill="url(#cotizar-loops)"
      />

      {/* Overlay gradiente volumen */}
      <rect
        x="70" y="20" width="280" height="220"
        rx="8" ry="8"
        fill="url(#cotizar-matShade)"
        opacity="0.6"
      />

      {/* Zona logo punteada */}
      <rect
        x="145" y="85" width="130" height="90"
        rx="4"
        fill="rgba(10,22,40,0.08)"
        stroke="#0A1628"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />

      <text
        x="210" y="128"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontSize="18"
        fontWeight="700"
        fill="#0A1628"
      >
        LOGO
      </text>

      <text
        x="210" y="148"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="9"
        fill="rgba(10,22,40,0.5)"
      >
        Tu diseño aquí
      </text>

      {/* Cota ancho — línea inferior */}
      <line x1="70" y1="258" x2="350" y2="258" stroke="#0A1628" strokeWidth="1" opacity="0.5" />
      <polygon points="70,254 70,262 62,258" fill="#0A1628" opacity="0.5" />
      <polygon points="350,254 350,262 358,258" fill="#0A1628" opacity="0.5" />
      <text
        x="210" y="273"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="10"
        fill="#0A1628"
        opacity="0.7"
      >
        ← ANCHO →
      </text>

      {/* Cota largo — línea derecha */}
      <line x1="368" y1="20" x2="368" y2="240" stroke="#0A1628" strokeWidth="1" opacity="0.5" />
      <polygon points="364,20 372,20 368,12" fill="#0A1628" opacity="0.5" />
      <polygon points="364,240 372,240 368,248" fill="#0A1628" opacity="0.5" />
      <text
        x="388" y="135"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="10"
        fill="#0A1628"
        opacity="0.7"
        transform="rotate(90, 388, 135)"
      >
        LARGO
      </text>
    </svg>
  )
}

export default function SeccionCotizar() {
  const { selectedColor } = useColor()
  const matColor = selectedColor?.hex ?? '#2E7D4F'

  const left = useReveal()
  const right = useReveal()

  return (
    <section
      id="como-cotizar"
      aria-labelledby="cotizar-heading"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              fontFamily: 'var(--font-dm-sans)',
              marginBottom: '1rem',
            }}
          >
            Información que necesitamos
          </span>
          <h2
            id="cotizar-heading"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            Todo lo que necesitamos para cotizarte
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}
          >
            Con estos 4 datos te enviamos precio y plazo en menos de 24 horas.
          </p>
        </div>

        {/* Grid 2 columnas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
        >

          {/* ── Columna izquierda: 4 pasos ── */}
          <div
            ref={left.ref}
            style={{
              opacity: left.visible ? 1 : 0,
              transform: left.visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {/* Lista de pasos */}
            <div
              style={{
                borderLeft: '1px solid var(--border)',
                paddingLeft: '2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
              }}
            >
              {PASOS.map((paso) => (
                <div key={paso.numero} style={{ position: 'relative' }}>
                  {/* Punto decorativo en la línea */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 'calc(-2rem - 4px)',
                      top: '0.35rem',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Número */}
                  <div
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 900,
                      fontSize: '1.8rem',
                      color: 'var(--accent)',
                      lineHeight: 1,
                      marginBottom: '0.3rem',
                    }}
                    aria-hidden="true"
                  >
                    {paso.numero}
                  </div>

                  {/* Título */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 500,
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {paso.titulo}
                  </h3>

                  {/* Descripción */}
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 300,
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                    }}
                  >
                    {paso.descripcion}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'inline-block',
                marginTop: '2rem',
                backgroundColor: 'var(--accent)',
                color: '#000000',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.8rem 1.8rem',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)'
              }}
            >
              Ir al formulario →
            </a>
          </div>

          {/* ── Columna derecha: SVG interactivo ── */}
          <div
            ref={right.ref}
            style={{
              opacity: right.visible ? 1 : 0,
              transform: right.visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
            }}
          >
            {/* Badge */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-dm-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                border: '1px solid var(--border)',
                padding: '0.3rem 0.8rem',
                borderRadius: '100px',
                marginBottom: '1rem',
              }}
            >
              Vista previa interactiva
            </span>

            <MatSVG matColor={matColor} />

            {/* Medidas comunes */}
            <p
              style={{
                textAlign: 'center',
                fontSize: '0.72rem',
                color: 'rgba(240,237,230,0.35)',
                fontFamily: 'var(--font-dm-sans)',
                marginTop: '1rem',
                letterSpacing: '0.05em',
              }}
            >
              Medidas más comunes: 40×60 · 50×80 · 60×90 · 80×120 cm
            </p>

            {/* Indicador de color activo */}
            {selectedColor && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  marginTop: '1rem',
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    background: selectedColor.hex,
                    border: '1px solid rgba(255,255,255,0.15)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(240,237,230,0.5)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  Mostrando: {selectedColor.nombre}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
