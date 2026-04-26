'use client';

import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

import { IconLimpiapieSPersonalizado } from '@/components/icons/IconLimpiapieSPersonalizado';
import { IconAlfombraPublicitaria } from '@/components/icons/IconAlfombraPublicitaria';
import { IconAntideslizante } from '@/components/icons/IconAntideslizante';
import { IconDescargaEstatica } from '@/components/icons/IconDescargaEstatica';
import { IconCintaSeguridad } from '@/components/icons/IconCintaSeguridad';
import { IconAlfombraRollo } from '@/components/icons/IconAlfombraRollo';

interface Producto {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const productos: Producto[] = [
  {
    icon: <IconLimpiapieSPersonalizado className="w-7 h-7" />,
    title: 'Limpiapiés Personalizado con Logo',
    description:
      'El limpiapiés con tu marca en la entrada de tu local, oficina o sucursal. Lo fabricamos en el tamaño y material que necesitás.',
  },
  {
    icon: <IconAlfombraPublicitaria className="w-6 h-6" />,
    title: 'Alfombra Publicitaria',
    description:
      'Convertí el piso en un mensaje. Ideal para campañas, eventos, aperturas o espacios de alto tráfico.',
  },
  {
    icon: <IconAntideslizante className="w-6 h-6" />,
    title: 'Antideslizante',
    description:
      'Para zonas húmedas o de alto tráfico. Reduce accidentes y cumple con normativas de seguridad.',
  },
  {
    icon: <IconDescargaEstatica className="w-6 h-6" />,
    title: 'Alfombra Descarga Electrostática',
    description:
      'Protege equipos sensibles en salas de servidores, laboratorios y áreas de manufactura.',
  },
  {
    icon: <IconCintaSeguridad className="w-6 h-6" />,
    title: 'Cinta de Seguridad y Señalización',
    description:
      'Demarca zonas de riesgo, pasillos y áreas restringidas. Cumple con normativas de seguridad laboral.',
  },
  {
    icon: <IconAlfombraRollo className="w-6 h-6" />,
    title: 'Alfombra en Rollo',
    description:
      'Para proyectos de gran escala. Vendemos por metro para instalaciones industriales, centros comerciales y edificios corporativos.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const reducedCardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface HeroCardProps {
  producto: Producto;
  variants: Variants;
}

function HeroCard({ producto, variants }: HeroCardProps) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        'group relative',
        'col-span-1 row-span-1',
        'md:col-span-2 md:row-span-2',
        'rounded-2xl',
        'p-8 md:p-10',
        'flex flex-col justify-between',
        'transition-all duration-300 ease-in-out',
        'cursor-pointer overflow-hidden'
      )}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(10,22,40,0.4)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Acento decorativo de fondo */}
      <div
        className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 rounded-bl-[6rem] md:rounded-bl-[8rem] pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: 'rgba(10,22,40,0.04)' }}
        aria-hidden="true"
      />

      <div>
        {/* Eyebrow badge "Producto estrella" */}
        <span
          className="inline-flex items-center gap-1.5 mb-6 text-xs font-semibold uppercase rounded-full px-3 py-1"
          style={{
            color: '#000000',
            backgroundColor: 'var(--accent)',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
          }}
        >
          Producto estrella
        </span>

        {/* Ícono */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-colors duration-200"
          style={{ backgroundColor: 'rgba(10,22,40,0.10)', color: 'var(--accent)' }}
        >
          {producto.icon}
        </div>

        {/* Título */}
        <h3
          className="text-xl md:text-2xl font-bold leading-snug mb-3"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
        >
          {producto.title}
        </h3>

        {/* Descripción */}
        <p className="text-base leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
          {producto.description}
        </p>
      </div>

      {/* CTA */}
      <div className="inline-flex items-center gap-2 mt-8 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
        <span>Cotiza tu limpiapiés</span>
        <ArrowRight className="transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}

interface StandardCardProps {
  producto: Producto;
  variants: Variants;
}

function StandardCard({ producto, variants }: StandardCardProps) {
  return (
    <motion.div
      variants={variants}
      className="group relative rounded-2xl p-6 flex flex-col transition-all duration-300 ease-in-out cursor-pointer"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(10,22,40,0.4)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Ícono */}
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-colors duration-200"
        style={{ backgroundColor: 'rgba(10,22,40,0.10)', color: 'var(--accent)' }}
      >
        {producto.icon}
      </div>

      <h3 className="text-base font-semibold mb-2 leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
        {producto.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
        {producto.description}
      </p>

      {/* Flecha */}
      <div
        className="absolute bottom-5 right-5 transition-all duration-200 ease-in-out group-hover:translate-x-1"
        style={{ color: 'rgba(10,22,40,0.3)' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
      >
        <ArrowRight />
      </div>
    </motion.div>
  );
}

export default function Productos() {
  const shouldReduceMotion = useReducedMotion();
  const activeCardVariants = shouldReduceMotion ? reducedCardVariants : cardVariants;

  const [heroProducto, ...restProductos] = productos;

  return (
    <Section id="productos" background="alt">
      <Container>
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16 max-w-2xl"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.2em' }}
          >
            Nuestros productos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
            Todo lo que tu empresa necesita en limpiapiés
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
            Fabricamos a medida según tus especificaciones. Logo, tamaño, color, material — todo se adapta.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className={cn('grid gap-4', 'grid-cols-1', 'md:grid-cols-4 md:grid-rows-3')}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <HeroCard producto={heroProducto} variants={activeCardVariants} />
          <StandardCard producto={restProductos[0]} variants={activeCardVariants} />
          <StandardCard producto={restProductos[1]} variants={activeCardVariants} />
          <StandardCard producto={restProductos[2]} variants={activeCardVariants} />
          <StandardCard producto={restProductos[3]} variants={activeCardVariants} />

          {/* Card 6 — Alfombra en Rollo: 2 columnas */}
          <motion.div
            variants={activeCardVariants}
            className="group relative md:col-span-2 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:gap-8 transition-all duration-300 ease-in-out cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(10,22,40,0.4)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div
              className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 md:mb-0 transition-colors duration-200"
              style={{ backgroundColor: 'rgba(10,22,40,0.10)', color: 'var(--accent)' }}
            >
              {restProductos[4].icon}
            </div>

            <div className="flex-1 pr-8">
              <h3 className="text-base font-semibold mb-2 leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}>
                {restProductos[4].title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>
                {restProductos[4].description}
              </p>
            </div>

            <div className="absolute bottom-5 right-5 md:static md:flex-shrink-0 transition-all duration-200 ease-in-out group-hover:translate-x-1" style={{ color: 'rgba(10,22,40,0.3)' }}>
              <ArrowRight />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
