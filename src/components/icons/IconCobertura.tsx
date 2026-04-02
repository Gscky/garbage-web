// src/components/icons/IconCobertura.tsx
// Mapa de Chile estilizado con pin de ubicación — cobertura nacional

export function IconCobertura({ className }: { className?: string }) {
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
      {/* Silueta de Chile estilizada — franja vertical larga y angosta */}
      <path d="M11 2 C11 2 9.5 3 9 5 C8.5 7 9 9 9.5 10.5 C10 12 9.5 13.5 9 15 C8.5 16.5 8 18 8.5 19.5 C9 21 10 22 11 22 C11.5 21 12 20 12 19 C12.5 17.5 13 16 13 14.5 C13.5 13 14 11.5 13.5 10 C13 8.5 13.5 7 14 5.5 C14.5 4 13.5 2.5 13 2 Z" />
      {/* Pin de ubicación centrado sobre el mapa */}
      <circle cx="17" cy="7" r="2.5" />
      <path d="M17 9.5 L17 13" />
      {/* Punto central del pin */}
      <circle cx="17" cy="7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}
