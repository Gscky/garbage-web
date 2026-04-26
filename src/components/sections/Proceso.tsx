'use client';

import * as React from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';

interface PasoData {
  numero: string;
  titulo: string;
  descripcion: string;
}

const PASOS: PasoData[] = [
  {
    numero: '01',
    titulo: 'Contacto y consulta',
    descripcion:
      'Completa el formulario o llámanos. Te respondemos en menos de 24 horas con todas las opciones disponibles.',
  },
  {
    numero: '02',
    titulo: 'Presupuesto a medida',
    descripcion:
      'Te enviamos una cotización con precio, materiales y tiempos de entrega según tus necesidades específicas.',
  },
  {
    numero: '03',
    titulo: 'Aprobación del diseño',
    descripcion:
      'Te mostramos cómo va a quedar tu logo en el limpiapiés antes de producir. Sin sorpresas al recibir el pedido.',
  },
  {
    numero: '04',
    titulo: 'Producción y entrega',
    descripcion:
      'Fabricamos tu pedido y lo despachamos a cualquier región de Chile. Confirmamos la entrega con seguimiento.',
  },
];

const ACCENT = 'var(--accent)';

function LineaHorizontal({ animate }: { animate: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute top-[28px] left-0 right-0 hidden md:block pointer-events-none" aria-hidden="true">
      <svg width="100%" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
        <line x1="0" y1="2" x2="100" y2="2" stroke="rgba(10,22,40,0.15)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <motion.line
          x1="0" y1="2" x2="100" y2="2"
          stroke={ACCENT} strokeWidth="2"
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0.3 } : { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.3 }}
        />
      </svg>
    </div>
  );
}

function LineaVertical({ animate }: { animate: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute top-0 left-[27px] bottom-0 md:hidden pointer-events-none" aria-hidden="true">
      <svg width="4" height="100%" viewBox="0 0 4 100" preserveAspectRatio="none">
        <line x1="2" y1="0" x2="2" y2="100" stroke="rgba(10,22,40,0.15)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <motion.line
          x1="2" y1="0" x2="2" y2="100"
          stroke={ACCENT} strokeWidth="2"
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0.3 } : { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.3 }}
        />
      </svg>
    </div>
  );
}

interface PasoCardProps {
  paso: PasoData;
  index: number;
}

function PasoCard({ paso, index }: PasoCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.55,
        ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
        delay: shouldReduceMotion ? 0 : index * 0.15 + 0.5,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-start"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      {/* Círculo numerado */}
      <div
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6 shrink-0"
        style={{
          border: '2px solid rgba(10,22,40,0.3)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <span className="text-lg font-black tabular-nums leading-none" style={{ color: ACCENT, fontFamily: 'var(--font-playfair)' }} aria-hidden="true">
          {paso.numero}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 pr-4 border-l-[3px] pl-4" style={{ borderColor: 'var(--accent)' }}>
        {/* Número decorativo de fondo */}
        <div className="relative">
          <span
            className="absolute -top-2 -left-2 font-black select-none pointer-events-none"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '8rem',
              color: 'var(--accent)',
              opacity: 0.06,
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {paso.numero}
          </span>
          <span className="relative text-xs font-bold tracking-[0.12em] uppercase" style={{ color: ACCENT, fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.12em' }}>
            Paso {paso.numero}
          </span>
          <h3 className="relative text-base md:text-lg font-bold leading-snug mt-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
            {paso.titulo}
          </h3>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
          {paso.descripcion}
        </p>
      </div>
    </motion.div>
  );
}

function TimelineMobile({ lineaAnimate }: { lineaAnimate: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="md:hidden relative">
      <LineaVertical animate={lineaAnimate} />
      <div className="flex flex-col gap-0">
        {PASOS.map((paso, i) => {
          const isLast = i === PASOS.length - 1;
          const itemVariants = {
            hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
            visible: {
              opacity: 1, x: 0,
              transition: {
                duration: shouldReduceMotion ? 0.3 : 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
                delay: shouldReduceMotion ? 0 : i * 0.18 + 0.4,
              },
            },
          };

          return (
            <motion.div
              key={paso.numero}
              className={`flex gap-6 ${isLast ? '' : 'pb-10'}`}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={itemVariants}
            >
              <div className="relative flex flex-col items-center shrink-0">
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: '2px solid rgba(10,22,40,0.3)', backgroundColor: 'var(--bg-card)' }}
                >
                  <span className="text-lg font-black tabular-nums leading-none" style={{ color: ACCENT, fontFamily: 'var(--font-playfair)' }} aria-hidden="true">
                    {paso.numero}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-3 pb-2 border-l-[3px] pl-4" style={{ borderColor: 'var(--accent)' }}>
                <span className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: ACCENT, fontFamily: 'var(--font-dm-sans)' }}>
                  Paso {paso.numero}
                </span>
                <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
                  {paso.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
                  {paso.descripcion}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineDesktop({ lineaAnimate }: { lineaAnimate: boolean }) {
  return (
    <div className="hidden md:block">
      <div className="relative">
        <LineaHorizontal animate={lineaAnimate} />
        <div className="grid grid-cols-4 gap-6">
          {PASOS.map((paso, i) => (
            <PasoCard key={paso.numero} paso={paso} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Proceso() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <Section id="proceso" background="white" size="lg">
      <Container>
        <div className="mb-14 md:mb-16" ref={sectionRef}>
          <Reveal>
            <p className="text-xs font-bold tracking-[0.14em] uppercase mb-3" style={{ color: ACCENT, fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}>
              Cómo trabajamos
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="proceso-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] max-w-[640px]"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
            >
              Cotiza, aprueba el diseño y recibe — así de directo
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[540px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
              Sin vueltas ni demoras innecesarias. El proceso está pensado para que tu empresa tenga lo que necesita rápido.
            </p>
          </Reveal>
        </div>

        <TimelineDesktop lineaAnimate={isInView} />
        <TimelineMobile lineaAnimate={isInView} />
      </Container>
    </Section>
  );
}
