'use client'

import { ContactForm } from '@/components/forms/ContactForm'

export default function Contacto() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '5rem', paddingBottom: '5rem', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Izquierda — Info */}
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
            >
              Contacto
            </span>
            <h2
              id="contacto-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
            >
              Hablemos de tu proyecto
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
              Completa el formulario y te respondemos con una cotización en menos de 24 horas. O si prefieres, llámanos directamente.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/56996998344?text=Hola%2C%20quiero%20cotizar%20un%20limpiapi%C3%A9s%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 mb-8"
              style={{
                backgroundColor: '#25D366',
                boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir por WhatsApp
            </a>

            {/* Info de contacto */}
            <div className="flex flex-col gap-6">

              {/* Teléfonos */}
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(10,22,40,0.10)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1.5" style={{ color: 'var(--text-secondary)', opacity: 0.5, fontFamily: 'var(--font-dm-sans)' }}>Teléfonos</p>
                  {['+56 2 2683 6012', '+56 2 2684 1460', '+56 9 9699 8344', '+56 9 9444 4244'].map((tel) => (
                    <a key={tel} href={`tel:${tel.replace(/\s/g, '')}`} className="block text-sm transition-colors duration-150" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}
                      onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--accent)' }}
                      onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}
                    >{tel}</a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(10,22,40,0.10)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1.5" style={{ color: 'var(--text-secondary)', opacity: 0.5, fontFamily: 'var(--font-dm-sans)' }}>Email</p>
                  <a href="mailto:ventas@garbage.cl" className="text-sm transition-colors duration-150" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}
                  >ventas@garbage.cl</a>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(10,22,40,0.10)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1.5" style={{ color: 'var(--text-secondary)', opacity: 0.5, fontFamily: 'var(--font-dm-sans)' }}>Dirección</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}>La Raza #1695, Santiago, Chile</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', opacity: 0.4, fontFamily: 'var(--font-dm-sans)' }}>Atendemos a todas las regiones de Chile</p>
                </div>
              </div>

            </div>
          </div>

          {/* Derecha — Formulario */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}
