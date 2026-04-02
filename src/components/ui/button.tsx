'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variantes con CVA ────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold tracking-wide',
    'rounded-md',
    'border border-transparent',
    'transition-all duration-200 ease-in-out',
    'cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63000] focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'relative overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[#E63000] text-white border-[#E63000]',
          'hover:bg-[#C42800] hover:border-[#C42800]',
          'hover:shadow-[0_8px_24px_rgba(230,48,0,0.32)]',
          'active:bg-[#A82200]',
        ].join(' '),
        secondary: [
          'bg-transparent text-[#E63000] border-[#E63000]',
          'hover:bg-[rgba(230,48,0,0.06)] hover:border-[#C42800] hover:text-[#C42800]',
          'active:bg-[rgba(230,48,0,0.12)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[#E63000] border-transparent',
          'hover:bg-[rgba(230,48,0,0.06)] hover:text-[#C42800]',
          'active:bg-[rgba(230,48,0,0.12)]',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ─── Spinner ─────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin h-4 w-4 shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

// ─── Componente ──────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
