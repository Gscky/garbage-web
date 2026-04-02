'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

export default function CTAFinal() {
  const reduced = useReducedMotion()

  return (
    <section
      id="cta-final"
      aria-labelledby="cta-heading"
      className="w-full py-20 md:py-28 bg-[#F5F5F5]"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E63000] mb-4">
            ¿Listo para cotizar?
          </p>
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl font-black tracking-tight text-[#1A1A1A] mb-4"
          >
            Recibí tu presupuesto hoy mismo
          </h2>
          <p className="text-base md:text-lg text-[#0f766e] mb-8 max-w-xl mx-auto">
            Cotizá ahora y poné tu orden en movimiento: respuesta en menos de 24 horas con precio, material y tiempos de entrega.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E63000] text-white font-bold text-base rounded-lg transition-all duration-200 hover:bg-[#C42800] hover:shadow-[0_0_32px_rgba(230,48,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63000] focus-visible:ring-offset-2"
            >
              Cotizá ahora
              <span aria-hidden="true" className="text-lg">→</span>
            </Link>
            <p className="text-xs text-[#9CA3AF]">
              Sin compromisos. Primera respuesta en menos de 24 horas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
