# Opciones Visual del Hero — Garbage Limpiapiés

## Contexto de decisión

Empresa: 30+ años, clientes corporativos top (Líder, Unimarc, Paris, bancos, municipalidades).
Fondo: blanco.
Paleta: rojo `#E63000` como acento, `#1A1A1A` texto.
Mensaje del hero: confianza, seriedad, escala nacional, producto físico premium.

---

## Opción A — Producto en primer plano (Recomendada)

**Concepto:** Foto de producto del limpiapiés con logo corporativo grabado, sobre fondo blanco neutro, iluminación de estudio. Composición 60/40: copy a la izquierda, foto a la derecha.

**Elemento visual:**
- Foto del limpiapiés en ángulo 3/4 mostrando textura y logo en relieve
- Badge circular superpuesto: "30+ Años de Experiencia" en rojo `#E63000`
- Sombra sutil bajo el producto para dar profundidad sin romper el fondo blanco

**Por qué funciona para este negocio:**
El producto es el argumento de venta. Mostrarlo de inmediato — con el logo corporativo visible — comunica en 2 segundos que esto es personalización real y de calidad. Es el mismo lenguaje visual que usan marcas industriales premium como Brady, Kleen-Tex o Waterhog. Fondo blanco + producto = e-commerce serio, no catálogo de feria.

**Implementación:**
```tsx
// Layout del hero: grid 2 columnas
// Izquierda: H1 + subtítulo + 2 CTAs + logos clientes mini
// Derecha: <Image> con foto del producto + badge absoluto
```

**Animación:** Imagen entra con fade-in + translate-y desde abajo (Framer Motion, 0.6s ease-out). Badge entra con delay 0.3s + scale desde 0.

---

## Opción B — Composición producto + patrón de textura

**Concepto:** Fondo blanco con un patrón sutil de textura de goma (CSS background-image con SVG pattern, muy baja opacidad `0.04`). Foto del limpiapiés centrada con sombra pronunciada. Sin foto de fábrica ni ambiente.

**Elemento visual:**
- Patrón CSS de puntos o cuadrícula geométrica industrial, color `#1A1A1A` a 4% de opacidad
- Limpiapiés en vista cenital con sombra drop-shadow roja sutil
- Número "50" en tipografía muy grande (`text-[180px]`), color `#F0F0F0`, posicionado detrás del contenido como decoración

**Por qué funciona:**
Da profundidad y contexto industrial sin romper el fondo blanco. El "50" gigante comunica trayectoria sin que se lea literalmente — funciona como elemento gráfico. Menos arriesgado que usar una foto de fábrica que puede quedar oscura.

**Riesgo:** Si el patrón no está bien calibrado puede verse "ocupado" en mobile. Requiere ajuste cuidadoso de opacidad.

---

## Opción C — Split visual: producto + fábrica

**Concepto:** Hero dividido en dos mitades verticales. Izquierda: fondo blanco con copy y CTAs. Derecha: foto de planta industrial (oscura, seria) con overlay rojo suave.

**Elemento visual:**
- Foto de fábrica en blanco y negro o con tono rojo muy sutil
- Línea divisoria sharp entre fondo blanco y foto — sin degradé
- En la foto: texto overlay "Fabricación Propia" o "Hecho en Chile"

**Por qué puede funcionar:**
Comunica que hay una empresa real detrás, con infraestructura propia. Es más diferenciador que solo mostrar el producto — rompe el patrón de los competidores que solo muestran fotos de catálogo.

**Riesgo:** Más difícil de ejecutar bien. Si la foto de fábrica no es de calidad suficiente, la mitad oscura puede restarle limpieza al diseño. Requiere foto de calidad real o Midjourney muy bien ejecutado.

---

## Recomendacion final: Opcion A

Para una empresa industrial con 30 años y clientes corporativos, la Opción A es la más segura y efectiva:

1. **Claridad inmediata** — el visitante sabe en 2 segundos qué venden
2. **Credibilidad** — fondo blanco + producto bien fotografiado = seriedad profesional
3. **Diferenciación** — el logo grabado visible comunica personalización, que es el diferencial clave
4. **Implementación limpia** — menos dependencia de assets de calidad variable

Ejecutar Opción B como alternativa si el cliente quiere más personalidad visual. Opción C solo si se consigue foto real de la planta.
