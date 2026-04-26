/**
 * Tailwind Config — Garbage Limpiapiés Personalizados
 * Agente 01A — Design System Engineer
 *
 * Extiende el tema base con todos los tokens del design system.
 * Modo: CLARO (sin darkMode activo). Empresa industrial 30+ años.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  // Sin dark mode — sitio siempre en modo claro
  // 'class' declarado pero la clase .dark nunca se aplica en el proyecto
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // ── Breakpoints ──────────────────────────────────────────────
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },

    // ── Container ────────────────────────────────────────────────
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '2.5rem',
        '2xl': '2.5rem',
      },
      screens: {
        xl: '1280px',
        '2xl': '1280px',
      },
    },

    extend: {
      // ── Colores ──────────────────────────────────────────────────
      colors: {
        // Tokens semánticos vía CSS variables (declaradas en globals.css)
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        'background-dark': 'var(--color-background-dark)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        'border-subtle': 'var(--color-border-subtle)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',

        // Acento rojo industrial
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          active: 'var(--color-accent-active)',
          dim: 'var(--color-accent-dim)',
          light: 'var(--color-accent-light)',
        },

        // Grises funcionales — paleta completa
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#9CA3AF',
          600: '#666666',
          700: '#4B4B4B',
          800: '#333333',
          900: '#1A1A1A',
          950: '#0D0D0D',
        },

        // Rojo — escala completa para flexibilidad de diseño
        red: {
          50: '#FFF4F0',
          100: '#FFE8E0',
          200: '#FFD1C2',
          300: '#FFAA8A',
          400: '#FF7A50',
          500: '#F24D1F',
          600: '#E63000',
          700: '#C42800',
          800: '#A82200',
          900: '#7A1800',
          950: '#4A0E00',
        },
      },

      // ── Tipografía ───────────────────────────────────────────────
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'sans-serif',
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          "'Courier New'",
          'monospace',
        ],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
        wider: '0.05em',
        widest: '0.1em',
        caps: '0.08em',
      },

      // ── Border Radius ────────────────────────────────────────────
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },

      // ── Sombras ──────────────────────────────────────────────────
      boxShadow: {
        xs: '0 1px 2px rgba(26, 26, 26, 0.05)',
        sm: '0 1px 3px rgba(26, 26, 26, 0.08), 0 1px 2px rgba(26, 26, 26, 0.06)',
        DEFAULT: '0 4px 6px rgba(26, 26, 26, 0.07), 0 2px 4px rgba(26, 26, 26, 0.06)',
        md: '0 4px 6px rgba(26, 26, 26, 0.07), 0 2px 4px rgba(26, 26, 26, 0.06)',
        lg: '0 10px 15px rgba(26, 26, 26, 0.08), 0 4px 6px rgba(26, 26, 26, 0.05)',
        xl: '0 20px 25px rgba(26, 26, 26, 0.08), 0 10px 10px rgba(26, 26, 26, 0.04)',
        '2xl': '0 25px 50px rgba(26, 26, 26, 0.12)',
        none: 'none',
        // Sombras con acento rojo — solo para CTAs y elementos clave
        'accent-sm': '0 4px 12px rgba(230, 48, 0, 0.18)',
        'accent-md': '0 8px 24px rgba(230, 48, 0, 0.22)',
        'accent-lg': '0 12px 36px rgba(230, 48, 0, 0.28)',
        'accent-glow': '0 0 0 3px rgba(230, 48, 0, 0.15), 0 8px 24px rgba(230, 48, 0, 0.22)',
        // Cards
        'card-hover': '0 16px 32px rgba(26, 26, 26, 0.10), 0 4px 8px rgba(26, 26, 26, 0.06)',
        // Inner
        'inner': 'inset 0 2px 4px rgba(26, 26, 26, 0.06)',
        'inner-accent': 'inset 0 0 0 2px rgba(230, 48, 0, 0.5)',
      },

      // ── Spacing extra ────────────────────────────────────────────
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
      },

      // ── Altura ───────────────────────────────────────────────────
      height: {
        'screen-90': '90vh',
        'screen-85': '85vh',
        'screen-80': '80vh',
        '18': '4.5rem',
        '22': '5.5rem',
      },

      minHeight: {
        'screen-90': '90vh',
        'screen-85': '85vh',
        '18': '4.5rem',
        '22': '5.5rem',
      },

      // ── Z-Index ──────────────────────────────────────────────────
      zIndex: {
        '-1': '-1',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
      },

      // ── Transiciones ─────────────────────────────────────────────
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '0': '0ms',
        '80': '80ms',
        '120': '120ms',
        '200': '200ms',
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      // ── Keyframes y animaciones ──────────────────────────────────
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        accentPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(230, 48, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(230, 48, 0, 0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        progressLine: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Entrada navbar al scroll
        navbarIn: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'accent-pulse': 'accentPulse 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'progress-line': 'progressLine 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'navbar-in': 'navbarIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },

      // ── Aspect ratio ─────────────────────────────────────────────
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '3/2': '3 / 2',
        '2/1': '2 / 1',
        '1/1': '1 / 1',
      },

      // ── Max width ────────────────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'prose-narrow': '45ch',
        'prose': '65ch',
        'prose-wide': '80ch',
      },
    },
  },

  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    function ({
      addUtilities,
      addVariant,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string | Record<string, string>>>) => void;
      addVariant: (name: string, definition: string) => void;
    }) {
      // Variantes para motion y accesibilidad
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');

      addUtilities({
        // Tipografía
        '.text-balance': { 'text-wrap': 'balance' },
        '.text-pretty': { 'text-wrap': 'pretty' },

        // Padding de sección estándar
        '.section-py': {
          'padding-top': '5rem',
          'padding-bottom': '5rem',
        },
        '.section-py-lg': {
          'padding-top': '7rem',
          'padding-bottom': '7rem',
        },
        '.section-py-sm': {
          'padding-top': '3rem',
          'padding-bottom': '3rem',
        },

        // Divisor con acento rojo
        '.accent-divider': {
          'width': '48px',
          'height': '4px',
          'background-color': '#E63000',
          'border-radius': '9999px',
          'display': 'block',
        },

        // Scrollbar oculto (para sliders)
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': {
          'display': 'none',
        },

        // Focus ring con acento (accesibilidad)
        '.focus-ring-accent': {
          'outline': 'none',
          'box-shadow': '0 0 0 3px rgba(230, 48, 0, 0.15)',
        },

        // Texto con gradiente acento (para headings selectivos)
        '.text-gradient-accent': {
          'background': 'linear-gradient(135deg, #E63000 0%, #FF6030 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },

        // Línea de acento encima del elemento (para secciones)
        '.border-top-accent': {
          'border-top': '3px solid #E63000',
        },
      });
    },
  ],
};

export default config;
