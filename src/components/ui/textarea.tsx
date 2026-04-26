'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Props ────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

// ─── Componente ──────────────────────────────────────────────────────────

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[#1A1A1A]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          className={cn(
            'w-full min-h-[120px] px-3 py-2.5',
            'rounded-md',
            'bg-white',
            'text-sm text-[#1A1A1A]',
            'border transition-colors duration-150',
            'placeholder:text-[#9CA3AF]',
            'focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-0',
            !hasError && 'border-[#E5E5E5] focus:border-[#0EA5E9]',
            hasError && 'border-[#0EA5E9] focus:border-[#0EA5E9]',
            'resize-vertical',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {hasError && (
          <p id={`${textareaId}-error`} className="text-xs text-[#0EA5E9]" role="alert">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-[#9CA3AF]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
