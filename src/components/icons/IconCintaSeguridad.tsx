// src/components/icons/IconCintaSeguridad.tsx
// Cinta de seguridad industrial — rollo de cinta con patrón de franjas diagonales

export function IconCintaSeguridad({ className }: { className?: string }) {
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
      {/* Rollo de cinta — cilindro visto de frente */}
      <rect x="4" y="9" width="16" height="6" rx="1" />
      {/* Agujero central del rollo */}
      <circle cx="12" cy="12" r="2" />
      {/* Franjas diagonales de advertencia dentro del rollo */}
      <line x1="7" y1="9" x2="5" y2="15" />
      <line x1="10" y1="9" x2="8" y2="15" />
      {/* Extremos del rollo — profundidad */}
      <path d="M4 9 Q4 7 6 7 L18 7 Q20 7 20 9" />
      <path d="M4 15 Q4 17 6 17 L18 17 Q20 17 20 15" />
      {/* Lengüeta de la cinta despegándose */}
      <path d="M18 10.5 L22 8 L22 9.5 L18 12" />
    </svg>
  )
}
