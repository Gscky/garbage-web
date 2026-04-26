'use client'

import { useState } from 'react'
import { TabCTA } from '@/components/ui/tab-cta'
import { NeonButton } from '@/components/ui/neon-button'
import { motion, AnimatePresence } from 'framer-motion'
import { useTab } from '@/context/TabContext'
import { SectionBanner } from '@/components/ui/section-banner'

const FAQS = [
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
  {
    pregunta: '¿Puedo pedir una muestra antes de comprar?',
    respuesta: 'Sí, podemos enviarte una muestra del material antes de confirmar un pedido. Consultanos las condiciones directamente — dependiendo del volumen y distancia, coordinamos el envío de la muestra.',
  },
  {
    pregunta: '¿Trabajan con personas naturales o solo empresas?',
    respuesta: 'Trabajamos con ambos. Atendemos desde particulares que quieren un limpiapiés único para su hogar, hasta grandes cadenas con cientos de locales. No hay restricción por tipo de cliente.',
  },
  {
    pregunta: '¿Cuánto dura un limpiapiés de buena calidad?',
    respuesta: 'Un limpiapiés de PVC rizado de alta densidad, bien elegido para el nivel de tráfico del espacio, puede durar entre 3 y 7 años en condiciones normales de uso. La durabilidad depende del material, el tráfico y el mantenimiento.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
  })),
}

export default function TabFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { setActiveTab } = useTab()

  return (
    <div className="tab-content-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionBanner eyebrow="Preguntas frecuentes" titulo="Todo lo que necesitás saber" />

      <div style={{ backgroundColor: '#F8F7F4', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)', minHeight: '40vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTop: `1px solid ${isOpen ? 'rgba(10,22,40,0.12)' : 'rgba(10,22,40,0.08)'}`,
                  borderRight: `1px solid ${isOpen ? 'rgba(10,22,40,0.12)' : 'rgba(10,22,40,0.08)'}`,
                  borderBottom: `1px solid ${isOpen ? 'rgba(10,22,40,0.12)' : 'rgba(10,22,40,0.08)'}`,
                  borderLeft: `3px solid ${isOpen ? '#0A1628' : 'transparent'}`,
                  borderRadius: '0 8px 8px 0',
                  boxShadow: isOpen ? '0 4px 16px rgba(10,22,40,0.08)' : '0 1px 4px rgba(10,22,40,0.04)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.2rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: '#0A1628',
                    lineHeight: 1.4,
                  }}>
                    {faq.pregunta}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      flexShrink: 0,
                      fontSize: '1.5rem',
                      fontWeight: 300,
                      color: '#0A1628',
                      lineHeight: 1,
                      display: 'block',
                    }}
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
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        padding: '0 1.5rem 1.2rem',
                        fontFamily: 'var(--font-dm-sans)',
                        fontWeight: 300,
                        fontSize: '0.9rem',
                        color: 'rgba(10,22,40,0.6)',
                        lineHeight: 1.7,
                      }}>
                        {faq.respuesta}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.875rem',
            color: 'rgba(10,22,40,0.55)',
            marginBottom: '1rem',
          }}>
            ¿Tenés más preguntas? Hablemos directamente.
          </p>
          <NeonButton
            variant="navy"
            size="lg"
            onClick={() => setActiveTab('contacto')}
          >
            Cotizar sin compromiso
          </NeonButton>
        </div>

      </div>
      </div>

      <TabCTA titulo="¿Tienes más preguntas? Hablemos" />
    </div>
  )
}
