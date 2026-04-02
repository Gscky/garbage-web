// src/components/icons/IconLimpiapieSPersonalizado.tsx
// Limpiapiés con logo/marca grabado — vista frontal con textura de goma y logo centrado

export function IconLimpiapieSPersonalizado({ className }: { className?: string }) {
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
      {/* Cuerpo del limpiapiés — rectángulo con esquinas redondeadas */}
      <rect x="2" y="5" width="20" height="14" rx="1.5" />
      {/* Textura de cerdas — líneas verticales internas */}
      <line x1="6" y1="7.5" x2="6" y2="16.5" />
      <line x1="9" y1="7.5" x2="9" y2="16.5" />
      <line x1="12" y1="7.5" x2="12" y2="16.5" />
      <line x1="15" y1="7.5" x2="15" y2="16.5" />
      <line x1="18" y1="7.5" x2="18" y2="16.5" />
      {/* Logo/marca grabada — rombo centrado que simboliza el logo corporativo */}
      <path d="M12 8.5 L14.5 12 L12 15.5 L9.5 12 Z" />
      {/* Punto central del logo */}
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}
