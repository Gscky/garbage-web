// src/components/icons/IconCalidad.tsx
// Escudo con checkmark — calidad garantizada

export function IconCalidad({ className }: { className?: string }) {
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
      {/* Escudo */}
      <path d="M12 2 L4 6 L4 12.5 C4 16.74 7.5 20.65 12 22 C16.5 20.65 20 16.74 20 12.5 L20 6 Z" />
      {/* Checkmark dentro del escudo */}
      <polyline points="8.5,12 11,14.5 15.5,9.5" />
    </svg>
  )
}
