'use client';

import * as React from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Variantes ────────────────────────────────────────────────────────────

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const reducedRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ─── Props ────────────────────────────────────────────────────────────────

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay en segundos */
  delay?: number;
  /** Umbral de visibilidad (0-1) */
  threshold?: number;
  /** Anima solo la primera vez */
  once?: boolean;
  /** Tag de contenedor */
  as?: React.ElementType;
}

// ─── Componente ──────────────────────────────────────────────────────────

function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  once = true,
  as: Tag = 'div',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion(Tag as React.ElementType);
  const variants = shouldReduceMotion ? reducedRevealVariants : revealVariants;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      {...(delay > 0 && {
        transition: {
          delay,
          duration: shouldReduceMotion ? 0.3 : 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      })}
    >
      {children}
    </MotionTag>
  );
}

export { Reveal };
