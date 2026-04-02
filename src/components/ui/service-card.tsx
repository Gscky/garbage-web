import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Componente SVG o ícono */
  icon: React.ReactNode;
  /** Título del servicio */
  title: string;
  /** Descripción del servicio */
  description: string;
  /** Texto del CTA opcional */
  ctaText?: string;
}

// ─── Arrow Icon ──────────────────────────────────────────────────────────

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

// ─── Componente ──────────────────────────────────────────────────────────

function ServiceCard({
  className,
  icon,
  title,
  description,
  ctaText,
  ...props
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group',
        'relative bg-white',
        'rounded-xl border border-[#E5E5E5]',
        'p-6',
        'transition-all duration-250 ease-in-out',
        // Hover: border rojo aparece
        'hover:border-[rgba(230,48,0,0.4)]',
        'hover:shadow-[0_8px_24px_rgba(230,48,0,0.10)]',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Ícono */}
      <div
        className={cn(
          'inline-flex items-center justify-center',
          'w-12 h-12 rounded-lg mb-4',
          'bg-[rgba(230,48,0,0.08)]',
          'text-[#E63000]',
          'transition-colors duration-200',
          'group-hover:bg-[rgba(230,48,0,0.14)]'
        )}
      >
        {icon}
      </div>

      {/* Contenido */}
      <h3 className="text-base font-semibold text-[#1A1A1A] mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-[#666666] leading-relaxed">
        {description}
      </p>

      {/* CTA con flecha animada */}
      {ctaText && (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 mt-4',
            'text-sm font-semibold text-[#E63000]',
          )}
        >
          <span>{ctaText}</span>
          <ArrowRight
            className={cn(
              'transition-transform duration-200 ease-in-out',
              'group-hover:translate-x-1'
            )}
          />
        </div>
      )}

      {/* Sin ctaText: flecha sutil en esquina inferior derecha */}
      {!ctaText && (
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
      )}
    </div>
  );
}

export { ServiceCard };
