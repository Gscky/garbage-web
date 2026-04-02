import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ancho máximo del contenedor */
  size?: 'sm' | 'default' | 'lg' | 'full';
  as?: React.ElementType;
}

// ─── Componente ──────────────────────────────────────────────────────────

function Container({
  className,
  size = 'default',
  as: Tag = 'div',
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full',
        'px-4 sm:px-6 md:px-8',
        size === 'sm' && 'max-w-4xl',
        size === 'default' && 'max-w-7xl',
        size === 'lg' && 'max-w-[88rem]',
        size === 'full' && 'max-w-none',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Container };
