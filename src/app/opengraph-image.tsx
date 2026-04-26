import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Garbage — Limpiapiés Personalizados con Logo para Empresas en Chile'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A1F3F 0%, #0F2E5C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '24px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#0EA5E9',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          GARBAGE
        </div>
        <div
          style={{
            fontSize: 34,
            color: '#FFFFFF',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.3,
            fontWeight: 600,
          }}
        >
          Limpiapiés Personalizados con Logo para Empresas en Chile
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 8,
            display: 'flex',
            gap: '32px',
          }}
        >
          <span>30 años de experiencia</span>
          <span style={{ color: '#0EA5E9' }}>·</span>
          <span>500+ empresas clientes</span>
          <span style={{ color: '#0EA5E9' }}>·</span>
          <span>Fabricación 100% propia</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
