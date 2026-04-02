import { ContactForm } from '@/components/forms/ContactForm'

export default function Contacto() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="w-full py-20 md:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Izquierda — Información */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E63000] mb-3">
              Contacto
            </p>
            <h2
              id="contacto-heading"
              className="text-3xl md:text-4xl font-black tracking-tight text-[#1A1A1A] mb-4"
            >
              Hablemos de tu proyecto
            </h2>
            <p className="text-base text-[#666666] leading-relaxed mb-8">
              Completá el formulario y te contactamos con una cotización a medida. O si preferís, llamanos directamente.
            </p>

            {/* Info de contacto */}
            <div className="space-y-4">
              {/* Teléfonos */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0 text-[#E63000]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">Teléfonos</p>
                  <a href="tel:+5622683601" className="block text-sm text-[#1A1A1A] hover:text-[#E63000] transition-colors">+56 2 2683 6012</a>
                  <a href="tel:+5622684146" className="block text-sm text-[#1A1A1A] hover:text-[#E63000] transition-colors">+56 2 2684 1460</a>
                  <a href="tel:+56996998344" className="block text-sm text-[#1A1A1A] hover:text-[#E63000] transition-colors">+56 9 9699 8344</a>
                  <a href="tel:+56994444244" className="block text-sm text-[#1A1A1A] hover:text-[#E63000] transition-colors">+56 9 9444 4244</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0 text-[#E63000]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">Email</p>
                  <a href="mailto:ventas@garbage.cl" className="text-sm text-[#1A1A1A] hover:text-[#E63000] transition-colors">
                    ventas@garbage.cl
                  </a>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0 text-[#E63000]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">Dirección</p>
                  <p className="text-sm text-[#1A1A1A]">La Raza #1695, Santiago, Chile</p>
                  <p className="text-xs text-[#666666] mt-1">Atendemos a todas las regiones de Chile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Derecha — Formulario */}
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-6 md:p-8">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}
