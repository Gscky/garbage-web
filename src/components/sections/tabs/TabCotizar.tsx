'use client'

import { useState, useRef } from 'react'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionBanner } from '@/components/ui/section-banner'

function DragDropLogo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File) => setFileName(file.name)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: '#0A1628',
        marginBottom: '0.5rem',
      }}>
        Adjuntar logo (opcional)
      </p>
      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        style={{
          display: 'block',
          border: `2px dashed ${isDragging ? '#0A1628' : 'rgba(10,22,40,0.2)'}`,
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: fileName ? 'rgba(10,22,40,0.03)' : '#F8F7F4',
          transition: 'border-color 0.2s ease, background-color 0.2s ease',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf,.ai,.svg,.eps"
          style={{ display: 'none' }}
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
        />
        {fileName ? (
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.875rem',
            color: '#0A1628',
            fontWeight: 500,
          }}>
            <span style={{ color: '#22c55e', marginRight: '0.4rem' }}>✓</span> {fileName}
          </p>
        ) : (
          <>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.875rem',
              color: '#0A1628',
              fontWeight: 500,
              marginBottom: '0.25rem',
            }}>
              Arrastra tu logo aquí o haz click para subir
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.72rem',
              color: 'rgba(10,22,40,0.4)',
            }}>
              PNG, PDF o AI con fondo transparente
            </p>
          </>
        )}
      </label>
    </div>
  )
}

function InfoContacto() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Badge 24h */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#F0EEE9',
        border: '1px solid rgba(10,22,40,0.12)',
        borderRadius: '100px',
        width: 'fit-content',
      }}>
        <span style={{
          fontSize: '0.65rem',
          fontFamily: 'var(--font-dm-sans)',
          color: '#0A1628',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          ⚡ Respondemos en menos de 24h
        </span>
      </div>

      {/* Card datos */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(10,22,40,0.08)',
        borderRadius: '8px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#0A1628',
        }}>
          Contacto directo
        </h3>

        {[
          { label: 'Teléfonos',  value: '+56 2 2683 6012 / +56 2 2684 1460' },
          { label: 'WhatsApp',   value: '+56 9 9699 8344 / +56 9 9444 4244' },
          { label: 'Email',      value: 'ventas@garbage.cl' },
          { label: 'Dirección',  value: 'La Raza #1695, Santiago' },
          { label: 'Horario',    value: 'Lun–Vie 09:00–18:00' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A1628', fontWeight: 700, marginBottom: '0.15rem' }}>
              {label}
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'rgba(10,22,40,0.65)', fontWeight: 400 }}>
              {value}
            </p>
          </div>
        ))}
      </div>


      {/* WhatsApp */}
      <a
        href="https://wa.me/56996998344?text=Hola%2C%20quiero%20cotizar%20un%20limpiapi%C3%A9s%20personalizado"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.875rem',
          backgroundColor: '#25D366',
          color: '#fff',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 600,
          fontSize: '0.9rem',
          borderRadius: '2px',
          textDecoration: 'none',
          textAlign: 'center',
        }}
      >
        O escríbenos por WhatsApp →
      </a>
    </div>
  )
}

export default function TabCotizar() {
  return (
    <div className="tab-content-enter">
      <SectionBanner eyebrow="Solicitar cotización" titulo="Pedinos tu cotización" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)', minHeight: '40vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Grid 55/45 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="cotizar-grid"
        >
          {/* Columna formulario */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(10,22,40,0.08)',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            <DragDropLogo />
            <ContactForm />
          </div>

          {/* Columna info */}
          <InfoContacto />
        </div>

      </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cotizar-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
