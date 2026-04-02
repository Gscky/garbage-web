// src/components/icons/IconAntideslizante.tsx
// Superficie con patrón antideslizante — vista de planta con grip pattern y pie/zapato sobre ella

export function IconAntideslizante({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Superficie base */}
      <rect x="2" y="14" width="20" height="6" rx="1" />
      {/* Patrón grip en la superficie — rombos */}
      <path d="M5 17 L6.5 15.5 L8 17 L6.5 18.5 Z" />
      <path d="M10 17 L11.5 15.5 L13 17 L11.5 18.5 Z" />
      <path d="M15 17 L16.5 15.5 L18 17 L16.5 18.5 Z" />
      {/* Pie/zapato estilizado sobre la superficie */}
      <path d="M8 14 C8 10 10 7 12 6 C14 7 15 9 15 11 L15 14" />
      {/* Suela del zapato */}
      <path d="M7 14 Q12 12.5 16 14" />
      {/* Indicador "no desliza" — flecha hacia arriba bloqueada */}
      <line x1="19" y1="10" x2="19" y2="6" />
      <path d="M17 8 L19 6 L21 8" />
      <line x1="17" y1="11" x2="21" y2="11" />
    </svg>
  )
}
