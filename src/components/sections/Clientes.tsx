'use client';

/**
 * Sección: Clientes & Social Proof
 * Garbage — Limpiapiés Personalizados
 *
 * Estructura:
 *   1. Logo wall con marquee en mobile / grid en desktop
 *   2. Testimonios — layout asimétrico: quote grande + 2 micro-cards
 *
 * TODO: reemplazar todos los testimonios marcados con datos reales del cliente.
 */

import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { LogoCard } from '@/components/ui/logo-card';

// ─── Datos: clientes (logo wall) ─────────────────────────────────────────────

const CLIENTES: { companyName: string }[] = [
  { companyName: 'Líder' },
  { companyName: 'Unimarc' },
  { companyName: 'Paris' },
  { companyName: 'BancoEstado' },
  { companyName: 'Municipalidades de Chile' },
  { companyName: 'Sodimac' },
  { companyName: 'Falabella' },
  { companyName: 'Ripley' },
  { companyName: 'Mall Plaza' },
  { companyName: 'Sanna' },
  { companyName: 'Cruz Verde' },
];

// ─── Datos: testimonios ───────────────────────────────────────────────────────

/**
 * TODO: reemplazar con testimonios reales validados por el cliente Garbage.
 * Los nombres, cargos y textos a continuación son placeholders realistas.
 */


// ─── Variantes de animación ───────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ─── Sub-componente: Logo Wall ────────────────────────────────────────────────

function LogoWall() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref}>
      {/* Eyebrow */}
      <motion.p
        className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center mb-8"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        
      >
        Empresas que confían en Garbage
      </motion.p>

      {/* Desktop: grid */}
      <motion.div
        className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-3"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        
      >
        {CLIENTES.map((cliente) => (
          <LogoCard key={cliente.companyName} companyName={cliente.companyName} />
        ))}
      </motion.div>

      {/* Mobile: marquee infinito */}
      <div className="md:hidden overflow-hidden" aria-hidden="true">
        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 18,
            ease: 'linear',
          }}
        >
          {/* Duplicamos la lista para el loop seamless */}
          {[...CLIENTES, ...CLIENTES].map((cliente, i) => (
            <LogoCard
              key={`${cliente.companyName}-${i}`}
              companyName={cliente.companyName}
              className="shrink-0 w-36"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Clientes() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <Section id="clientes" background="alt">
      <Container>
        {/* ── Header de sección ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E63000] mb-3"
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            
          >
            Clientes que confían en nosotros
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4"
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            
          >
            Las marcas más importantes de Chile eligen Garbage
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-[#666666] leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            
          >
            Más de 50 años siendo el proveedor de confianza para retail, banca, salud y sector
            público.
          </motion.p>
        </div>

        {/* ── Logo Wall ── */}
        <div className="mb-16">
          <LogoWall />
        </div>

        {/* ── Galería de trabajos reales con fotos -- */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <img src="https://images.unsplash.com/photo-1520974695044-23a584ed59d4?auto=format&fit=crop&w=1000&q=80" alt="Muestra de limpiapiés personalizados" className="w-full h-40 object-cover rounded-xl shadow-sm" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1616628203254-f20e478ee5b9?auto=format&fit=crop&w=1000&q=80" alt="Instalación profesional de alfombras" className="w-full h-40 object-cover rounded-xl shadow-sm" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1573164713347-df35f97a23e4?auto=format&fit=crop&w=1000&q=80" alt="Detalle de diseño de logo" className="w-full h-40 object-cover rounded-xl shadow-sm" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1639928482274-7081f8af4710?auto=format&fit=crop&w=1000&q=80" alt="Calidad de materiales y acabado" className="w-full h-40 object-cover rounded-xl shadow-sm" loading="lazy" />
        </div>

        {/* ── Contenido destacado: cotización prioritaria ── */}
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-8 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-cyan-900 mb-3">
            Cotizá primero, avanzá rápido
          </h3>
          <p className="text-sm md:text-base text-cyan-700 mb-6 max-w-2xl mx-auto">
            Mandanos tus medidas, logo e idea, y te respondemos con precio, material y tiempo de entrega en menos de 24 horas.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-cyan-700 text-white font-bold hover:bg-cyan-800 transition"
          >
            Pedir cotización inmediata
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}

export default Clientes;
