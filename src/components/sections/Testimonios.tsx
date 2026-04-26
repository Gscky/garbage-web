'use client'

import { motion } from 'framer-motion'

const testimonios = [
  {
    texto: 'Llevamos más de 10 años trabajando con Garbage para todos nuestros locales a nivel nacional. La calidad es consistente pedido a pedido, los tiempos se cumplen y el logo siempre sale exacto. Ya van más de 80 unidades y seguimos renovando con ellos.',
    autor: 'Jefa de Compras',
    empresa: 'Cadena de retail, Santiago',
    industria: 'Retail',
    resultado: '+80 unidades en 10 años',
  },
  {
    texto: 'Necesitábamos limpiapiés con nuestro logo para la apertura de 5 nuevas sucursales en Santiago y regiones. Garbage cumplió en 12 días hábiles, con un resultado visual que superó nuestras expectativas. El equipo fue muy profesional y la prueba previa al diseño nos dio mucha confianza.',
    autor: 'Gerente de Operaciones',
    empresa: 'Institución financiera, Chile',
    industria: 'Banca',
    resultado: '5 sucursales entregadas en 12 días',
  },
  {
    texto: 'Pedimos cotización un lunes y el martes ya teníamos precio, material y plazo. En 10 días hábiles los limpiapiés estaban instalados en todas nuestras dependencias. Sin complicaciones, directo al punto.',
    autor: 'Encargado de Infraestructura',
    empresa: 'Municipalidad, Región Metropolitana',
    industria: 'Sector público',
    resultado: 'Cotización en 24h · entrega en 10 días',
  },
]

const containerVariants = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
}

export default function Testimonios() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="container-site">

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
            Lo que dicen nuestros clientes
          </span>
          <h2
            id="testimonios-heading"
            className="font-bold max-w-2xl mx-auto"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-playfair)' }}
          >
            500+ empresas no pueden equivocarse
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonios.map((t) => (
            <motion.div
              key={t.autor}
              variants={cardVariants}
              className="relative rounded-2xl p-7 flex flex-col gap-4"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Comilla decorativa */}
              <div
                className="select-none"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '6rem',
                  color: 'var(--accent)',
                  opacity: 0.12,
                  lineHeight: 0,
                  marginTop: '1.5rem',
                  marginBottom: '-0.5rem',
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Texto */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
                {t.texto}
              </p>

              {/* Separador */}
              <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

              {/* Resultado destacado */}
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ backgroundColor: 'rgba(10,22,40,0.08)', border: '1px solid rgba(10,22,40,0.15)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em' }}>
                  {t.resultado}
                </span>
              </div>

              {/* Autor */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: 'rgba(10,22,40,0.15)', color: 'var(--accent)' }}
                >
                  {t.autor[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
                    {t.autor}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}>
                    {t.empresa}
                  </p>
                </div>
                <span
                  className="ml-auto text-xs font-semibold rounded-full px-2.5 py-1 shrink-0"
                  style={{ backgroundColor: 'rgba(10,22,40,0.10)', color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.05em' }}
                >
                  {t.industria}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
