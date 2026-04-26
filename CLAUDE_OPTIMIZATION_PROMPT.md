# PROMPT MAESTRO — Optimización completa de Garbage Web

## Contexto del proyecto

Eres un experto en desarrollo web, SEO técnico y conversión B2B. Tienes acceso al código fuente completo de **garbage-web-three.vercel.app**, un sitio Next.js 14 (App Router) + Tailwind CSS + Framer Motion + shadcn/ui.

**La empresa:** Garbage — fabrica limpiapiés y alfombras personalizadas con logo para empresas en Chile. **30 años de trayectoria**, clientes como Líder, Unimarc, Paris, BancoEstado, municipalidades. Stack: Next.js 14, Tailwind, Framer Motion, Resend (formulario), Vercel.

**⚠️ IMPORTANTE — número de años:** Usar siempre **30 años** en todo el sitio (no 50+). Actualizar `src/lib/copy.ts` y todos los componentes que mencionen años de experiencia.

**Objetivo:** Rehacer el sitio para que:
1. Domine el ranking en Google para búsquedas de limpiapiés personalizados en Chile
2. Convierta muchísimo más visitantes en leads (cotizaciones)
3. Sea **visualmente impactante, entretenido pero muy serio** — que transmita 30 años de trayectoria y autoridad absoluta en el mercado
4. Aplaste a la competencia: solarfilm.cl (posición #1 Google), graficaparaoficinas.cl (#2), interfilm.cl (#3), doormatt.cl (#4) — Garbage **no aparece actualmente** en Google para estas búsquedas

---

## ANÁLISIS DE LA COMPETENCIA (ya analizado)

### Análisis visual directo de competidores (screenshots revisados):

**kr.cl (Comercial KR) — competidor con paleta de colores visualmente destacada:**
- Muestran una **grilla de 22 colores** con fotos reales de la textura del material: Lila-Morado, Burdeo, Rojo, Café, Rosado Claro, Khaky, Gris Claro, Gris Oscuro, Gris Plata, Azul Claro, Azul Oscuro, Celeste, Verde Fuji, Verde Oscuro, Verde Limón, Negro, Dorado, Amarillo, Salmon-Naranja, Blanco, Calipso, Fucsia
- Aclaran en su header: *"Colores Únicos de Fábrica, Sin Variedad de Pantone. Los logos No son Pintados, se realiza Troquelado y Fundido de Filamentos"* — esto educa al comprador y elimina malentendidos
- Se posicionan como "empresa pionera en Chile, 45 años"
- **Lo que Garbage debe superar:** Hacer esta sección más moderna, visual e interactiva

**intermat.cl — mejor página de cotización del mercado:**
- Tienen un **diagrama visual de medidas** (ANCHO × LARGO/ALTO) con flechas sobre imagen del limpiapiés — muy útil para el comprador
- Galería de logos de marcas famosas aplicados al material (Líder, Toyota, Hites, HP, Peugeot, McDonald's)
- Formulario de cotización con campos: Nombre, Empresa, RUT Empresa, Email, Teléfono, Medidas
- **Upload de logo directamente en el formulario** ("Choose File") — enorme para conversión
- Sección "Consideraciones de fabricación" con 6 puntos técnicos que educan al cliente
- Footer profesional con horarios, redes sociales (Facebook, Instagram, LinkedIn)
- **Lo que Garbage debe superar:** Hacer todo esto más visual, más moderno y con mejor UX

**Resultados Google para "limpiapies alto trafico personalizado":**
- #1: solarfilm.cl — "Limpiapiés alto tráfico FAS antideslizante 14mm, capacidad 1M-1.2M personas. Logo personalizado ✓ Despacho gratuito ✓ Borde termofundido" — Rating 5★
- #2: graficaparaoficinas.cl — "Limpiapiés Personalizados con Logo, resistir medio y alto tráfico"
- #3: interfilm.cl — "Limpiapiés PVC con Logo InterMat"
- #4: doormatt.cl — "Limpiapiés Personalizados PVC"
- **Garbage: NO aparece**. El objetivo es entrar al top 3 en 90 días con SEO técnico bien hecho.

**limpiapie.cl:**
- Destaca tecnología JET PRINT para impresión de logos
- Proceso de aprobación de mockup antes de producir (gran eliminador de objeciones)
- Envío gratis a todo Chile visible en hero
- Testimonios de clientes con nombre y ciudad

**doormatt.cl:**
- Anti-fatigue flooring con claims específicos
- Categorías claras con CTA "VER PRODUCTO"
- WhatsApp integrado

### Ventajas competitivas de Garbage que hay que amplificar:
- **30+ años** (NADIE tiene más trayectoria)
- **Fabricación 100% propia** en Santiago (no intermediario)
- **500+ empresas clientes** incluyendo las más grandes del país
- **Clientes de primer nivel**: Líder, Unimarc, Paris, BancoEstado, Codelco, Teletón
- **Respuesta cotización <24h**

---

## DIAGNÓSTICO DEL SITIO ACTUAL

### Problemas críticos identificados:

1. **Secciones existentes no usadas**: El código ya tiene componentes para `Clientes`, `Productos`, `Proceso`, `Stats`, `CTAFinal` — pero NO están incluidos en `page.tsx`. Hay trabajo ya hecho que no se muestra.

2. **SEO técnico incompleto**:
   - Sin Schema.org (LocalBusiness, Product, BreadcrumbList)
   - Sin sitemap.xml dinámico
   - Sin robots.txt
   - Sin canonical URL
   - Sin OG image (og:image vacío)
   - Sin JSON-LD estructurado
   - Meta keywords genéricas — faltan long-tails

3. **Conversión débil**:
   - No hay barra sticky de CTA mientras se hace scroll
   - No hay testimonios/reseñas de clientes
   - No hay sección "Personaliza tu alfombra" con pasos visuales
   - No hay FAQ (ayuda al SEO y elimina objeciones)
   - No hay sección de Clientes con logos visibles (ya hay componente pero no se usa)
   - El formulario de contacto no tiene validación visual amigable en tiempo real

4. **Diseño y UX**:
   - La galería no filtra por industria/tipo
   - No hay efecto hover con zoom en las fotos de trabajos
   - Sin sección de proceso visual step-by-step (componente existe pero no se incluye)

---

## TAREAS A IMPLEMENTAR (en este orden de prioridad)

---

### TAREA 1 — Activar todas las secciones existentes en page.tsx

Edita `src/app/page.tsx` para incluir TODAS las secciones en el orden correcto:

```
Header
Hero
Clientes (logos de marcas conocidas)
Productos (6 tipos de productos)
PorQueElegirnos
Stats (números: 50+, 500+, 15+, 100%)
Proceso (4 pasos: Nos contactás → Cotización → Aprobás diseño → Fabricamos)
Galeria
CTAFinal (CTA de cotización con garantía)
Contacto
Footer
WhatsApp flotante
```

Importa los componentes dinámicamente con `next/dynamic` para los que no estén en fold. Asigna el atributo `id` y `aria-labelledby` a cada sección para navegación y accesibilidad.

---

### TAREA 2 — SEO técnico completo

#### 2a. Metadata avanzada en `src/app/layout.tsx`

Reemplaza el metadata actual con uno completo:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://garbage-web-three.vercel.app'),
  title: {
    default: 'Garbage | Limpiapiés Personalizados con Logo para Empresas en Chile',
    template: '%s | Garbage'
  },
  description: 'Fabricamos limpiapiés y alfombras personalizadas con tu logo para empresas de todo Chile. +30 años de experiencia. Líder, Unimarc, Paris, BancoEstado confían en nosotros. Cotización en 24h.',
  keywords: [
    'limpiapiés personalizados Chile',
    'limpiapiés con logo empresa',
    'alfombras corporativas personalizadas',
    'limpiapiés publicitarios Santiago',
    'alfombras con logo retail',
    'limpiapiés para retail',
    'limpiapiés para bancos Chile',
    'alfombras antideslizantes empresas',
    'fabricante limpiapiés Santiago',
    'limpiapiés a medida Chile',
    'alfombras publicitarias empresas',
    'proveedor limpiapiés corporativo Chile'
  ],
  authors: [{ name: 'Garbage' }],
  creator: 'Garbage',
  publisher: 'Garbage',
  alternates: {
    canonical: 'https://garbage-web-three.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://garbage-web-three.vercel.app',
    siteName: 'Garbage — Limpiapiés Personalizados',
    title: 'Limpiapiés Personalizados con Logo para Empresas | Garbage Chile',
    description: '+30 años fabricando limpiapiés y alfombras personalizadas para las empresas más grandes de Chile. Cotización en 24h. Despacho a todo el país.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Garbage — Limpiapiés Personalizados con Logo para Empresas en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limpiapiés Personalizados con Logo | Garbage Chile',
    description: '+30 años fabricando limpiapiés para las marcas más grandes de Chile.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'TU_CODIGO_GOOGLE_SEARCH_CONSOLE', // Descomentar cuando tengan GSC
  },
}
```

#### 2b. JSON-LD Schema.org en `src/app/layout.tsx`

Agrega el siguiente script dentro del `<body>` usando un componente Script de Next.js:

```typescript
// Agregar import al inicio:
import Script from 'next/script'

// Dentro del layout, antes del cierre del </body>:
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://garbage-web-three.vercel.app/#organization',
      name: 'Garbage',
      description: 'Fabricamos limpiapiés y alfombras personalizadas con logo para empresas de todo Chile. Más de 30 años de experiencia.',
      url: 'https://garbage-web-three.vercel.app',
      telephone: ['+56226836012', '+56226841460', '+56996998344', '+56994444244'],
      email: 'ventas@garbage.cl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'La Raza #1695',
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -33.4489,
        longitude: -70.6693,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Chile',
      },
      priceRange: '$$',
      image: 'https://garbage-web-three.vercel.app/og-image.jpg',
      sameAs: [],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Productos Garbage',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Limpiapiés Personalizados con Logo',
              description: 'Limpiapiés fabricados a medida con el logo de tu empresa. Colores personalizados, medidas exactas. Ideal para retail, bancos y oficinas.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombras Publicitarias',
              description: 'Alfombras de alto impacto visual con tu marca para entradas y pasillos de alto tráfico.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alfombras Antideslizantes',
              description: 'Protección para clientes y colaboradores en zonas de riesgo. Cumplen normativas de seguridad.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://garbage-web-three.vercel.app/#website',
      url: 'https://garbage-web-three.vercel.app',
      name: 'Garbage',
      description: 'Limpiapiés Personalizados con Logo para Empresas en Chile',
      inLanguage: 'es-CL',
    },
  ],
}

