import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface LogoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nombre de la empresa (siempre requerido — se muestra si no hay imagen) */
  companyName: string;
  /** Imagen del logo (opcional) */
  logoSrc?: string;
  /** Alt del logo */
  logoAlt?: string;
}

// ─── Componente ──────────────────────────────────────────────────────────

function LogoCard({
  className,
  companyName,
  logoSrc,
  logoAlt,
  ...props
}: LogoCardProps) {
  return (
    <div
      className={cn(
        'group',
        'flex items-center justify-center',
        'h-16 px-6',
        'rounded-lg border border-[#E5E5E5]',
        'bg-white',
        'transition-all duration-200 ease-in-out',
        'hover:border-[#D4D4D4] hover:shadow-sm',
        'cursor-default select-none',
        className
      )}
      title={companyName}
      {...props}
    >
      {logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoSrc}
          alt={logoAlt ?? `Logo de ${companyName}`}
          className={cn(
            'max-h-8 max-w-[120px] w-auto object-contain',
            'filter grayscale opacity-60',
            'transition-all duration-200 ease-in-out',
            'group-hover:grayscale-0 group-hover:opacity-100'
          )}
        />
      ) : (
        <span
          className={cn(
            'text-sm font-semibold tracking-wide',
            'text-[#9CA3AF]',
            'transition-colors duration-200 ease-in-out',
            'group-hover:text-[#1A1A1A]'
          )}
        >
          {companyName}
        </span>
      )}
    </div>
  );
}

export { LogoCard };
