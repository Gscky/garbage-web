'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const neonButtonVariants = cva(
  [
    'relative group border text-center rounded-full',
    'font-medium transition-all duration-200',
    'inline-flex items-center justify-center gap-2',
    'cursor-pointer select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        navy:
          'bg-[#0A1628] hover:bg-[#1a2d4a] text-white border-white/20',
        gold:
          'bg-white hover:bg-white/90 text-[#0A1628] border-transparent',
        outline:
          'bg-transparent border-[#0A1628]/25 text-[#0A1628] hover:border-[#0A1628] hover:bg-[#0A1628]/[0.03]',
        'ghost-dark':
          'bg-transparent border-white/40 text-white hover:border-white hover:bg-white/[0.08]',
      },
      size: {
        sm:      'px-4 py-1.5 text-xs',
        default: 'px-6 py-2 text-sm',
        lg:      'px-8 py-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'navy',
      size:    'default',
    },
  }
)

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  neon?: boolean
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, children, ...props }, ref) => {
    const isGold = variant === 'gold'
    const glow   = isGold ? 'via-white/80' : 'via-white'

    return (
      <button
        className={cn(neonButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {/* Top neon line — appears on hover */}
        <span
          className={cn(
            'absolute h-px opacity-0 group-hover:opacity-100',
            'transition-all duration-500 ease-in-out',
            'inset-x-0 top-0 w-3/4 mx-auto',
            'bg-gradient-to-r from-transparent to-transparent',
            glow,
            !neon && 'hidden'
          )}
        />

        {children}

        {/* Bottom neon line — always subtle, fades on hover */}
        <span
          className={cn(
            'absolute group-hover:opacity-30',
            'transition-all duration-500 ease-in-out',
            'inset-x-0 h-px -bottom-px w-3/4 mx-auto',
            'bg-gradient-to-r from-transparent to-transparent',
            glow,
            !neon && 'hidden'
          )}
        />
      </button>
    )
  }
)

NeonButton.displayName = 'NeonButton'

export { NeonButton, neonButtonVariants }