// Dentro del JSX del body:
<Script
  id="json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

#### 2c. Crear `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://garbage-web-three.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

#### 2d. Crear `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://garbage-web-three.vercel.app/sitemap.xml',
  }
}
```

#### 2e. Crear imagen OG

Genera el archivo `public/og-image.jpg` usando Next.js ImageResponse o simplemente crea `src/app/opengraph-image.tsx`:

```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Garbage — Limpiapiés Personalizados con Logo para Empresas en Chile'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 900, color: '#E63000', marginBottom: 24 }}>
          GARBAGE
        </div>
        <div style={{ fontSize: 36, color: '#FFFFFF', textAlign: 'center', maxWidth: 800 }}>
          Limpiapiés Personalizados con Logo para Empresas en Chile
        </div>
        <div style={{ fontSize: 24, color: '#999', marginTop: 32 }}>
          30+ años · 500+ empresas clientes · Fabricación 100% propia
        </div>
      </div>
    ),
    { ...size }
  )
}
```

---

### TAREA 3 — Nueva sección: "Personaliza tu alfombra" (paso a paso visual)

Crea `src/components/sections/Personalizador.tsx` — una sección interactiva con 3 pasos visuales que guía al visitante al formulario de contacto. Esta sección es clave para conversión y diferenciación de la competencia.

```tsx
// Estructura de la sección (implementa con Framer Motion para animaciones):

