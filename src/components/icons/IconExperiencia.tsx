// src/components/icons/IconExperiencia.tsx
// Trofeo / medalla que representa 30+ años de experiencia

export function IconExperiencia({ className }: { className?: string }) {
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
      {/* Copa del trofeo */}
      <path d="M8 3 L16 3 L16 10 C16 13.31 14.21 16 12 16 C9.79 16 8 13.31 8 10 Z" />
      {/* Asas del trofeo */}
      <path d="M8 5 L5 5 C5 5 4 8 6.5 9.5" />
      <path d="M16 5 L19 5 C19 5 20 8 17.5 9.5" />
      {/* Pedestal — tronco */}
      <line x1="12" y1="16" x2="12" y2="19" />
      {/* Base del pedestal */}
      <path d="M9 19 L15 19 L15.5 21 L8.5 21 Z" />
      {/* Estrella / detalle dentro de la copa */}
      <path d="M12 6 L12.7 8.1 L15 8.1 L13.15 9.4 L13.85 11.5 L12 10.2 L10.15 11.5 L10.85 9.4 L9 8.1 L11.3 8.1 Z" />
    </svg>
  )
}
