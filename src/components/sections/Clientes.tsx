"use client";

import { useState } from "react";

const FOTOS_ROW1 = [
  "https://www.garbage.cl/img/p_1157.jpg",
  "https://www.garbage.cl/img/p_1141.jpg",
  "https://www.garbage.cl/img/p_1136.jpg",
  "https://www.garbage.cl/img/p_1154.jpg",
  "https://www.garbage.cl/img/p_1155.jpg",
  "https://www.garbage.cl/img/p_1113.jpg",
  "https://www.garbage.cl/img/p_941.jpg",
  "https://www.garbage.cl/img/p_951.jpg",
  "https://www.garbage.cl/img/p_879.jpg",
  "https://www.garbage.cl/img/p_884.jpg",
];

const FOTOS_ROW2 = [
  "https://www.garbage.cl/img/p_847.jpg",
  "https://www.garbage.cl/img/p_853.jpg",
  "https://www.garbage.cl/img/p_859.jpg",
  "https://www.garbage.cl/img/p_895.jpg",
  "https://www.garbage.cl/img/p_896.jpg",
  "https://www.garbage.cl/img/p_815.jpg",
  "https://www.garbage.cl/img/p_819.jpg",
  "https://www.garbage.cl/img/p_762.jpg",
  "https://www.garbage.cl/img/p_706.jpg",
  "https://www.garbage.cl/img/p_731.jpg",
];

function MarqueeStrip({
  fotos,
  direction,
  speed,
}: {
  fotos: string[];
  direction: "left" | "right";
  speed: number;
}) {
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const visibles = fotos.filter((_, i) => !errors.has(i));
  const items = [...visibles, ...visibles, ...visibles];

  const animName = `garbage-marquee-${direction}`;

  return (
    <>
      <style>{`
        @keyframes garbage-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        @keyframes garbage-marquee-right {
          from { transform: translateX(-33.33%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-3 px-3"
          style={{
            width: "max-content",
            animation: `${animName} ${speed}s linear infinite`,
          }}
        >
          {items.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative flex-shrink-0 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={src}
                alt="Trabajo realizado"
                loading="lazy"
                onError={() => setErrors((prev) => new Set(prev).add(i % visibles.length))}
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.04) saturate(0.9) brightness(0.85)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.06) 0%, transparent 60%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Clientes() {
  return (
    <section
      id="clientes"
      aria-label="Trabajos realizados — prueba social"
      className="w-full overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      {/* Encabezado */}
      <div className="container-site mb-10 text-center">
        <p
          className="text-xs font-bold uppercase tracking-[0.15em] mb-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.2em" }}
        >
          Trabajos reales
        </p>
        <h2
          className="text-2xl sm:text-3xl font-black tracking-tight"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}
        >
          Más de 500 empresas ya tienen su logo en el piso
        </h2>
        <p className="mt-3 text-sm sm:text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>
          Retail, banca, municipalidades, edificios corporativos — estos son algunos de los trabajos que fabricamos.
        </p>
      </div>

      {/* Fila 1 */}
      <div className="mb-3">
        <MarqueeStrip fotos={FOTOS_ROW1} direction="left" speed={40} />
      </div>

      {/* Fila 2 */}
      <MarqueeStrip fotos={FOTOS_ROW2} direction="right" speed={50} />

      {/* CTA */}
      <div className="container-site mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm-sans)" }}>
          ¿Querés uno para tu empresa?
        </p>
        <a
          href="#contacto"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
          style={{
            backgroundColor: "var(--accent)",
            color: "#000000",
            borderRadius: "2px",
            padding: "0.75rem 1.75rem",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
        >
          Cotiza ahora
        </a>
      </div>
    </section>
  );
}
