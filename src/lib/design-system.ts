/**
 * Design System — Garbage Limpiapiés Personalizados
 * Agente 01A — Design System Engineer
 *
 * Empresa industrial con 30+ años de trayectoria.
 * Modo: CLARO. Paleta blanca/limpia + acento rojo fuerte.
 * Sin dark mode. Sin gradientes azul-morado. Sin estética de startup.
 */

// ─── COLORS ────────────────────────────────────────────────────────────────

export const colors = {
  // Fondos
  background: '#FFFFFF',
  backgroundAlt: '#F5F5F5',
  backgroundDark: '#EBEBEB',
  surface: '#FAFAFA',
  surfaceElevated: '#FFFFFF',

  // Bordes
  border: '#E5E5E5',
  borderStrong: '#D4D4D4',
  borderSubtle: '#F0F0F0',

  // Texto
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',
  textOnAccent: '#FFFFFF',

  // Acento — Rojo industrial
  accent: '#E63000',
  accentHover: '#C42800',
  accentActive: '#A82200',
  accentDim: 'rgba(230, 48, 0, 0.08)',
  accentLight: '#FFF4F0',
  accentMedium: 'rgba(230, 48, 0, 0.15)',

  // Utilidades
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(26, 26, 26, 0.6)',
  overlayLight: 'rgba(26, 26, 26, 0.04)',

  // Estado
  success: '#16A34A',
  successLight: '#F0FDF4',
  error: '#DC2626',
  errorLight: '#FEF2F2',
  warning: '#D97706',
  warningLight: '#FFFBEB',
} as const;

export type ColorToken = keyof typeof colors;

// ─── TYPOGRAPHY ────────────────────────────────────────────────────────────

export const typography = {
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },

  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeights: {
    none: '1',
    tight: '1.2',
    snug: '1.35',
    normal: '1.5',
    relaxed: '1.65',
    loose: '2',
  },

  letterSpacings: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
    caps: '0.08em',
  },
} as const;

// ─── SPACING ───────────────────────────────────────────────────────────────

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  48: '12rem',      // 192px
  56: '14rem',      // 224px
  64: '16rem',      // 256px
} as const;

// ─── BORDER RADIUS ─────────────────────────────────────────────────────────

export const radius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

// ─── SHADOWS ───────────────────────────────────────────────────────────────

export const shadows = {
  // Sombras neutras — solidez industrial
  none: 'none',
  xs: '0 1px 2px rgba(26, 26, 26, 0.05)',
  sm: '0 1px 3px rgba(26, 26, 26, 0.08), 0 1px 2px rgba(26, 26, 26, 0.06)',
  md: '0 4px 6px rgba(26, 26, 26, 0.07), 0 2px 4px rgba(26, 26, 26, 0.06)',
  lg: '0 10px 15px rgba(26, 26, 26, 0.08), 0 4px 6px rgba(26, 26, 26, 0.05)',
  xl: '0 20px 25px rgba(26, 26, 26, 0.08), 0 10px 10px rgba(26, 26, 26, 0.04)',
  '2xl': '0 25px 50px rgba(26, 26, 26, 0.12)',

  // Sombras con acento rojo — para CTAs y elementos destacados
  accentSm: '0 4px 12px rgba(230, 48, 0, 0.18)',
  accentMd: '0 8px 24px rgba(230, 48, 0, 0.22)',
  accentLg: '0 12px 36px rgba(230, 48, 0, 0.28)',
  accentGlow: '0 0 0 3px rgba(230, 48, 0, 0.15), 0 8px 24px rgba(230, 48, 0, 0.22)',

  // Inner
  inset: 'inset 0 2px 4px rgba(26, 26, 26, 0.06)',
  insetAccent: 'inset 0 0 0 2px rgba(230, 48, 0, 0.5)',

  // Para cards con hover
  cardHover: '0 16px 32px rgba(26, 26, 26, 0.10), 0 4px 8px rgba(26, 26, 26, 0.06)',
} as const;

// ─── BREAKPOINTS ───────────────────────────────────────────────────────────

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
} as const;

// ─── Z-INDEX ───────────────────────────────────────────────────────────────

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
} as const;

// ─── TRANSITIONS ───────────────────────────────────────────────────────────

