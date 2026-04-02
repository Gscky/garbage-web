// src/components/icons/IconAlfombraPublicitaria.tsx
// Alfombra publicitaria con diseño de marca — rectángulo con bordes decorativos y diseño interior

export function IconAlfombraPublicitaria({ className }: { className?: string }) {
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
      {/* Cuerpo de la alfombra */}
      <rect x="2" y="4" width="20" height="16" rx="1" />
      {/* Marco interior decorativo */}
      <rect x="4.5" y="6.5" width="15" height="11" rx="0.5" />
      {/* Diseño central — estrella / logo estilizado */}
      <path d="M12 9 L13.2 11.4 L16 11.8 L14 13.7 L14.5 16.5 L12 15.2 L9.5 16.5 L10 13.7 L8 11.8 L10.8 11.4 Z" />
    </svg>
  )
}