// Eyebrow: "Proceso simple"
// Headline: "De tu logo a tu entrada, en 4 pasos"
// Subheadline: "Sin burocracia. Sin vueltas. Te acompañamos en todo el proceso."

// Pasos visuales con iconos, número grande y descripción:
// Paso 1: "Nos contás qué necesitás"
//   - Icono: mensaje/formulario
//   - "Completás el formulario o nos llamás. Nos decís el tipo, medidas, cantidad y si llevarás logo."
//
// Paso 2: "Recibís cotización en <24h"
//   - Icono: reloj / checklist
//   - "Te enviamos un presupuesto detallado sin cobros ocultos. Respondemos en menos de 24 horas hábiles."
//
// Paso 3: "Aprobás el diseño antes de producir"
//   - Icono: lápiz / aprobación
//   - "Si el pedido lleva logo, te enviamos una prueba visual para que des tu visto bueno. Nada entra a producción sin tu aprobación."
//
// Paso 4: "Fabricamos y despachamos a todo Chile"
//   - Icono: fábrica / camión
//   - "Producimos en nuestra planta en Santiago y coordinamos el despacho a donde nos indiques."

// CTA final de la sección: botón grande "Cotizar ahora →" que lleva a #contacto
// Bajo el CTA: "Sin compromiso de compra · Respondemos en <24h hábiles"
```

**Diseño:** Usa un layout de steps horizontales en desktop, vertical en mobile. Línea conectora entre pasos. Fondo blanco con acento rojo (#E63000) en los números de paso.

Agregar esta sección en `page.tsx` entre `PorQueElegirnos` y `Galeria`.

---

### TAREA 4 — Nueva sección: Testimonios de clientes

Crea `src/components/sections/Testimonios.tsx`. Esta sección es crítica para la conversión B2B — elimina la objeción "¿son confiables?"

```tsx
// Estructura:
// Eyebrow: "Qué dicen nuestros clientes"
// Headline: "500+ empresas no pueden equivocarse"

