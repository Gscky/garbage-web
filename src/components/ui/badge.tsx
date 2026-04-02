import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variantes ────────────────────────────────────────────────────────────

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'px-2.5 py-0.5',
    'rounded-full',
    'text-xs font-semibold tracking-wide',
    'border',
    'whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-[#F5F5F5] text-[#666666] border-[#E5E5E5]',
        ].join(' '),
        accent: [
          'bg-[rgba(230,48,0,0.08)] text-[#E63000] border-[rgba(230,48,0,0.2)]',
        ].join(' '),
        success: [
          'bg-[#F0FDF4] text-[#16A34A] border-[rgba(22,163,74,0.2)]',
        ].join(' '),
        warning: [
          'bg-[#FFFBEB] text-[#D97706] border-[rgba(217,119,6,0.2)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

// ─── Componente ──────────────────────────────────────────────────────────

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
