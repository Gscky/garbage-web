'use client';

import * as React from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Variantes de animación ───────────────────────────────────────────────

const animationVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
};

// Variante sin movimiento (para prefers-reduced-motion)
const staticVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ─── Props ────────────────────────────────────────────────────────────────

export interface AnimatedTextProps {
  children: React.ReactNode;
  /** Variante de animación de entrada */
  variant?: 'fadeInUp' | 'blurIn' | 'slideUp';
  /** Delay en segundos antes de disparar la animación */
  delay?: number;
  /** Tag HTML a renderizar */
  as?: React.ElementType;
  className?: string;
  /** Umbral de visibilidad para dispara la animación (0-1) */
  threshold?: number;
  /** Solo anima una vez */
  once?: boolean;
}

// ─── Componente ──────────────────────────────────────────────────────────

function AnimatedText({
  children,
  variant = 'fadeInUp',
  delay = 0,
  as: Tag = 'div',
  className,
  threshold = 0.1,
  once = true,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion(Tag as React.ElementType);

  // Elige variante: sin movimiento si prefiere reduced motion
  const variants = shouldReduceMotion ? staticVariants : animationVariants[variant];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      style={delay > 0 ? { '--delay': `${delay}s` } as React.CSSProperties : undefined}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

export { AnimatedText };