// Testimonios (inventar testimonios realistas basados en el tipo de cliente real de Garbage):
const testimonios = [
  {
    texto: "Llevamos más de 10 años trabajando con Garbage para todos nuestros locales. La calidad es consistente, los tiempos de entrega se cumplen y el proceso de personalización es impecable.",
    autor: "Jefa de Compras",
    empresa: "Cadena de retail, Santiago",
    industria: "Retail",
  },
  {
    texto: "Necesitábamos limpiapiés con nuestro logo para la apertura de 5 nuevas sucursales. Garbage cumplió en tiempo y forma, con un resultado visual que superó nuestras expectativas.",
    autor: "Gerente de Operaciones",
    empresa: "Banco, Chile",
    industria: "Banca",
  },
  {
    texto: "El proceso de cotización fue muy ágil. En 24 horas teníamos presupuesto y en menos de 2 semanas los limpiapiés instalados en todas nuestras instalaciones. Recomendados.",
    autor: "Encargado de Infraestructura",
    empresa: "Municipalidad, Región Metropolitana",
    industria: "Sector público",
  },
]

// Diseño: cards con comillas grandes, texto del testimonio, nombre/cargo/empresa
// Carrusel en mobile, 3 columnas en desktop
// Fondo gris claro (#F5F5F5)
```

Agregar en `page.tsx` entre `Proceso` y `Galeria`.

---

### TAREA 5 — Barra sticky de CTA (StickyBar)

Crea `src/components/ui/StickyBar.tsx` — una barra fija que aparece al hacer scroll hacia abajo, con CTA de cotización. Desaparece cuando el usuario llega a la sección de Contacto.

```tsx
'use client'
import { useState, useEffect } from 'react'

// Lógica:
// - Detectar scroll position con useEffect
// - Mostrar la barra cuando scroll > 600px
// - Ocultar cuando el usuario llega a la sección #contacto (usar IntersectionObserver)
// - Animación suave de entrada/salida con Framer Motion

// Contenido de la barra:
// Izquierda: "¿Listo para cotizar?" (desktop) | (vacío en mobile)
// Centro: "Limpiapiés personalizados con tu logo — respuesta en <24h"
// Derecha: Botón "Cotizar ahora →" rojo que lleva a #contacto

