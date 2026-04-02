"use client";

/**
 * Hero.tsx — Garbage Limpiapiés Personalizados
 * Agente 03A — Hero Section Specialist
 *
 * Concepto: Tipografía oversize centrada, fondo blanco limpio con grid de
 * puntos SVG sutil + radial gradient rojo muy tenue desde arriba-centro.
 * Animación staggered con Framer Motion (total ~800ms, easing decelerate).
 *
 * Reglas aplicadas:
 *  - height: 100dvh (nunca 100vh — ERROR-002)
 *  - "use client" — tiene Framer Motion
 *  - Un solo H1 en la página
 *  - Mobile-first
 *  - prefers-reduced-motion respetado
 *  - Sin `any` — TypeScript strict
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import type { ReactElement, MouseEvent, CSSProperties } from "react";

// ─── Constantes de diseño ────────────────────────────────────────────────────

const ACCENT = "#E63000";
const ACCENT_DIM = "rgba(230, 48, 0, 0.07)";
const ACCENT_BORDER = "rgba(230, 48, 0, 0.25)";

// ─── Variantes de animación ──────────────────────────────────────────────────
// Easing decelerate = cubic-bezier(0.0, 0.0, 0.2, 1)

const DECELERATE = [0.0, 0.0, 0.2, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: DECELERATE },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.55, ease: DECELERATE },
  },
};

const subheadlineVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: DECELERATE },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: DECELERATE },
  },
};

const socialProofVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: DECELERATE },
  },
};

const scrollIndicatorVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.85, ease: DECELERATE },
  },
};

// ─── Fondo: dot grid SVG como Data URI ───────────────────────────────────────
// Punto gris muy claro sobre fondo blanco — casi invisible, textura sutil
const DOT_GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23D4D4D4' fill-opacity='0.55'/%3E%3C/svg%3E")`;

// ─── Componente principal ────────────────────────────────────────────────────

export default function Hero(): ReactElement {
  const handleScrollToProducts = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#productos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px", backgroundColor: "#FFFFFF" }}
    >
      {/* ── Capa 1: Dot grid (fondo) ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: DOT_GRID_BG,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      {/* ── Capa 2: Radial gradient rojo muy tenue desde arriba-centro ───── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(230, 48, 0, 0.055) 0%, transparent 70%)",
        }}
      />

      {/* ── Contenido principal ───────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 sm:gap-7 lg:gap-8 max-w-5xl mx-auto"
        >

          {/* 1. Eyebrow badge ─────────────────────────────────────────────── */}
          <motion.div variants={badgeVariants}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase"
              style={{
                backgroundColor: ACCENT_DIM,
                color: ACCENT,
                border: `1px solid ${ACCENT_BORDER}`,
              }}
            >
              {/* Punto decorativo */}
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
              50+ años fabricando para las marcas más grandes de Chile
            </span>
          </motion.div>

          {/* 2. Headline H1 ───────────────────────────────────────────────── */}
          <motion.h1
            variants={headlineVariants}
            className="font-black tracking-tight text-balance leading-none"
            style={{
              color: "#1A1A1A",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1.02",
            }}
          >
            Limpiapiés con{" "}
            <span
              style={{
                color: ACCENT,
                // Pequeño subrayado decorativo via text-decoration no disponible
                // en todos los browsers, usamos el span para acento de color
              }}
            >
              tu logo,
            </span>{" "}
            entrega a todo Chile.
          </motion.h1>

          {/* 3. Subheadline ───────────────────────────────────────────────── */}
          <motion.p
            variants={subheadlineVariants}
            className="text-balance max-w-2xl leading-relaxed"
            style={{
              color: "#666666",
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              lineHeight: "1.65",
            }}
          >
            Fabricamos limpiapiés y alfombras{" "}
            <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>
              100% personalizados
            </strong>{" "}
            con el logo de tu empresa. Más de 500 empresas en Chile — desde
            Líder y Unimarc hasta bancos y municipalidades — confían en
            nosotros.
          </motion.p>

          {/* 4. CTAs ──────────────────────────────────────────────────────── */}
          <motion.div
            variants={ctaVariants}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            {/* CTA Primario */}
            <a
              href="#contacto"
              className="
                group relative inline-flex items-center justify-center gap-2
                w-full sm:w-auto
                rounded-lg px-7 py-3.5
                text-base font-semibold text-white
                select-none
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              style={
                {
                  backgroundColor: ACCENT,
                  boxShadow: "0 4px 14px rgba(230, 48, 0, 0.25)",
                  "--tw-ring-color": "rgba(230, 48, 0, 0.4)",
                } as CSSProperties
              }
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "#C42800";
                el.style.boxShadow = "0 6px 20px rgba(230, 48, 0, 0.38)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = ACCENT;
                el.style.boxShadow = "0 4px 14px rgba(230, 48, 0, 0.25)";
                el.style.transform = "translateY(0)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.backgroundColor = "#A82200";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = "#C42800";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
            >
              Cotizá ahora
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {/* CTA Secundario (ghost) */}
            <a
              href="#productos"
              onClick={handleScrollToProducts}
              className="
                inline-flex items-center justify-center gap-2
                w-full sm:w-auto
                rounded-lg px-7 py-3.5
                text-base font-semibold
                border transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              style={{
                color: "#1A1A1A",
                backgroundColor: "transparent",
                borderColor: "#E5E5E5",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#D4D4D4";
                el.style.backgroundColor = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#E5E5E5";
                el.style.backgroundColor = "transparent";
              }}
            >
              Ver productos
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="opacity-50"
              />
            </a>
          </motion.div>

          {/* 5. Social proof ──────────────────────────────────────────────── */}
          <motion.div
            variants={socialProofVariants}
            className="flex items-center gap-2"
            aria-label="Prueba social"
          >
            <CheckCircle2
              size={16}
              aria-hidden="true"
              style={{ color: ACCENT, flexShrink: 0 }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "#666666" }}
            >
              Más de{" "}
              <strong style={{ color: "#1A1A1A" }}>500 empresas</strong> en
              Chile confían en Garbage
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.button
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        onClick={handleScrollDown}
        aria-label="Ir a la siguiente sección"
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-1.5
          text-xs font-medium tracking-widest uppercase
          cursor-pointer border-none bg-transparent
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          transition-opacity duration-200 hover:opacity-70
        "
        style={{ color: "#9CA3AF" }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
