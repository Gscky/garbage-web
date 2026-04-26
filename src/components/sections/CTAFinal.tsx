'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

export default function CTAFinal() {
  const reduced = useReducedMotion()

  return (
    <section
      id="cta-final"
      aria-labelledby="cta-heading"
      className="w-full py-20 md:py-28"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}>
            ¿Listo para cotizar?
          </p>
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
          >
            Recibí tu presupuesto hoy mismo
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
            Cotiza ahora y pon tu orden en movimiento: respuesta en menos de 24 horas con precio, material y tiempos de entrega.
          </p>

          <div className="flex flex-col items-center gap-3">
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-base transition-all duration-200 hover:scale-105 focus-visible:outline-none"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#000000',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)' }}
            >
              Cotiza ahora
              <span aria-hidden="true" className="text-lg">→</span>
            </Link>
            <p className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.6, fontFamily: 'var(--font-dm-sans)' }}>
              Sin compromisos. Primera respuesta en menos de 24 horas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
