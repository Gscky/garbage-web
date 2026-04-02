// src/components/icons/IconDescargaEstatica.tsx
// Descarga de electricidad estática — rayo con símbolo de tierra/ground eléctrico

export function IconDescargaEstatica({ className }: { className?: string }) {
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
      {/* Rayo — símbolo de electricidad estática */}
      <path d="M13 2 L7 13 L11.5 13 L11 22 L17 11 L12.5 11 Z" />
      {/* Símbolo de tierra eléctrica (ground) — 3 líneas horizontales decrecientes */}
      <line x1="4" y1="20" x2="8" y2="20" />
      <line x1="5" y1="22" x2="7" y2="22" />
      {/* Línea vertical que conecta el rayo con el ground */}
      <line x1="6" y1="18" x2="6" y2="20" />
    </svg>
  )
}
