import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Número o valor destacado (ej: "50+", "10.000", "98%") */
  value: string;
  /** Etiqueta descriptiva del dato */
  label: string;
  /** Descripción adicional pequeña */
  description?: string;
  /** Alineación del contenido */
  align?: 'left' | 'center';
}

// ─── Componente ──────────────────────────────────────────────────────────

function StatCard({
  className,
  value,
  label,
  description,
  align = 'left',
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className
      )}
      {...props}
    >
      {/* Valor principal en rojo */}
      <span
        className={cn(
          'text-4xl md:text-5xl font-black leading-none tracking-tight',
          'text-[#E63000]',
          'tabular-nums'
        )}
      >
        {value}
      </span>

      {/* Label */}
      <span className="text-sm font-semibold text-[#1A1A1A] tracking-wide uppercase">
        {label}
      </span>

      {/* Descripción opcional */}
      {description && (
        <span className="text-xs text-[#9CA3AF] leading-relaxed max-w-[16ch]">
          {description}
        </span>
      )}
    </div>
  );
}

export { StatCard };
