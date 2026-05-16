'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Upload,
  Download,
  RefreshCw,
  Send,
  CheckCircle2,
  Loader2,
  ChevronRight,
  MessageCircle,
  Sparkles,
  ArrowDown,
} from 'lucide-react'

// ── Tokens de marca ───────────────────────────────────────────────
const NAVY = '#0A1628'
const DORADO = '#C8A96E'
const CREMA = '#F8F7F4'

// ── Paleta de 22 colores PVC (NO MODIFICAR) ──────────────────────
const PALETA = [
  { nombre: 'Negro',       hex: '#1a1a1a' },
  { nombre: 'Gris Oscuro', hex: '#3d3d3d' },
  { nombre: 'Gris Medio',  hex: '#6b6b6b' },
  { nombre: 'Gris Claro',  hex: '#a8a8a8' },
  { nombre: 'Blanco',      hex: '#ededed' },
  { nombre: 'Azul Marino', hex: '#1e3a5f' },
  { nombre: 'Azul Royal',  hex: '#1e5fb8' },
  { nombre: 'Azul Cielo',  hex: '#3a8dd1' },
  { nombre: 'Turquesa',    hex: '#1a8a8a' },
  { nombre: 'Rojo',        hex: '#c8102e' },
  { nombre: 'Burdeo',      hex: '#7a1f2e' },
  { nombre: 'Rosado',      hex: '#e85a8d' },
  { nombre: 'Verde Bosque',hex: '#0c5e3e' },
  { nombre: 'Verde Lima',  hex: '#7cb342' },
  { nombre: 'Amarillo',    hex: '#f9c80e' },
  { nombre: 'Mostaza',     hex: '#c9a227' },
  { nombre: 'Naranjo',     hex: '#e87c2f' },
  { nombre: 'Café',        hex: '#4a2e1e' },
  { nombre: 'Beige',       hex: '#c9a87c' },
  { nombre: 'Tostado',     hex: '#8a6342' },
  { nombre: 'Morado',      hex: '#5a2e7a' },
  { nombre: 'Lila',        hex: '#9a7ec9' },
]

type ColorPVC = typeof PALETA[number]
type ColorPVCRgb = ColorPVC & { rgb: { r: number; g: number; b: number } }
type LogoProcesado = { src: string; aspectRatio: number }
type BucleDef = { cx: number; cy: number; r: number; op: number; bright: boolean }

// ── Helpers de color ──────────────────────────────────────────────
function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

const PALETA_RGB: ColorPVCRgb[] = PALETA.map((c) => ({ ...c, rgb: hexToRgb(c.hex) }))

function distanciaColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
): number {
  const rMean = (a.r + b.r) / 2
  const dr = a.r - b.r
  const dg = a.g - b.g
  const db = a.b - b.b
  return Math.sqrt(
    (2 + rMean / 256) * dr * dr +
    4 * dg * dg +
    (2 + (255 - rMean) / 256) * db * db
  )
}

function colorMasCercano(r: number, g: number, b: number) {
  let mejor = PALETA_RGB[0]
  let minDist = Infinity
  for (const c of PALETA_RGB) {
    const d = distanciaColor({ r, g, b }, c.rgb)
    if (d < minDist) { minDist = d; mejor = c }
  }
  return mejor.rgb
}

function seededRandom(seed: number) {
  let x = seed
  return () => {
    x = (x * 9301 + 49297) % 233280
    return x / 233280
  }
}

// ── Input style ───────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e8e5e0',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.15s',
  backgroundColor: '#fff',
}

