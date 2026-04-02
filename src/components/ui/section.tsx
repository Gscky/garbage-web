import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** ID para anclas de navegación */
  id?: string;
  /** Fondo de la sección */
  background?: 'white' | 'alt';
  /** Tamaño del padding vertical */
  size?: 'sm' | 'default' | 'lg';
  as?: React.ElementType;
}

// ─── Componente ──────────────────────────────────────────────────────────

function Section({
  className,
  id,
  background = 'white',
  size = 'default',
  as: Tag = 'section',
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        // Padding vertical responsive
        size === 'sm' && 'py-12 md:py-16',
        size === 'default' && 'py-16 md:py-24',
        size === 'lg' && 'py-20 md:py-32',
        // Fondos
        background === 'white' && 'bg-white',
        background === 'alt' && 'bg-[#F5F5F5]',
        // Ancho completo
        'w-full',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Section };