// Estilos:
// - Fondo: blanco con sombra suave
// - Botón: rojo #E63000, texto blanco, hover: #C42800
// - Fijo al bottom en mobile, al top en desktop
// - z-index alto para estar sobre todo
```

Importar y agregar en `src/app/page.tsx` al final, junto con el botón de WhatsApp.

---

### TAREA 6 — Mejoras al componente Hero

Edita `src/components/sections/Hero.tsx` con estas mejoras de conversión:

**Copy mejorado con keywords SEO:**
```
Eyebrow: "🏭 Fabricación propia · 30+ años · Despacho a todo Chile"
Headline principal: "Limpiapiés con tu logo, para las empresas que no transan en calidad"
Subheadline: "Fabricamos limpiapiés y alfombras personalizadas para empresas de retail, banca, municipalidades y oficinas corporativas. Líder, Unimarc, Paris y 500+ empresas ya confían en nosotros."
CTA primario: "Cotizar ahora — respuesta en <24h"
CTA secundario: "Ver trabajos realizados"
Social proof badge: "✓ Sin compromiso de compra · ✓ Entregamos a todo Chile · ✓ Aprobás diseño antes de producir"
```

**Mejoras de UX:**
- Agregar debajo del hero 4 íconos horizontales rápidos (trust bar):
  `🏭 Fabricación propia | 📅 30+ años | 🚚 Despacho nacional | ⚡ Cotización en <24h`

---

### TAREA 7 — Mejoras al componente Galeria

Edita `src/components/sections/Galeria.tsx`:

1. **Filtros por industria** — Agrega botones de filtro encima de la galería:
   - Todos | Retail | Banca | Municipalidades | Oficinas corporativas | Supermercados

2. **Hover con efecto** — Al pasar el mouse sobre una foto, mostrar un overlay suave con el nombre de la empresa/industria.

3. **Lazy loading** — Asegúrate de que todas las imágenes de la galería usen `loading="lazy"` y el componente `<Image>` de Next.js con `sizes` apropiados.

4. **Headline mejorado con keyword:**
```
Eyebrow: "Más de 500 proyectos entregados"
Headline: "Trabajos realizados para las marcas más grandes de Chile"
```

---

### TAREA 8b — Nueva sección: "Colores disponibles" (paleta visual interactiva)

Crea `src/components/sections/ColoresDisponibles.tsx` — una sección visual que muestre la paleta de colores del material disponible, al estilo de una tienda premium pero seria.

**Contexto:** Los competidores como kr.cl tienen una grilla básica de colores. Garbage debe hacerlo mejor: visual, moderno, con hover effects elegantes.

```tsx
// Eyebrow: "Personalización total"
// Headline: "Elige el color de tu limpiapiés"
// Subheadline: "Fabricamos con colores únicos de fábrica. Los logos no son pintados: se realiza un trabajo de troquelado y fundido de filamentos continuos de vinilo."

const colores = [
  { id: 1,  nombre: 'Lila / Morado',    hex: '#6B4C8A' },
  { id: 2,  nombre: 'Burdeo',           hex: '#6B1A2E' },
  { id: 3,  nombre: 'Rojo',             hex: '#CC1B1B' },
  { id: 4,  nombre: 'Café',             hex: '#6B3A1F' },
  { id: 5,  nombre: 'Rosado Claro',     hex: '#E8A0B0' },
  { id: 6,  nombre: 'Khaky',            hex: '#8B7355' },
  { id: 7,  nombre: 'Gris Claro',       hex: '#9E9E9E' },
  { id: 8,  nombre: 'Gris Oscuro',      hex: '#555555' },
  { id: 9,  nombre: 'Gris Plata',       hex: '#B8B8B8' },
  { id: 10, nombre: 'Azul Claro',       hex: '#3A7DC9' },
  { id: 11, nombre: 'Azul Oscuro',      hex: '#1A2B6B' },
  { id: 12, nombre: 'Celeste',          hex: '#5BC8F0' },
  { id: 13, nombre: 'Verde Fuji',       hex: '#2D7A3A' },
  { id: 14, nombre: 'Verde Oscuro',     hex: '#1A4A1F' },
  { id: 15, nombre: 'Verde Limón',      hex: '#8BC34A' },
  { id: 16, nombre: 'Negro',            hex: '#1A1A1A' },
  { id: 17, nombre: 'Dorado',           hex: '#C9A227' },
  { id: 18, nombre: 'Amarillo',         hex: '#F5D800' },
  { id: 19, nombre: 'Salmon / Naranja', hex: '#E8632A' },
  { id: 20, nombre: 'Blanco',           hex: '#F5F5F5', border: true },
  { id: 21, nombre: 'Calipso',          hex: '#00BCD4' },
  { id: 22, nombre: 'Fucsia',           hex: '#E91E8C' },
]

// Diseño:
// - Grid de 4 columnas en desktop, 3 en tablet, 2 en mobile
// - Cada color: círculo grande (80px) con el color real + nombre debajo
// - Al hover: el círculo escala ligeramente con sombra + tooltip "Color #XX"
// - Animación de entrada escalonada con Framer Motion (cada círculo aparece con delay)
// - Fondo de la sección: #F5F5F5 (gris muy suave)
```

**Nota importante (agregar como texto debajo de la grilla):**
> "Los colores son únicos de fábrica y no tienen variedad de Pantone. No fabricamos con degradés ni colores especiales. ¿Necesitás combinar colores para tu logo? Escríbenos y te asesoramos."

**CTA al final de la sección:** Botón "Cotizar con mi color →" que lleva a #contacto.

Agregar esta sección en `page.tsx` entre `Productos` y `PorQueElegirnos`.

---

### TAREA 8c — Diagrama de medidas en la sección Contacto

Dentro de `src/components/sections/Contacto.tsx`, agrega un bloque visual **antes del formulario** que muestre:

```tsx
// Diagrama SVG o ilustración simple que muestre:
// - Un rectángulo representando el limpiapiés visto desde arriba
// - Flecha horizontal con label "ANCHO" (con símbolo ↔)
// - Flecha vertical con label "LARGO" (con símbolo ↕)
// - Texto: "Indicá las medidas en cm o metros al cotizar"

