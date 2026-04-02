import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

// ─── Props ────────────────────────────────────────────────────────────────

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texto del testimonio */
  quote: string;
  /** Nombre de la persona */
  name: string;
  /** Cargo o rol */
  role: string;
  /** Nombre de la empresa */
  company: string;
  /** Badge de resultado (ej: "ROI +240%", "Entrega en 48hs") */
  result?: string;
  /** Imagen de avatar (opcional — si no hay, usa iniciales) */
  avatarSrc?: string;
}

// ─── Avatar con iniciales ─────────────────────────────────────────────────

function AvatarInitials({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center shrink-0',
        'w-10 h-10 rounded-full',
        'bg-[#E63000] text-white',
        'text-sm font-bold tracking-wide select-none',
        className
      )}
    >
      {initials}
    </div>
  );
}

// ─── Quote icon ───────────────────────────────────────────────────────────

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 20V12.667C0 9.556 0.889 6.944 2.667 4.833 4.444 2.722 7 1.333 10.333.667L11.333 2.333C9.444 2.889 7.889 3.944 6.667 5.5 5.444 7.056 4.778 8.778 4.667 10.667H9.333V20H0ZM13.333 20V12.667C13.333 9.556 14.222 6.944 16 4.833 17.778 2.722 20.333 1.333 23.667.667L24.667 2.333C22.778 2.889 21.222 3.944 20 5.5 18.778 7.056 18.111 8.778 18 10.667H22.667V20H13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Componente ──────────────────────────────────────────────────────────

function TestimonialCard({
  className,
  quote,
  name,
  role,
  company,
  result,
  avatarSrc,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-[#E5E5E5] p-6',
        'flex flex-col gap-4',
        'transition-all duration-250',
        'hover:border-[rgba(230,48,0,0.25)] hover:shadow-[0_8px_24px_rgba(26,26,26,0.08)]',
        className
      )}
      {...props}
    >
      {/* Ícono de comillas */}
      <QuoteIcon className="text-[rgba(230,48,0,0.2)] shrink-0" />

      {/* Texto del testimonio */}
      <blockquote className="text-[#333333] text-sm md:text-base leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Badge de resultado */}
      {result && (
        <Badge variant="accent" className="self-start">
          {result}
        </Badge>
      )}

      {/* Footer: avatar + info */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
        {avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={`Avatar de ${name}`}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <AvatarInitials name={name} />
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A] truncate">{name}</p>
          <p className="text-xs text-[#9CA3AF] truncate">
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export { TestimonialCard };
