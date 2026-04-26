'use client'

const FOTOS = [
  { src: '/images/gallery/d_01.jpg', alt: 'Limpiapiés personalizado con logo' },
  { src: '/images/gallery/d_02.jpg', alt: 'Alfombra corporativa a medida' },
  { src: '/images/gallery/d_03.jpg', alt: 'Limpiapiés con branding' },
  { src: '/images/gallery/d_04.jpg', alt: 'Alfombra institucional' },
  { src: '/images/gallery/d_05.jpg', alt: 'Limpiapiés retail' },
  { src: '/images/gallery/d_06.jpg', alt: 'Alfombra con logotipo a color' },
  { src: '/images/gallery/d_07.jpg', alt: 'Limpiapiés gran formato' },
  { src: '/images/gallery/d_08.jpg', alt: 'Alfombra publicitaria' },
  { src: '/images/gallery/d_09.jpg', alt: 'Limpiapiés personalizados' },
  { src: '/images/gallery/d_10.jpg', alt: 'Alfombra corporativa' },
  { src: '/images/gallery/d_11.jpg', alt: 'Limpiapiés con diseño' },
  { src: '/images/gallery/d_12.jpg', alt: 'Alfombra antideslizante personalizada' },
  { src: '/images/gallery/d_13.jpg', alt: 'Limpiapiés banca' },
  { src: '/images/gallery/d_14.jpg', alt: 'Alfombra institucional con logo' },
  { src: '/images/gallery/d_15.jpg', alt: 'Limpiapiés municipal' },
  { src: '/images/gallery/d_16.jpg', alt: 'Alfombra personalizada retail' },
  { src: '/images/gallery/d_17.jpg', alt: 'Limpiapiés seguridad' },
  { src: '/images/gallery/d_18.jpg', alt: 'Alfombra con señalética' },
  { src: '/images/gallery/d_19.jpg', alt: 'Limpiapiés corporativo' },
  { src: '/images/gallery/d_20.jpg', alt: 'Alfombra con logo a color' },
  { src: '/images/gallery/d_21.jpg', alt: 'Limpiapiés con branding' },
  { src: '/images/gallery/d_22.jpg', alt: 'Alfombra publicitaria' },
  { src: '/images/gallery/p_1113.jpg', alt: 'Limpiapiés bancario con logotipo' },
  { src: '/images/gallery/p_1136.jpg', alt: 'Limpiapiés institucional' },
]

export default function Galeria() {
  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="container-site">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
          >
            Trabajos realizados
          </span>
          <h2
            id="galeria-heading"
            className="font-bold"
            style={{ color: 'var(--text-primary)', lineHeight: 1.2, fontFamily: 'var(--font-playfair)' }}
          >
            Trabajos que hemos hecho
          </h2>
          <p className="mt-2 text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
            Fabricamos limpiapiés y alfombras 100% personalizadas — estos son algunos de nuestros trabajos.
          </p>
        </div>

        {/* Grid 3 columnas */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          style={{ gap: '12px' }}
        >
          {FOTOS.map((foto, i) => (
            <div
              key={foto.src}
              className="relative overflow-hidden group"
              style={{
                borderRadius: '4px',
                aspectRatio: '1 / 1',
                backgroundColor: 'var(--bg-card)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading={i < 6 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.03) saturate(0.9) brightness(0.85)' }}
              />
              {/* Overlay oscuro en hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                <span
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {foto.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#000000',
              borderRadius: '2px',
              padding: '1rem 2rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)' }}
          >
            Pedir cotización
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
