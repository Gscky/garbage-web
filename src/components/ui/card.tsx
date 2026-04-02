import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** El border se ilumina en rojo al hacer hover */
  hoverable?: boolean;
  /** Agrega box-shadow con acento al hacer hover */
  glow?: boolean;
  /** Padding interno */
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

// ─── Componente ──────────────────────────────────────────────────────────

function Card({
  className,
  hoverable = false,
  glow = false,
  padding = 'default',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // Base
        'bg-white rounded-xl border border-[#E5E5E5]',
        'transition-all duration-250 ease-in-out',
        // Padding
        padding === 'none' && 'p-0',
        padding === 'sm' && 'p-4',
        padding === 'default' && 'p-6',
        padding === 'lg' && 'p-8',
        // Hoverable — border rojo
        hoverable && [
          'hover:border-[rgba(230,48,0,0.35)]',
          'cursor-pointer',
        ].join(' '),
        // Glow — shadow acento
        glow && hoverable && 'hover:shadow-[0_8px_24px_rgba(230,48,0,0.12)]',
        glow && !hoverable && 'shadow-[0_8px_24px_rgba(230,48,0,0.12)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Sub-componentes opcionales
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold text-[#1A1A1A] leading-snug', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-[#666666] leading-relaxed', className)} {...props} />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-4 pt-4 border-t border-[#E5E5E5]', className)} {...props} />;
}

CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