export const transitions = {
  durations: {
    instant: '0ms',
    fast: '120ms',
    normal: '200ms',
    slow: '350ms',
    slower: '500ms',
    slowest: '700ms',
  },
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Easings premium para animaciones de UI
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  // Combinaciones listas para usar
  quick: '120ms cubic-bezier(0, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: '350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ─── ANIMATIONS (Framer Motion variants) ───────────────────────────────────

export const motionVariants = {
  // Fade básico
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  },

  // Slide up — para secciones al hacer scroll
  slideUp: {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },

  // Slide in desde la izquierda
  slideInLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },

  // Scale in — para cards y modales
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
    },
  },

  // Stagger container — para listas de elementos
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },

  // CTA — entrada con leve scale spring
  ctaEntry: {
    hidden: { opacity: 0, scale: 0.92, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
} as const;

// ─── CONTAINER ─────────────────────────────────────────────────────────────

export const container = {
  maxWidth: '1280px',
  padding: {
    mobile: '1.25rem',   // 20px
    tablet: '2rem',      // 32px
    desktop: '2.5rem',   // 40px
  },
} as const;

// ─── SECTION SPACING ───────────────────────────────────────────────────────

export const sectionSpacing = {
  sm: { mobile: '3rem', desktop: '5rem' },
  md: { mobile: '4rem', desktop: '7rem' },
  lg: { mobile: '5rem', desktop: '9rem' },
  xl: { mobile: '6rem', desktop: '11rem' },
} as const;

// ─── COMPONENT TOKENS ──────────────────────────────────────────────────────

export const componentTokens = {
  // Botón principal (CTA rojo)
  buttonPrimary: {
    bg: colors.accent,
    bgHover: colors.accentHover,
    bgActive: colors.accentActive,
    text: colors.textOnAccent,
    shadow: shadows.accentMd,
    shadowHover: shadows.accentLg,
    radius: radius.md,
    paddingX: spacing[8],
    paddingY: spacing[4],
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    letterSpacing: typography.letterSpacings.wide,
    transition: transitions.normal,
  },

  // Botón secundario (outline)
  buttonSecondary: {
    bg: 'transparent',
    bgHover: colors.overlayLight,
    border: colors.borderStrong,
    borderHover: colors.accent,
    text: colors.textPrimary,
    radius: radius.md,
    paddingX: spacing[8],
    paddingY: spacing[4],
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    transition: transitions.normal,
  },

  // Card estándar
  card: {
    bg: colors.white,
    border: colors.border,
    borderHover: colors.borderStrong,
    radius: radius.xl,
    shadow: shadows.sm,
    shadowHover: shadows.cardHover,
    padding: spacing[8],
    transition: transitions.smooth,
  },

  // Input de formulario
  input: {
    bg: colors.white,
    bgFocus: colors.white,
    border: colors.borderStrong,
    borderFocus: colors.accent,
    text: colors.textPrimary,
    placeholder: colors.textMuted,
    radius: radius.md,
    paddingX: spacing[4],
    paddingY: spacing[3],
    fontSize: typography.fontSizes.base,
    shadow: shadows.xs,
    shadowFocus: '0 0 0 3px rgba(230, 48, 0, 0.12)',
    transition: transitions.quick,
  },

  // Badge / etiqueta
  badge: {
    bgAccent: colors.accentLight,
    textAccent: colors.accent,
    bgNeutral: colors.backgroundAlt,
    textNeutral: colors.textSecondary,
    radius: radius.full,
    paddingX: spacing[3],
    paddingY: spacing[1],
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    letterSpacing: typography.letterSpacings.caps,
  },

  // Stat / número destacado
  stat: {
    number: {
      fontSize: typography.fontSizes['5xl'],
      fontWeight: typography.fontWeights.black,
      lineHeight: typography.lineHeights.none,
      letterSpacing: typography.letterSpacings.tighter,
      color: colors.textPrimary,
    },
    accent: {
      color: colors.accent,
    },
    label: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.medium,
      color: colors.textSecondary,
      letterSpacing: typography.letterSpacings.wide,
    },
  },

  // Navbar
  navbar: {
    bg: colors.white,
    bgScrolled: 'rgba(255, 255, 255, 0.96)',
    backdropBlur: 'blur(12px)',
    border: colors.border,
    height: { mobile: '64px', desktop: '72px' },
    shadow: shadows.sm,
  },

  // Sección hero
  hero: {
    bg: colors.white,
    headingMaxWidth: '820px',
    headingSize: { mobile: typography.fontSizes['4xl'], desktop: typography.fontSizes['7xl'] },
    headingWeight: typography.fontWeights.black,
    headingLineHeight: typography.lineHeights.tight,
    headingLetterSpacing: typography.letterSpacings.tighter,
  },

  // Divisor de acento
  accentDivider: {
    width: '48px',
    height: '4px',
    bg: colors.accent,
    radius: radius.full,
  },
} as const;

// ─── EXPORT COMPLETO ───────────────────────────────────────────────────────

export const designSystem = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  motionVariants,
  container,
  sectionSpacing,
  componentTokens,
} as const;

export type DesignSystem = typeof designSystem;

export default designSystem;