// Debajo del diagrama, 3 medidas sugeridas comunes (chips/badges):
// "60 × 90 cm (estándar entrada)" | "80 × 120 cm (alta afluencia)" | "Medida personalizada"
// Al hacer click en uno de los chips, pre-completar el campo "Detalle del pedido" con esa medida
```

**Consideraciones de fabricación** — agrega este bloque de texto colapsable (accordion) debajo del diagrama:

```
Consideraciones de fabricación:
1. No fabricamos con colores degradé ni Pantone — solo colores planos según nuestra carta.
2. Los logos no son pintados: se trabajan por troquelado y fundido de filamentos de vinilo.
3. Tamaño mínimo para textos o símbolos: 5 cm de alto × 1 cm de ancho.
4. Todos nuestros limpiapiés se fabrican a medida.
5. Para la cotización necesitamos: medidas (ancho × largo), cantidad y el archivo de tu logo (JPG, PNG, PDF o AI).
6. Diseños complejos o con mucho detalle pueden requerir ajustes previos — nuestro equipo te asesora.
```

---

### TAREA 8 — Mejoras al componente Contacto

Edita `src/components/sections/Contacto.tsx` y `src/components/forms/ContactForm.tsx`:

1. **Headline con urgencia y keyword:**
```
Eyebrow: "Cotización sin compromiso"
Headline: "¿Necesitás limpiapiés personalizados? Hablemos hoy."
Subheadline: "Completá el formulario y te respondemos en menos de 24 horas hábiles. Sin compromiso de compra."
Garantía visual: "🔒 Tu información es confidencial · ⚡ Respuesta en <24h · ✓ Sin compromiso"
```

2. **Upload de logo en el formulario** — Agrega un campo de carga de archivo después del campo de "Detalle del pedido":

```tsx
// Campo nuevo en el formulario:
{
  id: 'logo',
  label: 'Adjuntá tu logo (opcional)',
  descripcion: 'Formatos aceptados: JPG, PNG, PDF, AI, EPS — máx. 10 MB',
  tipo: 'file' as const,
  accept: '.jpg,.jpeg,.png,.pdf,.ai,.eps',
  placeholder: 'Arrastrá tu logo aquí o hacé click para seleccionar',
}

// Estilo del campo de upload:
// - Zona de drag & drop con borde punteado rojo (#E63000) cuando se arrastra un archivo
// - Ícono de carga centrado + texto instructivo
// - Al seleccionar archivo: mostrar nombre del archivo + ícono de check verde
// - En la API route (src/app/api/contact/route.ts): incluir el archivo como attachment en el email vía Resend
```

3. **Validación en tiempo real** — Agrega feedback visual (verde/rojo) en cada campo al perder el foco.

4. **WhatsApp prominente** — Agrega un botón secundario grande de WhatsApp justo encima del formulario:
```
"¿Preferís hablar directo? → WhatsApp"
href: "https://wa.me/56996998344?text=Hola%2C%20quiero%20cotizar%20limpiapiés%20personalizados%20para%20mi%20empresa"
```

4. **Indicador de estado del envío** — Loading spinner en el botón de envío mientras se procesa.

---

### TAREA 9 — Performance y Core Web Vitals

#### 9a. Optimización de imágenes
- Verifica que TODAS las imágenes usen el componente `<Image>` de Next.js
- Agrega `priority` solo al hero image (above the fold)
- Usa `sizes` apropiados para cada contexto
- Asegúrate de que el `next.config.mjs` tenga configurados los dominios de imágenes si las hay externas

#### 9b. next.config.mjs — agregar configuraciones de performance:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
    {
      source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
}

export default nextConfig
```

#### 9c. Preconnect y DNS prefetch en layout.tsx:
Dentro del `<head>`, agregar:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

---

### TAREA 10 — Nueva sección FAQ (SEO + conversión)

Crea `src/components/sections/FAQ.tsx` — acordeón con preguntas frecuentes. Esta sección captura búsquedas de cola larga en Google y elimina objeciones del comprador B2B.

