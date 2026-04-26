'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    pregunta: '¿Cuánto tiempo demora la fabricación de limpiapiés personalizados?',
    respuesta: 'El tiempo de producción varía según la cantidad y complejidad del diseño. Para pedidos estándar, el plazo típico es de 7 a 15 días hábiles desde que apruebas el diseño. Para volúmenes grandes o pedidos urgentes, consúltanos directamente.',
  },
  {
    pregunta: '¿Cuál es la cantidad mínima de pedido?',
    respuesta: 'No exigimos cantidades mínimas fijas. Fabricamos desde unidades individuales hasta pedidos de cientos de unidades para grandes cadenas. Contáctanos y te asesoramos según tu necesidad específica.',
  },
  {
    pregunta: '¿Puedo ver cómo quedará el limpiapiés antes de fabricarlo?',
    respuesta: 'Sí. Antes de iniciar la producción te enviamos una prueba visual con tu diseño aplicado. Ningún pedido con logo entra a fabricación sin tu aprobación previa.',
  },
  {
    pregunta: '¿Entregan a regiones fuera de Santiago?',
    respuesta: 'Sí, despachamos a todas las regiones de Chile, desde Arica hasta Punta Arenas. Coordinamos el envío directamente a la dirección que nos indiques.',
  },
  {
    pregunta: '¿Qué materiales usan para los limpiapiés personalizados?',
    respuesta: 'Trabajamos principalmente con PVC rizado de alta durabilidad, ideal para zonas de alto tráfico. También fabricamos con materiales textiles, vinílicos y compuestos según el uso específico. Te recomendamos el material más adecuado para tu instalación.',
  },
  {
    pregunta: '¿Cómo envío mi logo para el limpiapiés?',
    respuesta: 'Aceptamos archivos en formatos vectoriales (AI, EPS, PDF vectorial) o de alta resolución (PNG, JPG). Si no tienes el archivo vectorial de tu logo, nuestro equipo puede ayudarte a digitalizarlo.',
  },
  {
    pregunta: '¿Cuánto cuesta un limpiapiés personalizado con logo?',
    respuesta: 'El precio depende del material, tamaño, cantidad y complejidad del diseño. Para darte un presupuesto exacto, completá el formulario o llámanos — te respondemos en menos de 24 horas con una cotización detallada sin compromiso.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.pregunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.respuesta,
    },
  })),
}

function FaqItem({ faq, isOpen, onToggle }: {
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
          {faq.pregunta}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-2xl font-light leading-none"
          style={{ color: 'var(--accent)' }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
              {faq.respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container-site max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
          >
            Preguntas frecuentes
          </span>
          <h2
            id="faq-heading"
            className="font-bold"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
          >
            Todo lo que necesitás saber
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.pregunta}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}>
            ¿Tenés más preguntas? Hablemos directamente.
          </p>
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: '#000000', borderRadius: '2px', padding: '0.875rem 2rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)' }}
          >
            Cotizar sin compromiso
          </a>
        </motion.div>

      </div>
    </section>
  )
}
