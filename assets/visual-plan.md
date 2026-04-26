# Plan de Assets Visuales — Garbage Limpiapiés

## Identidad visual

| Variable | Valor |
|----------|-------|
| Fondo principal | `#FFFFFF` |
| Acento / CTA | `#E63000` |
| Texto principal | `#1A1A1A` |
| Texto secundario | `#6B7280` |
| Borde / separadores | `#E5E7EB` |
| Fondo sección alternativa | `#F9FAFB` |

**Tipografía recomendada:**
- Display / headings: Inter (700, 800) — limpio, industrial, legible
- Body: Inter (400, 500) — consistencia total
- Alternativa display: DM Sans — ligeramente más geométrico

---

## Assets requeridos por sección

### Hero
| Asset | Tipo | Descripción |
|-------|------|-------------|
| `hero-main.jpg` | Foto (Midjourney) | Limpiapiés profesional con logo corporativo grabado, superficie de goma negra, fondo blanco neutro, iluminación de estudio |
| Logotipo Garbage | SVG (cliente provee) | Logo oficial de la empresa |
| Ícono badge "30 años" | SVG inline | Badge redondo, tipografía bold |

### Sección Clientes (Logo Wall)
| Asset | Tipo | Descripción |
|-------|------|-------------|
| Logo Líder | PNG/SVG | Versión grayscale + color on-hover |
| Logo Unimarc | PNG/SVG | Versión grayscale + color on-hover |
| Logo Paris | PNG/SVG | Versión grayscale + color on-hover |
| Logo Falabella | PNG/SVG | Versión grayscale + color on-hover |
| Logos bancos (2-3) | PNG/SVG | Versión grayscale + color on-hover |
| Logos municipalidades | PNG/SVG | Versión grayscale + color on-hover |

**Tratamiento logos:** todos en `grayscale` por defecto, transición a color en hover. Fondo blanco.

### Sección Productos
| Asset | Tipo | Descripción |
|-------|------|-------------|
| `producto-limpiapies-logo.jpg` | Foto (Midjourney) | Limpiapiés negro con logo corporativo en relieve, vista cenital |
| `producto-alfombra-pub.jpg` | Foto (Midjourney) | Alfombra publicitaria a color con diseño de marca |
| `producto-antideslizante.jpg` | Foto (Midjourney) | Detalle de textura antideslizante, close-up industrial |
| `producto-cinta.jpg` | Foto (Midjourney) | Cinta de seguridad industrial amarilla/negra |
| `producto-rollo.jpg` | Foto (Midjourney) | Rollo de alfombra desenrollado parcialmente |
| Íconos productos (×6) | SVG / TSX | Ver sección de íconos SVG |

### Sección Por Qué Elegirnos
| Asset | Tipo | Descripción |
|-------|------|-------------|
| Íconos beneficios (×4) | SVG / TSX | Experiencia, Cobertura, Personalización, Calidad |
| Foto fábrica (opcional) | Foto (Midjourney) | Interior de planta industrial, máquinas, ambiente serio |

### Sección Proceso
| Asset | Tipo | Descripción |
|-------|------|-------------|
| Íconos proceso (×4) | SVG inline simple | Cotización → Diseño → Fabricación → Entrega |
| Línea conectora | CSS / SVG | Línea punteada o sólida entre pasos |

### Sección Cotización / CTA
| Asset | Tipo | Descripción |
|-------|------|-------------|
| Fondo textura (opcional) | CSS pattern | Patrón geométrico sutil, baja opacidad, rojo o gris |

---

## Tratamiento fotográfico

- **Estilo:** Iluminación de estudio, fondo blanco o gris muy claro, sin personas
- **Color grading:** Neutro, sin filtros cálidos ni fríos exagerados. Realista e industrial
- **Composición:** Cenital o 3/4 para productos. Siempre mostrar el producto como protagonista
- **Prohibido:** Personas con laptops, robots, gradientes azul-morado, imágenes de stock genéricas de alfombras decorativas hogareñas

---

## Íconos SVG — sistema

Todos los íconos siguen el estilo **outline** (stroke, no fill) con:
- `viewBox="0 0 24 24"`
- `strokeWidth="1.5"`
- `strokeLinecap="round"`
- `strokeLinejoin="round"`
- Color via `currentColor` — se controla desde el CSS padre
- Tamaño via `className` (Tailwind: `w-6 h-6`, `w-8 h-8`, etc.)

### Íconos de Productos (×6)
1. `IconLimpiapieSPersonalizado` — limpiapiés con logo grabado
2. `IconAlfombraPublicitaria` — alfombra con diseño a color
3. `IconAntideslizante` — superficie con grip/textura antidesliz
4. `IconDescargaEstatica` — rayo / tierra estática
5. `IconCintaSeguridad` — cinta diagonal de advertencia
6. `IconAlfombraRollo` — rollo de material

### Íconos Por Qué Elegirnos (×4)
1. `IconExperiencia` — trofeo / medalla
2. `IconCobertura` — mapa / pin nacional
3. `IconPersonalizacion` — lápiz sobre forma
4. `IconCalidad` — escudo con check

---

## Animaciones recomendadas

- Logo wall: scroll marquee automático (loop), pausa on hover
- Íconos sección productos: hover scale leve (1.05) + color acento
- Hero badge "30 años": entrada fade-in con scale desde 0.8
- Contadores estadísticas: count-up al entrar en viewport
- Cards productos: hover con sombra sutil y borde rojo

---

## Checklist de entrega

- [ ] Fotos Midjourney generadas y exportadas a `/assets/photos/`
- [ ] Logos clientes en `/assets/logos/` (grayscale + color)
- [ ] 10 íconos SVG en `/src/components/icons/`
- [ ] Logo Garbage en `/public/logo.svg`
- [ ] Favicon `/public/favicon.ico`
- [ ] OG image `/public/og-image.jpg` (1200×630px)