// ── Componentes auxiliares ────────────────────────────────────────
function Field({
  label, type, value, onChange, required, placeholder,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <dt style={{ color: '#78716c' }}>{label}</dt>
      <dd style={{ fontWeight: 600, color: NAVY }}>{value}</dd>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────
export default function ConfiguradorClient() {
  const [colorBase, setColorBase] = useState<ColorPVC>(PALETA[5])
  const [logoSrc, setLogoSrc] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoProcesado, setLogoProcesado] = useState<LogoProcesado | null>(null)
  const [tolerancia, setTolerancia] = useState(35)
  const [escalaLogo, setEscalaLogo] = useState(55)
  const [modoMonocromo, setModoMonocromo] = useState(false)
  const [colorMonocromo, setColorMonocromo] = useState<ColorPVC>(PALETA[14])
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [errorForm, setErrorForm] = useState<string | null>(null)
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', empresa: '',
    largo: '', ancho: '', cantidad: '', mensaje: '',
    website: '', // honeypot
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const formRef = useRef<HTMLElement>(null)

  // ── procesarLogo ──────────────────────────────────────────────
  const procesarLogo = (
    src: string,
    tol: number,
    monocromo: boolean,
    colorMono: ColorPVC
  ): Promise<LogoProcesado> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxDim = 800
        const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight))
        canvas.width = Math.round(img.naturalWidth * scale)
        canvas.height = Math.round(img.naturalHeight * scale)
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        let imageData: ImageData
        try {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        } catch (e) {
          reject(e)
          return
        }

        const data = imageData.data
        const esquinas: [number, number][] = [
          [0, 0], [canvas.width - 1, 0],
          [0, canvas.height - 1], [canvas.width - 1, canvas.height - 1],
        ]
        let bgR = 0, bgG = 0, bgB = 0
        esquinas.forEach(([x, y]) => {
          const i = (y * canvas.width + x) * 4
          bgR += data[i]; bgG += data[i + 1]; bgB += data[i + 2]
        })
        bgR /= 4; bgG /= 4; bgB /= 4

        const monoRgb = monocromo ? hexToRgb(colorMono.hex) : null
        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
            if (a < 10) { data[i + 3] = 0; continue }
            const distBg = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2)
            if (distBg < tol) {
              data[i + 3] = 0
            } else {
              const target = monoRgb ?? colorMasCercano(r, g, b)
              data[i] = target.r; data[i + 1] = target.g; data[i + 2] = target.b
              if (x < minX) minX = x
              if (y < minY) minY = y
              if (x > maxX) maxX = x
              if (y > maxY) maxY = y
            }
          }
        }

        if (minX >= maxX || minY >= maxY) {
          reject(new Error('No se detectó contenido en la imagen'))
          return
        }

        ctx.putImageData(imageData, 0, 0)
        const pad = 8
        const cropX = Math.max(0, minX - pad)
        const cropY = Math.max(0, minY - pad)
        const cropW = Math.min(canvas.width - cropX, maxX - minX + pad * 2)
        const cropH = Math.min(canvas.height - cropY, maxY - minY + pad * 2)
        const cropped = document.createElement('canvas')
        cropped.width = cropW; cropped.height = cropH
        cropped.getContext('2d')!.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
        resolve({ src: cropped.toDataURL('image/png'), aspectRatio: cropW / cropH })
      }
      img.onerror = () => reject(new Error('No se pudo cargar la imagen'))
      img.src = src
    })

  useEffect(() => {
    if (!logoSrc) { setLogoProcesado(null); return }
    let cancelled = false
    setProcesando(true); setError(null)
    procesarLogo(logoSrc, tolerancia, modoMonocromo, colorMonocromo)
      .then((result) => { if (!cancelled) { setLogoProcesado(result); setProcesando(false) } })
      .catch((err: Error) => {
        if (!cancelled) { setError(err.message); setProcesando(false); setLogoProcesado(null) }
      })
    return () => { cancelled = true }
  }, [logoSrc, tolerancia, modoMonocromo, colorMonocromo])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Solo imágenes (PNG, JPG, WEBP)'); return }
    if (file.size > 10 * 1024 * 1024) { setError('Archivo muy grande (max 10MB)'); return }
    setLogoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setLogoSrc(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setLogoSrc(null); setLogoFile(null); setLogoProcesado(null)
    setColorBase(PALETA[5]); setTolerancia(35); setEscalaLogo(55)
    setModoMonocromo(false); setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ── generarPNG ────────────────────────────────────────────────
  const generarPNG = (): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const svg = svgRef.current
      if (!svg) { reject(new Error('No hay preview')); return }
      const clone = svg.cloneNode(true) as SVGSVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      clone.style.transform = 'none'
      clone.style.filter = 'none'
      const svgString = new XMLSerializer().serializeToString(clone)
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 2400; canvas.height = 1400
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = '#f5f5f4'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        URL.revokeObjectURL(url)
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('No se pudo generar PNG'))),
          'image/png', 0.95
        )
      }
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo renderizar SVG')) }
      img.src = url
    })

  const handleDescargar = async () => {
    try {
      const blob = await generarPNG()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `garbage-limpiapies-${colorBase.nombre.toLowerCase().replace(/\s/g, '-')}.png`
      link.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('Error al descargar: ' + (e as Error).message)
    }
  }

  const scrollAFormulario = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ── handleEnviar ─────────────────────────────────────────────
  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true); setErrorForm(null)
    try {
      if (!form.nombre || !form.email || !form.largo || !form.ancho) {
        throw new Error('Faltan campos obligatorios')
      }
      const previewBlob = await generarPNG()
      const fd = new FormData()
      fd.append('nombre', form.nombre)
      fd.append('email', form.email)
      fd.append('telefono', form.telefono)
      fd.append('empresa', form.empresa)
      fd.append('largo', form.largo)
      fd.append('ancho', form.ancho)
      fd.append('cantidad', form.cantidad)
      fd.append('mensaje', form.mensaje)
      fd.append('website', form.website)
      fd.append('colorBase', colorBase.nombre)
      fd.append(
        'logoTipo',
        logoProcesado
          ? modoMonocromo ? `Monocromo (${colorMonocromo.nombre})` : 'Multicolor'
          : 'Sin logo'
      )
      fd.append('tamanoLogo', String(escalaLogo))
      fd.append('preview', previewBlob, 'preview-diseno.png')
      if (logoFile) fd.append('logoOriginal', logoFile, logoFile.name)

      const res = await fetch('/api/cotizar-configurador', { method: 'POST', body: fd })
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(data.error ?? 'Error al enviar')
      }
      setEnviado(true)
    } catch (err) {
      setErrorForm((err as Error).message)
    } finally {
      setEnviando(false)
    }
  }

  // ── Bucles PVC (useMemo — determinístico) ─────────────────────
  const bucles: BucleDef[] = useMemo(() => {
    const rand = seededRandom(7)
    const tile = 90, count = 110
    const result: BucleDef[] = []
    for (let i = 0; i < count; i++) {
      result.push({
        cx: rand() * tile, cy: rand() * tile,
        r: 1.4 + rand() * 1.8,
        op: 0.08 + rand() * 0.22,
        bright: rand() > 0.78,
      })
    }
    return result
  }, [])

  // ── Cálculos de logo para el SVG ─────────────────────────────
  const logoW = logoProcesado
    ? (Math.min(1000, 580 * logoProcesado.aspectRatio) * escalaLogo) / 100
    : 0
  const logoH = logoProcesado
    ? (Math.min(560, 1000 / logoProcesado.aspectRatio) * escalaLogo) / 100
    : 0
  const logoX = 600 - logoW / 2
  const logoY = 350 - logoH / 2

  // ── Render ────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: CREMA, fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e8e5e0', padding: '12px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#78716c' }}>
          <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Inicio</a>
          <ChevronRight style={{ width: 12, height: 12 }} />
          <span style={{ color: NAVY, fontWeight: 500 }}>Personaliza tu limpiapiés</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '48px 16px 64px', backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.15em',
            backgroundColor: `${DORADO}22`, border: `1px solid ${DORADO}55`,
            color: DORADO, marginBottom: 20,
          }}>
            <Sparkles style={{ width: 14, height: 14 }} />
            Configurador en vivo
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Playfair Display, serif',
            fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            color: NAVY, marginBottom: 16, maxWidth: 800,
          }}>
            Diseña tu limpiapiés.{' '}
            <span style={{ color: DORADO }}>Cotiza al instante.</span>
          </h1>

          <p style={{ fontSize: 17, color: '#57534e', maxWidth: 700, lineHeight: 1.6, marginBottom: 40 }}>
            Sube tu logo, elige el color de la base, y mira cómo queda en tiempo real.
            Cuando estés conforme, enviamos el diseño junto con tu solicitud para cotizar en menos de 24 horas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, maxWidth: 900 }}>
            {[
              { n: '01', t: 'Sube tu logo', d: 'PNG, JPG o lo que tengas. Recortamos el fondo automáticamente.' },
              { n: '02', t: 'Personaliza colores', d: '22 colores reales de PVC. Vista previa con textura simulada.' },
              { n: '03', t: 'Cotiza con un click', d: 'El diseño se adjunta al correo. Respuesta en 24h hábiles.' },
            ].map((p) => (
              <div key={p.n} style={{ display: 'flex', gap: 12 }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: 32, lineHeight: 1, color: DORADO, flexShrink: 0 }}>
                  {p.n}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: NAVY, marginBottom: 4 }}>{p.t}</div>
                  <div style={{ fontSize: 12, color: '#57534e', lineHeight: 1.5 }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurador */}
      <section style={{ padding: '40px 16px 64px', backgroundColor: CREMA }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 380px) 1fr', gap: 24 }} className="config-grid">

            {/* Panel de controles */}
            <div style={{
              backgroundColor: 'white', borderRadius: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e8e5e0',
              padding: 20, display: 'flex', flexDirection: 'column', gap: 24, height: 'fit-content',
            }}>

              {/* Upload */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>
                  {logoSrc ? 'Tu logo' : 'Sube tu logo (opcional)'}
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 8, padding: '10px 12px', backgroundColor: NAVY, color: 'white',
                      borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer',
                    }}
                  >
                    <Upload style={{ width: 16, height: 16 }} />
                    {logoSrc ? 'Cambiar logo' : 'Subir PNG / JPG'}
                  </button>
                  <button
                    onClick={handleReset}
                    title="Resetear"
                    style={{ padding: 10, backgroundColor: '#f5f5f4', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                  >
                    <RefreshCw style={{ width: 16, height: 16, color: '#57534e' }} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                {error && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 8 }}>{error}</p>}
                <p style={{ fontSize: 12, color: '#78716c', marginTop: 8, lineHeight: 1.5 }}>
                  Recorte automático de fondo + mapeo a los 22 colores de PVC.
                </p>
              </div>

              {/* Controles solo cuando hay logo */}
              {logoSrc && (
                <>
                  {/* Slider Sensibilidad */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Sensibilidad de recorte</label>
                      <span style={{ fontSize: 12, color: '#78716c' }}>{tolerancia}</span>
                    </div>
                    <input
                      type="range" min="5" max="120" value={tolerancia}
                      onChange={(e) => setTolerancia(Number(e.target.value))}
                      style={{ width: '100%', accentColor: DORADO }}
                    />
                  </div>

                  {/* Toggle Monocromo */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                      <input
                        type="checkbox" checked={modoMonocromo}
                        onChange={(e) => setModoMonocromo(e.target.checked)}
                        style={{ marginTop: 2, accentColor: DORADO }}
                      />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Convertir todo a un solo color</div>
                        <div style={{ fontSize: 12, color: '#78716c' }}>Por defecto se respetan los colores de tu logo.</div>
                      </div>
                    </label>
                    {modoMonocromo && (
                      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
                        {PALETA.map((c) => (
                          <button
                            key={c.hex}
                            onClick={() => setColorMonocromo(c)}
                            title={c.nombre}
                            style={{
                              aspectRatio: '1', borderRadius: 6,
                              border: colorMonocromo.hex === c.hex ? `2px solid ${DORADO}` : '2px solid #e8e5e0',
                              backgroundColor: c.hex, cursor: 'pointer',
                              transform: colorMonocromo.hex === c.hex ? 'scale(1.1)' : 'scale(1)',
                              transition: 'transform 0.15s',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Slider Tamaño */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Tamaño del logo</label>
                      <span style={{ fontSize: 12, color: '#78716c' }}>{escalaLogo}%</span>
                    </div>
                    <input
                      type="range" min="20" max="90" value={escalaLogo}
                      onChange={(e) => setEscalaLogo(Number(e.target.value))}
                      style={{ width: '100%', accentColor: DORADO }}
                    />
                  </div>
                </>
              )}

              {/* Selector color alfombra */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>
                  Color de la alfombra
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
                  {PALETA.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColorBase(c)}
                      title={c.nombre}
                      style={{
                        aspectRatio: '1', borderRadius: 6,
                        border: colorBase.hex === c.hex ? `2px solid ${DORADO}` : '2px solid #e8e5e0',
                        backgroundColor: c.hex, cursor: 'pointer',
                        transform: colorBase.hex === c.hex ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.15s',
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 12, color: '#78716c', marginTop: 8 }}>
                  Seleccionado: <span style={{ fontWeight: 500, color: NAVY }}>{colorBase.nombre}</span>
                </p>
              </div>

              {/* CTAs */}
              <div style={{ paddingTop: 16, borderTop: '1px solid #e8e5e0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={scrollAFormulario}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px 16px', backgroundColor: DORADO, color: NAVY,
                    borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer',
                  }}
                >
                  <Send style={{ width: 16, height: 16 }} />
                  Cotizar este diseño
                  <ArrowDown style={{ width: 16, height: 16 }} />
                </button>
                <button
                  onClick={handleDescargar}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '10px 16px', backgroundColor: NAVY, color: 'white',
                    borderRadius: 8, fontWeight: 500, border: 'none', cursor: 'pointer',
                  }}
                >
                  <Download style={{ width: 16, height: 16 }} />
                  Descargar PNG
                </button>
              </div>
            </div>

            {/* Preview SVG */}
            <div style={{
              backgroundColor: 'white', borderRadius: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e8e5e0',
              padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 500, position: 'relative', overflow: 'hidden',
            }}>
              {/* Fondo simulando piso */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, #e8e4df 0%, #b8b4af 80%)' }} />
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.15,
                backgroundImage: 'linear-gradient(0deg, transparent 49.7%, rgba(0,0,0,0.4) 50%)',
                backgroundSize: '180px 180px',
              }} />

              {procesando && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                  padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, zIndex: 10,
                }}>
                  Procesando...
                </div>
              )}

              {/* SVG limpiapiés — pieza central */}
              <svg
                ref={svgRef}
                viewBox="0 0 1200 700"
                style={{
                  position: 'relative', zIndex: 10, width: '100%', maxWidth: 768,
                  transform: 'perspective(1600px) rotateX(32deg) rotateZ(-2deg)',
                  filter: 'drop-shadow(0 35px 50px rgba(0,0,0,0.45))',
                }}
              >
                <defs>
                  <pattern id="bucles" width="90" height="90" patternUnits="userSpaceOnUse">
                    {bucles.map((b, i) => (
                      <g key={i}>
                        <circle cx={b.cx + 0.5} cy={b.cy + 0.8} r={b.r + 0.3} fill="rgba(0,0,0,0.35)" opacity={b.op} />
                        <circle cx={b.cx} cy={b.cy} r={b.r} fill="rgba(255,255,255,0.18)" opacity={b.op + 0.1} />
                        <circle cx={b.cx - 0.4} cy={b.cy - 0.4} r={b.r * 0.4}
                          fill={b.bright ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)'}
                          opacity={b.op + 0.3}
                        />
                      </g>
                    ))}
                  </pattern>
                  <filter id="noise-fino">
                    <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="2" seed="11" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 -0.15" />
                  </filter>
                  <radialGradient id="luz-cenital" cx="50%" cy="35%" r="80%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                    <stop offset="55%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                  </radialGradient>
                  <linearGradient id="sombra-top" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                  <linearGradient id="sombra-bottom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                  </linearGradient>
                  <clipPath id="rect-clip">
                    <rect x="40" y="40" width="1120" height="620" rx="10" />
                  </clipPath>
                </defs>

                {/* Sombra de contacto */}
                <ellipse cx="600" cy="685" rx="560" ry="12" fill="rgba(0,0,0,0.45)" />

                {/* Marco PVC */}
                <rect x="20" y="20" width="1160" height="660" rx="14" fill={colorBase.hex} />
                <rect x="20" y="20" width="1160" height="20" rx="14" fill="rgba(255,255,255,0.12)" />
                <rect x="20" y="660" width="1160" height="20" fill="rgba(0,0,0,0.2)" />

                {/* Área central rizada */}
                <g clipPath="url(#rect-clip)">
                  <rect x="40" y="40" width="1120" height="620" fill={colorBase.hex} />
                  <rect x="40" y="40" width="1120" height="620" fill="url(#bucles)" />
                  <rect x="40" y="40" width="1120" height="620" fill={colorBase.hex} filter="url(#noise-fino)" opacity="0.5" />

                  {/* Logo procesado */}
                  {logoProcesado && (
                    <g>
                      <image
                        href={logoProcesado.src}
                        x={logoX} y={logoY}
                        width={logoW} height={logoH}
                        preserveAspectRatio="xMidYMid meet"
                      />
                      <rect
                        x={logoX} y={logoY}
                        width={logoW} height={logoH}
                        fill="url(#bucles)" opacity="0.55"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </g>
                  )}

                  {/* Placeholder sin logo */}
                  {!logoSrc && (
                    <g>
                      <text x="600" y="345" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="28" fontWeight="500">
                        Sube tu logo
                      </text>
                      <text x="600" y="380" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="18">
                        o deja la alfombra sin diseño
                      </text>
                    </g>
                  )}

                  <rect x="40" y="40" width="1120" height="620" fill="url(#luz-cenital)" />
                  <rect x="40" y="40" width="1120" height="40" fill="url(#sombra-top)" />
                  <rect x="40" y="620" width="1120" height="40" fill="url(#sombra-bottom)" />
                </g>

                <rect x="20" y="20" width="1160" height="660" rx="14" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
              </svg>

              {/* Caption */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, textAlign: 'center', fontSize: 12, color: '#57534e', zIndex: 10 }}>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: 999 }}>
                  {colorBase.nombre}
                  {logoProcesado && (modoMonocromo ? ` · logo ${colorMonocromo.nombre}` : ' · logo a color real')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de cotización */}
      <section
        ref={formRef}
        style={{ padding: '64px 16px 96px', backgroundColor: 'white', scrollMarginTop: 80 }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {!enviado ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.15em',
                  backgroundColor: `${DORADO}22`, border: `1px solid ${DORADO}55`,
                  color: DORADO, marginBottom: 16,
                }}>
                  <Send style={{ width: 14, height: 14 }} />
                  Paso final
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-playfair), Playfair Display, serif',
                  fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  color: NAVY, marginBottom: 12,
                }}>
                  Cotiza tu diseño
                </h2>
                <p style={{ color: '#57534e', maxWidth: 600, margin: '0 auto' }}>
                  Completa los datos. Tu diseño se adjunta automáticamente al correo. Te respondemos en menos de 24 horas hábiles con precio detallado.
                </p>
              </div>

              <form onSubmit={handleEnviar} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32 }} className="form-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Honeypot */}
                  <input
                    type="text" name="website" tabIndex={-1} autoComplete="off"
                    value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                    style={{ position: 'absolute', left: -9999, opacity: 0, pointerEvents: 'none' }}
                    aria-hidden="true"
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    <Field label="Nombre completo *" type="text" required value={form.nombre} onChange={(v) => setForm({ ...form, nombre: v })} />
                    <Field label="Empresa" type="text" value={form.empresa} onChange={(v) => setForm({ ...form, empresa: v })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    <Field label="Email *" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Teléfono" type="tel" placeholder="+56 9..." value={form.telefono} onChange={(v) => setForm({ ...form, telefono: v })} />
                  </div>

                  {/* Medidas */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 6 }}>Medidas (cm) *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="number" min="30" max="500" required placeholder="Largo"
                        value={form.largo} onChange={(e) => setForm({ ...form, largo: e.target.value })}
                        style={inputStyle}
                      />
                      <span style={{ color: '#78716c', fontSize: 18 }}>×</span>
                      <input
                        type="number" min="30" max="500" required placeholder="Ancho"
                        value={form.ancho} onChange={(e) => setForm({ ...form, ancho: e.target.value })}
                        style={inputStyle}
                      />
                      <span style={{ color: '#78716c', fontSize: 14 }}>cm</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#78716c', marginTop: 4 }}>Entre 30 y 500 cm cada lado</p>
                  </div>

                  <Field label="Cantidad" type="text" placeholder="Ej: 5 unidades" value={form.cantidad} onChange={(v) => setForm({ ...form, cantidad: v })} />

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 6 }}>Comentarios</label>
                    <textarea
                      rows={4}
                      placeholder="Fecha de entrega, dirección de despacho, observaciones..."
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  {errorForm && (
                    <p style={{ fontSize: 13, color: '#dc2626', textAlign: 'center' }}>{errorForm}</p>
                  )}

                  <button
                    type="submit" disabled={enviando}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '14px 24px', backgroundColor: DORADO, color: NAVY,
                      borderRadius: 8, fontWeight: 600, fontSize: 15, border: 'none',
                      cursor: enviando ? 'not-allowed' : 'pointer', opacity: enviando ? 0.6 : 1,
                    }}
                  >
                    {enviando ? (
                      <>
                        <Loader2 style={{ width: 18, height: 18 }} className="spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send style={{ width: 18, height: 18 }} />
                        Enviar cotización con diseño
                      </>
                    )}
                  </button>
                  <p style={{ fontSize: 11, color: '#78716c', textAlign: 'center' }}>
                    Al enviar aceptas nuestra política de privacidad. Solo te contactaremos sobre tu cotización.
                  </p>
                </div>

                {/* Sidebar resumen */}
                <div style={{
                  backgroundColor: '#fafaf9', borderRadius: 16, padding: 20,
                  height: 'fit-content', border: '1px solid #e8e5e0',
                }} className="resumen-sidebar">
                  <h3 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: 18, color: NAVY, marginBottom: 16 }}>
                    Tu diseño
                  </h3>
                  <div style={{
                    aspectRatio: '16/9', borderRadius: 8, marginBottom: 16,
                    backgroundColor: colorBase.hex, border: '1px solid #e8e5e0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)', fontSize: 11, fontStyle: 'italic',
                  }}>
                    Preview adjunto al correo
                  </div>
                  <dl style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                    <Row label="Color base" value={colorBase.nombre} />
                    <Row
                      label="Logo"
                      value={logoProcesado
                        ? modoMonocromo ? `Monocromo (${colorMonocromo.nombre})` : 'Multicolor'
                        : 'Sin logo'
                      }
                    />
                    <Row label="Tamaño logo" value={logoProcesado ? `${escalaLogo}%` : '—'} />
                  </dl>
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e8e5e0', fontSize: 11, color: '#57534e', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      'Respuesta en menos de 24h hábiles',
                      'Boceto técnico antes de fabricar',
                    ].map((txt) => (
                      <div key={txt} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <CheckCircle2 style={{ width: 14, height: 14, color: DORADO, flexShrink: 0, marginTop: 2 }} />
                        <span>{txt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </form>

              {/* Alternativa WhatsApp */}
              <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid #e8e5e0', textAlign: 'center' }}>
                <p style={{ fontSize: 14, color: '#57534e', marginBottom: 16 }}>¿Prefieres hablarlo directamente?</p>
                <a
                  href="https://wa.me/56996998344?text=Hola%2C%20quiero%20cotizar%20un%20limpiapi%C3%A9s%20personalizado"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 999,
                    border: '2px solid #25D366', color: '#25D366',
                    fontWeight: 600, fontSize: 14, textDecoration: 'none',
                  }}
                >
                  <MessageCircle style={{ width: 16, height: 16 }} />
                  WhatsApp
                </a>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{
                width: 80, height: 80, margin: '0 auto 24px', borderRadius: '50%',
                backgroundColor: `${DORADO}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle2 style={{ width: 48, height: 48, color: DORADO }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: NAVY, marginBottom: 12 }}>
                ¡Cotización enviada!
              </h2>
              <p style={{ color: '#57534e', maxWidth: 480, margin: '0 auto 32px' }}>
                Recibimos tu solicitud junto con el diseño. Te respondemos antes de 24 horas hábiles a{' '}
                <strong>{form.email}</strong>.
              </p>
              <a
                href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 999,
                  backgroundColor: NAVY, color: 'white', fontWeight: 600, textDecoration: 'none',
                }}
              >
                Volver al inicio
              </a>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .config-grid { grid-template-columns: 1fr !important; }
          .form-grid   { grid-template-columns: 1fr !important; }
          .resumen-sidebar { order: -1; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
