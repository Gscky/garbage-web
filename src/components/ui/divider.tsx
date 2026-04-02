import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texto opcional centrado sobre la línea */
  label?: string;
  /** Grosor de la línea */
  thickness?: 'thin' | 'default' | 'thick';
}

// ─── Componente ──────────────────────────────────────────────────────────

function Divider({ className, label, thickness = 'default', ...props }: DividerProps) {
  const lineClasses = cn(
    'flex-1 border-t border-[#E5E5E5]',
    thickness === 'thin' && 'border-t',
    thickness === 'default' && 'border-t',
    thickness === 'thick' && 'border-t-2'
  );

  if (!label) {
    return (
      <div
        role="separator"
        className={cn('w-full border-t border-[#E5E5E5]', className)}
        {...props}
      />
    );
  }

  return (
    <div
      role="separator"
      className={cn('flex items-center gap-4 w-full', className)}
      {...props}
    >
      <span className={lineClasses} />
      <span className="shrink-0 text-xs font-medium text-[#9CA3AF] tracking-wider uppercase px-2">
        {label}
      </span>
      <span className={lineClasses} />
    </div>
  );
}

export { Divider };
