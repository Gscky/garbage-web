import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'

// ─── Secciones dinámicas (below-the-fold, carga diferida) ──────────────────

const Clientes = dynamic(() => import('@/components/sections/Clientes'))
const Productos = dynamic(() => import('@/components/sections/Productos'))
const PorQueElegirnos = dynamic(() => import('@/components/sections/PorQueElegirnos'))
const Proceso = dynamic(() => import('@/components/sections/Proceso'))
const Stats = dynamic(() => import('@/components/sections/Stats'))
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal'))
const Contacto = dynamic(() => import('@/components/sections/Contacto'))

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Header sticky — z-50 */}
      <Header />

      {/* Contenido principal */}
      <main id="main-content" tabIndex={-1}>

        {/* SECCIÓN 1 — Hero (above-the-fold) */}
        <Hero />

        {/* SECCIÓN 2 — Logo wall / Clientes */}
        <section id="clientes" aria-labelledby="clientes-heading">
          <Clientes />
        </section>

        {/* SECCIÓN 3 — Catálogo de productos */}
        <section id="productos" aria-labelledby="productos-heading">
          <Productos />
        </section>

        {/* SECCIÓN 4 — Por qué elegirnos / Diferenciadores */}
        <section id="por-que-elegirnos" aria-labelledby="por-que-heading">
          <PorQueElegirnos />
        </section>

        {/* SECCIÓN 5 — Proceso de trabajo (timeline) */}
        <section id="proceso" aria-labelledby="proceso-heading">
          <Proceso />
        </section>

        {/* SECCIÓN 6 — Stats / Números */}
        <section id="stats" aria-labelledby="stats-heading">
          <Stats />
        </section>

        {/* SECCIÓN 7 — CTA final */}
        <section id="cta-final" aria-labelledby="cta-heading">
          <CTAFinal />
        </section>

        {/* SECCIÓN 8 — Formulario de contacto */}
        <section id="contacto" aria-labelledby="contacto-heading">
          <Contacto />
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
