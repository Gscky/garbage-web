'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  /** Si true, el label flota sobre el campo al hacer focus o cuando hay valor */
  floatingLabel?: boolean;
}

// ─── Componente ──────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      floatingLabel = false,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);

    // ── Label flotante ──
    if (floatingLabel && label) {
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder=" "
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              'peer w-full',
              'pt-5 pb-2 px-3',
              'rounded-md',
              'bg-white',
              'text-sm text-[#1A1A1A]',
              'border transition-colors duration-150',
              'placeholder-transparent',
              'focus:outline-none focus:ring-2 focus:ring-[#E63000] focus:ring-offset-0',
              !hasError && 'border-[#E5E5E5] focus:border-[#E63000]',
              hasError && 'border-[#E63000] focus:border-[#E63000]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {/* Label flotante */}
          <label
            htmlFor={inputId}
            className={cn(
              'absolute left-3 top-3.5',
              'text-sm text-[#9CA3AF]',
              'transition-all duration-150 pointer-events-none',
              // Estado flotante
              'peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#E63000]',
              'peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs',
              hasError && 'peer-focus:text-[#E63000]'
            )}
          >
            {label}
          </label>
          {/* Mensajes */}
          {hasError && (
            <p id={`${inputId}-error`} className="mt-1.5 text-xs text-[#E63000]" role="alert">
              {error}
            </p>
          )}
          {!hasError && helperText && (
            <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-[#9CA3AF]">
              {helperText}
            </p>
          )}
        </div>
      );
    }

    // ── Label estático ──
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1A1A1A]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={cn(
            'w-full h-11 px-3',
            'rounded-md',
            'bg-white',
            'text-sm text-[#1A1A1A]',
            'border transition-colors duration-150',
            'placeholder:text-[#9CA3AF]',
            'focus:outline-none focus:ring-2 focus:ring-[#E63000] focus:ring-offset-0',
            !hasError && 'border-[#E5E5E5] focus:border-[#E63000]',
            hasError && 'border-[#E63000] focus:border-[#E63000]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-[#E63000]" role="alert">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-[#9CA3AF]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
