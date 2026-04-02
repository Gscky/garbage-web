// src/components/icons/IconPersonalizacion.tsx
// Personalización / logo grabado — lápiz diseñando una forma con marca

export function IconPersonalizacion({ className }: { className?: string }) {
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
      {/* Superficie cuadrada (el producto) */}
      <rect x="2" y="11" width="13" height="10" rx="1" />
      {/* Diseño / logo dentro del producto — forma geométrica */}
      <path d="M5 18 L6.5 14.5 L8.5 17 L10 14 L12 18" />
      {/* Lápiz de diseño */}
      <path d="M15 2 L22 9 L12 19 L9 19 L9 16 Z" />
      {/* Punta del lápiz */}
      <path d="M15 2 L17 4" />
      {/* Línea de la mina */}
      <line x1="9" y1="16" x2="12" y2="19" />
    </svg>
  )
}
