'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';

// ─── Tipos ────────────────────────────────────────────────────────────────

interface StatData {
  /** Valor numérico objetivo del counter */
  target: number;
  /** Sufijo que se muestra después del número (ej: "+", "%") */
  suffix: string;
  /** Prefijo que se muestra antes del número (ej: "$") */
  prefix?: string;
  /** Label descriptivo */
  label: string;
  /** Descripción adicional */
  description?: string;
}

// ─── Datos ────────────────────────────────────────────────────────────────

const STATS: StatData[] = [
  {
    target: 50,
    suffix: '+',
    label: 'Años de experiencia',
    description: 'Fabricando en Chile desde 1975',
  },
  {
    target: 500,
    suffix: '+',
    label: 'Empresas atendidas',
    description: 'De todos los rubros y tamaños',
  },
  {
    target: 15,
    suffix: '',
    label: 'Regiones con cobertura',
    description: 'Despacho a todo el país',
  },
  {
    target: 100,
    suffix: '%',
    label: 'Fabricación propia',
    description: 'Control total del proceso productivo',
  },
];

// ─── Constantes ───────────────────────────────────────────────────────────

const ACCENT = '#E63000';
const DURATION_MS = 1800;

// ─── Easing easeOutQuart ─────────────────────────────────────────────────
// t: progreso [0, 1] → retorna valor [0, 1] con curva easeOutQuart

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

// ─── Hook: counter animado con rAF ───────────────────────────────────────

function useAnimatedCounter(
  target: number,
  active: boolean,
  duration: number = DURATION_MS
): number {
  const [count, setCount] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const rafRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!active) return;

    // Si el usuario prefiere movimiento reducido, saltar directo al valor final
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    startTimeRef.current = null;

    function tick(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * target);

      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [active, target, duration, shouldReduceMotion]);

  return count;
}

// ─── Componente de stat individual con counter ────────────────────────────

interface AnimatedStatProps {
  stat: StatData;
  active: boolean;
  index: number;
}

function AnimatedStat({ stat, active, index }: AnimatedStatProps) {
  const count = useAnimatedCounter(stat.target, active);

  return (
    <Reveal delay={index * 0.1} threshold={0.2}>
      <div
        className="
          flex flex-col gap-2
          p-6 md:p-8
          bg-white
          rounded-2xl
          border border-[#E5E5E5]
          hover:border-[rgba(230,48,0,0.3)]
          hover:shadow-sm
          transition-all duration-300
        "
      >
        {/* Número contador */}
        <div
          className="flex items-baseline gap-0.5"
          aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
        >
          {stat.prefix && (
            <span
              className="text-3xl md:text-4xl font-black leading-none tabular-nums"
              style={{ color: ACCENT }}
              aria-hidden="true"
            >
              {stat.prefix}
            </span>
          )}
          <span
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tabular-nums tracking-tight"
            style={{ color: ACCENT }}
            aria-hidden="true"
          >
            {count}
          </span>
          {stat.suffix && (
            <span
              className="text-3xl md:text-4xl font-black leading-none"
              style={{ color: ACCENT }}
              aria-hidden="true"
            >
              {stat.suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-sm md:text-base font-bold text-[#1A1A1A] leading-snug">
          {stat.label}
        </p>

        {/* Descripción */}
        {stat.description && (
          <p className="text-xs text-[#666666] leading-relaxed">
            {stat.description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────

export default function Stats() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = React.useState(false);

  // IntersectionObserver nativo — activa los counters una sola vez
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [hasEntered]);

  return (
    <Section id="stats" background="alt" size="lg">
      <Container>
        {/* Encabezado */}
        <div className="mb-10 md:mb-14 text-center" ref={sectionRef}>
          <Reveal>
            <p
              className="text-xs font-bold tracking-[0.14em] uppercase mb-3"
              style={{ color: ACCENT }}
            >
              Números que hablan
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="stats-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#1A1A1A] leading-[1.15]"
            >
              50 años avalan cada pedido
            </h2>
          </Reveal>
        </div>

        {/* Grid de stats: 2×2 mobile, 4 en fila desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              stat={stat}
              active={hasEntered}
              index={i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
