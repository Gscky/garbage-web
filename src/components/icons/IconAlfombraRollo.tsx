// src/components/icons/IconAlfombraRollo.tsx
// Rollo de alfombra/material — vista isométrica del rollo con el material desenrollándose

export function IconAlfombraRollo({ className }: { className?: string }) {
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
      {/* Rollo — elipse frontal */}
      <ellipse cx="7" cy="12" rx="3.5" ry="5" />
      {/* Cuerpo del rollo — cara superior */}
      <path d="M7 7 L17 7" />
      {/* Cuerpo del rollo — cara inferior */}
      <path d="M7 17 L17 17" />
      {/* Cara posterior del rollo */}
      <ellipse cx="17" cy="12" rx="3.5" ry="5" />
      {/* Material desenrollado parcialmente */}
      <path d="M17 17 L20 19 L20 22 L7 22 L7 19 L10.5 17" />
      {/* Líneas de textura en el material plano */}
      <line x1="10" y1="19.5" x2="10" y2="21.5" />
      <line x1="13" y1="19.5" x2="13" y2="21.5" />
      <line x1="16" y1="19.5" x2="16" y2="21.5" />
    </svg>
  )
}