```tsx
const faqs = [
  {
    pregunta: "¿Cuánto tiempo demora la fabricación de limpiapiés personalizados?",
    respuesta: "El tiempo de producción varía según la cantidad y complejidad del diseño. Para pedidos estándar, el plazo típico es de 7 a 15 días hábiles desde que aprobás el diseño. Para volúmenes grandes o pedidos urgentes, consúltanos directamente.",
  },
  {
    pregunta: "¿Cuál es la cantidad mínima de pedido?",
    respuesta: "No exigimos cantidades mínimas fijas. Fabricamos desde unidades individuales hasta pedidos de cientos de unidades para grandes cadenas. Contáctanos y te asesoramos según tu necesidad específica.",
  },
  {
    pregunta: "¿Puedo ver cómo quedará el limpiapiés antes de fabricarlo?",
    respuesta: "Sí. Antes de iniciar la producción te enviamos una prueba visual con tu diseño aplicado. Ningún pedido con logo entra a fabricación sin tu aprobación previa.",
  },
  {
    pregunta: "¿Entregan a regiones fuera de Santiago?",
    respuesta: "Sí, despachamos a todas las regiones de Chile, desde Arica hasta Punta Arenas. Coordinamos el envío directamente a la dirección que nos indiques.",
  },
  {
    pregunta: "¿Qué materiales usan para los limpiapiés personalizados?",
    respuesta: "Trabajamos principalmente con PVC rizado de alta durabilidad, ideal para zonas de alto tráfico. También fabricamos con materiales textiles, vinílicos y compuestos según el uso específico. Te recomendamos el material más adecuado para tu instalación.",
  },
  {
    pregunta: "¿Cómo envío mi logo para el limpiapiés?",
    respuesta: "Aceptamos archivos en formatos vectoriales (AI, EPS, PDF vectorial) o de alta resolución (PNG, JPG). Si no tenés el archivo vectorial de tu logo, nuestro equipo puede ayudarte a digitalizarlo.",
  },
  {
    pregunta: "¿Cuánto cuesta un limpiapiés personalizado con logo?",
    respuesta: "El precio depende del material, tamaño, cantidad y complejidad del diseño. Para darte un presupuesto exacto, completá el formulario o llámanos — te respondemos en menos de 24 horas con una cotización detallada sin compromiso.",
  },
]

// Diseño: accordion con animación suave, ícono + / × que rota
// Fondo blanco, borde sutil en las filas
// Schema.org FAQPage markup incluido (agrega JSON-LD de FAQPage al componente)
```

**Importante:** Agrega el schema markup FAQPage dentro del componente usando un `<script type="application/ld+json">`.

Agrega esta sección en `page.tsx` entre `Testimonios` y `Galeria`.

---

### TAREA 11 — Mejoras al Header y navegación

Edita `src/components/layout/Header.tsx`:

1. **CTA en el header**: El botón "Cotizar ahora" debe ser siempre visible en desktop y tener diseño rojo prominente.

2. **Sticky con cambio de estilo**: Al hacer scroll, el header cambia de fondo transparente a blanco sólido con sombra suave.

3. **Links actualizados** con las nuevas secciones:
```
Productos | Por qué elegirnos | Proceso | Trabajos | FAQ | Contacto
```

---

### TAREA 12 — Actualizar copy completo: años, tono y keywords SEO

#### 12a. Corrección de años en todo el codebase

Buscar y reemplazar TODAS las menciones de "50+" o "30 años" por **"30 años"** en:
- `src/lib/copy.ts`
- `src/app/layout.tsx` (metadata)
- `src/app/page.tsx`
- Todos los componentes en `src/components/sections/`
- `src/app/opengraph-image.tsx`

También actualizar el footer tagline de:
> "Limpiapiés personalizados para las empresas de Chile, desde 1994."

A:
> "30 años fabricando limpiapiés para las empresas de Chile."

#### 12b. Directiva de diseño y tono — MUY IMPORTANTE

El sitio debe transmitir estas tres cosas simultáneamente:
1. **Visual e impactante** — que llame la atención, use animaciones elegantes, que cada sección tenga un momento "wow"
2. **Entretenido** — que sea agradable de scrollear, con microinteracciones, los colores del material son visuales, la galería debe invitar
3. **Serio y con autoridad** — 30 años no se improvisan. Tipografía bold, espaciado generoso, no hay lugar para el desorden

