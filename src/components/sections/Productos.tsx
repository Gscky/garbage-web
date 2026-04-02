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

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Producto {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Variantes de animación ───────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const reducedCardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ─── Arrow Icon ───────────────────────────────────────────────────────────────

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Card hero (producto principal — ocupa 2 columnas × 2 filas) ─────────────

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
        'bg-white rounded-2xl border border-[#E5E5E5]',
        'p-8 md:p-10',
        'flex flex-col justify-between',
        'transition-all duration-300 ease-in-out',
        'hover:border-[#E63000]/40',
        'hover:shadow-[0_12px_40px_rgba(230,48,0,0.10)]',
        'cursor-pointer overflow-hidden'
      )}
    >
      {/* Acento decorativo de fondo */}
      <div
        className={cn(
          'absolute top-0 right-0',
          'w-48 h-48 md:w-64 md:h-64',
          'rounded-bl-[6rem] md:rounded-bl-[8rem]',
          'bg-[#E63000]/[0.04]',
          'transition-colors duration-300',
          'group-hover:bg-[#E63000]/[0.07]',
          'pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Header */}
      <div>
        {/* Eyebrow badge */}
        <span
          className={cn(
            'inline-flex items-center gap-1.5 mb-6',
            'text-xs font-semibold uppercase tracking-widest',
            'text-[#E63000]',
            'bg-[#E63000]/[0.08] rounded-full px-3 py-1'
          )}
        >
          Producto estrella
        </span>

        {/* Ícono grande */}
        <div
          className={cn(
            'inline-flex items-center justify-center',
            'w-16 h-16 rounded-xl mb-6',
            'bg-[#E63000]/[0.08] text-[#E63000]',
            'transition-colors duration-200',
            'group-hover:bg-[#E63000]/[0.14]'
          )}
        >
          {producto.icon}
        </div>

        {/* Título */}
        <h3
          className={cn(
            'text-xl md:text-2xl font-bold text-[#1A1A1A] leading-snug',
            'mb-3'
          )}
        >
          {producto.title}
        </h3>

        {/* Descripción */}
        <p className="text-base text-[#666666] leading-relaxed max-w-sm">
          {producto.description}
        </p>
      </div>

      {/* CTA */}
      <div
        className={cn(
          'inline-flex items-center gap-2 mt-8',
          'text-sm font-semibold text-[#E63000]'
        )}
      >
        <span>Cotizá tu limpiapiés</span>
        <ArrowRight
          className="transition-transform duration-200 ease-in-out group-hover:translate-x-1"
        />
      </div>
    </motion.div>
  );
}

// ─── Card estándar ────────────────────────────────────────────────────────────

interface StandardCardProps {
  producto: Producto;
  variants: Variants;
}

function StandardCard({ producto, variants }: StandardCardProps) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        'group relative',
        'bg-white rounded-2xl border border-[#E5E5E5]',
        'p-6',
        'flex flex-col',
        'transition-all duration-300 ease-in-out',
        'hover:border-[#E63000]/40',
        'hover:shadow-[0_8px_24px_rgba(230,48,0,0.10)]',
        'cursor-pointer'
      )}
    >
      {/* Ícono */}
      <div
        className={cn(
          'inline-flex items-center justify-center',
          'w-12 h-12 rounded-lg mb-4',
          'bg-[#E63000]/[0.08] text-[#E63000]',
          'transition-colors duration-200',
          'group-hover:bg-[#E63000]/[0.14]'
        )}
      >
        {producto.icon}
      </div>

      {/* Contenido */}
      <h3 className="text-base font-semibold text-[#1A1A1A] mb-2 leading-snug">
        {producto.title}
      </h3>
      <p className="text-sm text-[#666666] leading-relaxed flex-1">
        {producto.description}
      </p>

      {/* Flecha sutil en esquina inferior derecha */}
      <div
        className={cn(
          'absolute bottom-5 right-5',
          'text-[#D4D4D4]',
          'transition-all duration-200 ease-in-out',
          'group-hover:text-[#E63000] group-hover:translate-x-1'
        )}
      >
        <ArrowRight />
      </div>
    </motion.div>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────

export default function Productos() {
  const shouldReduceMotion = useReducedMotion();
  const activeCardVariants = shouldReduceMotion ? reducedCardVariants : cardVariants;

  const [heroProducto, ...restProductos] = productos;

  return (
    <Section id="productos" background="alt">
      <Container>
        {/* Header de sección */}
        <motion.div
          className="mb-12 md:mb-16 max-w-2xl"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-widest',
              'text-[#E63000] mb-3'
            )}
          >
            Nuestros productos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4">
            Todo lo que tu empresa necesita en limpiapiés
          </h2>
          <p className="text-base md:text-lg text-[#666666] leading-relaxed">
            Fabricamos a medida según tus especificaciones. Logo, tamaño, color,
            material — todo se adapta.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className={cn(
            'grid gap-4',
            // Mobile: 1 columna
            'grid-cols-1',
            // Desktop: 4 columnas, 3 filas
            // Producto hero: col 1-2, filas 1-2
            // Productos 2-3: col 3-4, fila 1 (una en cada col)
            // Productos 4-5: col 3-4, fila 2 (una en cada col)
            // Producto 6: col 1-4, fila 3 centrado → col 1-2 o col 3-4
            'md:grid-cols-4 md:grid-rows-3'
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Hero card — Limpiapiés Personalizado con Logo */}
          <HeroCard producto={heroProducto} variants={activeCardVariants} />

          {/* Card 2 — Alfombra Publicitaria */}
          <StandardCard producto={restProductos[0]} variants={activeCardVariants} />

          {/* Card 3 — Antideslizante */}
          <StandardCard producto={restProductos[1]} variants={activeCardVariants} />

          {/* Card 4 — Descarga Electrostática */}
          <StandardCard producto={restProductos[2]} variants={activeCardVariants} />

          {/* Card 5 — Cinta de Seguridad */}
          <StandardCard producto={restProductos[3]} variants={activeCardVariants} />

          {/* Card 6 — Alfombra en Rollo: ocupa las últimas 2 columnas en desktop */}
          <motion.div
            variants={activeCardVariants}
            className={cn(
              'group relative',
              'md:col-span-2',
              'bg-white rounded-2xl border border-[#E5E5E5]',
              'p-6',
              'flex flex-col md:flex-row md:items-center md:gap-8',
              'transition-all duration-300 ease-in-out',
              'hover:border-[#E63000]/40',
              'hover:shadow-[0_8px_24px_rgba(230,48,0,0.10)]',
              'cursor-pointer'
            )}
          >
            {/* Ícono */}
            <div
              className={cn(
                'flex-shrink-0',
                'inline-flex items-center justify-center',
                'w-12 h-12 rounded-lg mb-4 md:mb-0',
                'bg-[#E63000]/[0.08] text-[#E63000]',
                'transition-colors duration-200',
                'group-hover:bg-[#E63000]/[0.14]'
              )}
            >
              {restProductos[4].icon}
            </div>

            {/* Contenido */}
            <div className="flex-1 pr-8">
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-2 leading-snug">
                {restProductos[4].title}
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {restProductos[4].description}
              </p>
            </div>

            {/* Flecha */}
            <div
              className={cn(
                'absolute bottom-5 right-5 md:static md:flex-shrink-0',
                'text-[#D4D4D4]',
                'transition-all duration-200 ease-in-out',
                'group-hover:text-[#E63000] group-hover:translate-x-1'
              )}
            >
              <ArrowRight />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
