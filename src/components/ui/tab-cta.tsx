'use client'

import { useTab } from '@/context/TabContext'
import { NeonButton } from '@/components/ui/neon-button'

interface TabCTAProps {
  titulo: string
}

export function TabCTA({ titulo }: TabCTAProps) {
  const { setActiveTab } = useTab()

  return (
    <div style={{ margin: '3rem 5vw' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3c 60%, #0f2444 100%)',
        borderRadius: '12px',
        padding: 'clamp(2rem, 6vw, 3rem) clamp(1.25rem, 5vw, 3rem)',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(5,10,20,0.4)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 600,
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: '#C8A96E',
          marginBottom: '1.25rem',
        }}>
          ¿Listo para cotizar?
        </p>

        {/* Título */}
        <h2 style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#FFFFFF',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {titulo}
        </h2>

        {/* Línea dorada decorativa */}
        <div style={{
          width: '48px',
          height: '3px',
          background: '#C8A96E',
          borderRadius: '100px',
          margin: '0 auto 1.25rem',
        }} />

        {/* Subtítulo */}
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '0.95rem',
          color: 'rgba(240,237,230,0.65)',
          marginBottom: '2rem',
          letterSpacing: '0.01em',
        }}>
          Respuesta en menos de 24 horas.
        </p>

        {/* Botones */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.875rem',
          justifyContent: 'center',
        }}>
          <NeonButton
            variant="gold"
            size="lg"
            onClick={() => setActiveTab('cotizar')}
          >
            Cotizar ahora
          </NeonButton>

          <a
            href="https://wa.me/56996998344?text=Hola%2C%20quiero%20cotizar%20un%20limpiapi%C3%A9s%20personalizado"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 600,
              fontSize: '0.875rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '100px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s, transform 0.15s',
              boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#20c45e'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#25D366'
              el.style.transform = 'translateY(0)'
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