**Principios de diseño a aplicar:**
- Números grandes (35, 500+, 15+) en tipografía display con peso 900 — que impacten visualmente
- Usar el color rojo (#E63000) con criterio: solo para CTAs y acentos, no saturar
- Secciones alternadas: blanco ↔ gris claro (#F5F5F5) — nunca dos seguidas del mismo fondo
- Animaciones: entradas al hacer scroll (Framer Motion `whileInView`), no autoreproducidas
- Las fotos reales del producto son el mejor activo — usarlas grandes, no pequeñas
- La sección de colores debe ser la más "visual y entretenida" del sitio
- La sección de stats (30 años, 500+ empresas) debe ser el momento más "serio y contundente"

#### 12c. Keywords en copy

Las keywords objetivo son:

**Primarias (alta intención comercial):**
- "limpiapiés personalizados Chile"
- "limpiapiés con logo empresa"
- "alfombras corporativas personalizadas"
- "limpiapiés publicitarios Santiago"

**Long-tail (baja competencia, alta intención):**
- "limpiapiés para retail Chile"
- "alfombras con logo para locales comerciales"
- "proveedor limpiapiés corporativo Santiago"
- "fabricante limpiapiés personalizados Chile"
- "limpiapiés para bancos y oficinas"
- "cotizar limpiapiés personalizados Chile"

Usa estas keywords naturalmente en:
- `hero.headline` y `hero.subheadline`
- `productos.headline` y `productos.sub`
- `por_que_elegirnos.headline`
- `contacto.headline` y `contacto.sub`
- Descripciones de cada producto en `productos.items`

---

### TAREA 13 — Archivo de verificación final

Una vez implementados todos los cambios, ejecuta:

```bash
npm run build
```

Asegúrate de que el build no tenga errores. Si hay errores de TypeScript o de importaciones, corrígelos.

Luego verifica manualmente:
1. ✅ `curl https://garbage-web-three.vercel.app/sitemap.xml` devuelve XML válido (después del deploy)
2. ✅ `curl https://garbage-web-three.vercel.app/robots.txt` devuelve el robots correcto
3. ✅ Abre DevTools → Application → Manifest y verifica que los meta tags existan
4. ✅ Verifica con [Schema.org validator](https://validator.schema.org) que el JSON-LD sea válido
5. ✅ En mobile, la barra sticky aparece al scrollear y el WhatsApp no la tapa
6. ✅ El formulario de contacto envía correctamente (test con datos de prueba)
7. ✅ Todas las secciones tienen su `id` para navegación por anchor

---

## ORDEN DE EJECUCIÓN RECOMENDADO

1. **Tarea 12a** — Corregir años de 50+ a 35 en todo el codebase (esto primero para no propagar el error)
2. **Tarea 1** — Activar todas las secciones existentes en page.tsx
3. **Tarea 2** — SEO técnico completo (schema, sitemap, robots, OG image)
4. **Tarea 6** — Mejoras al Hero (copy + trust bar)
5. **Tarea 8b** — Sección paleta de colores (diferenciador visual clave)
6. **Tarea 8c** — Diagrama de medidas + Consideraciones de fabricación
7. **Tarea 8** — Mejoras al formulario de contacto + upload de logo
8. **Tarea 3** — Personalizador paso a paso
9. **Tarea 5** — StickyBar de CTA
10. **Tarea 4** — Testimonios de clientes
11. **Tarea 10** — FAQ (SEO long-tail)
12. **Tarea 7** — Mejoras a Galería (filtros + hover)
13. **Tarea 9** — Performance y Core Web Vitals
14. **Tarea 11** — Header sticky + navegación
15. **Tarea 12b/12c** — Directiva de diseño y keywords en copy
16. **Tarea 13** — Verificación final y build

---

## CONTEXTO ADICIONAL IMPORTANTE

- **No borrar** el componente de WhatsApp flotante que ya existe en page.tsx
- **No tocar** el archivo `src/app/api/contact/route.ts` — la API de Resend ya está funcionando
- **Preservar** toda la paleta de colores: fondo `#FFFFFF`, acento `#E63000`, hover `#C42800`, texto `#1A1A1A`, texto secundario `#666666`
- **Preservar** la fuente Inter
- **Mantener** el enfoque B2B — esto NO es una tienda online, es una landing de captación de leads
- **Las animaciones** de Framer Motion existentes deben respetarse y extenderse con el mismo estilo
- **No agregar** stock photos genéricas — usar las imágenes reales del producto en `/public`

---

*Prompt generado para optimización completa de garbage-web-three.vercel.app — Abril 2026*
