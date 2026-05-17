'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Upload, Download, RefreshCw, Send, CheckCircle2, Loader2, X } from 'lucide-react'

// ── Tokens de marca ───────────────────────────────────────────────
const NAVY  = '#0A1628'
const DORADO = '#C8A96E'
const CREMA  = '#F8F7F4'

// ── Paleta de 22 colores PVC (NO MODIFICAR) ──────────────────────
const PALETA = [
  { nombre: 'Negro',        hex: '#1a1a1a' },
  { nombre: 'Gris Oscuro',  hex: '#3d3d3d' },
  { nombre: 'Gris Medio',   hex: '#6b6b6b' },
  { nombre: 'Gris Claro',   hex: '#a8a8a8' },
  { nombre: 'Blanco',       hex: '#ededed' },
  { nombre: 'Azul Marino',  hex: '#1e3a5f' },
  { nombre: 'Azul Royal',   hex: '#1e5fb8' },
  { nombre: 'Azul Cielo',   hex: '#3a8dd1' },
  { nombre: 'Turquesa',     hex: '#1a8a8a' },
  { nombre: 'Rojo',         hex: '#c8102e' },
  { nombre: 'Burdeo',       hex: '#7a1f2e' },
  { nombre: 'Rosado',       hex: '#e85a8d' },
  { nombre: 'Verde Bosque', hex: '#0c5e3e' },
  { nombre: 'Verde Lima',   hex: '#7cb342' },
  { nombre: 'Amarillo',     hex: '#f9c80e' },
  { nombre: 'Mostaza',      hex: '#c9a227' },
  { nombre: 'Naranjo',      hex: '#e87c2f' },
  { nombre: 'Café',         hex: '#4a2e1e' },
  { nombre: 'Beige',        hex: '#c9a87c' },
  { nombre: 'Tostado',      hex: '#8a6342' },
  { nombre: 'Morado',       hex: '#5a2e7a' },
  { nombre: 'Lila',         hex: '#9a7ec9' },
]

type ColorPVC    = typeof PALETA[number]
type ColorPVCRgb = ColorPVC & { rgb: { r: number; g: number; b: number } }
type LogoProcesado = { src: string; aspectRatio: number }
type BucleDef    = { cx: number; cy: number; r: number; op: number; bright: boolean }

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
  const dr = a.r - b.r, dg = a.g - b.g, db = a.b - b.b
  return Math.sqrt(
    (2 + rMean / 256) * dr * dr +
    4 * dg * dg +
    (2 + (255 - rMean) / 256) * db * db
  )
}

function colorMasCercano(r: number, g: number, b: number) {
  let mejor = PALETA_RGB[0], minDist = Infinity
  for (const c of PALETA_RGB) {
    const d = distanciaColor({ r, g, b }, c.rgb)
    if (d < minDist) { minDist = d; mejor = c }
  }
  return mejor.rgb
}

function seededRandom(seed: number) {
  let x = seed
  return () => { x = (x * 9301 + 49297) % 233280; return x / 233280 }
}

// ── Estilos compartidos ───────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  border: '1px solid #e8e5e0', borderRadius: 8,
  fontSize: 14, fontFamily: 'inherit',
  outline: 'none', transition: 'border-color 0.15s',
  backgroundColor: '#fff',
}

// ── Componente principal ──────────────────────────────────────────
export default function ConfiguradorClient() {
  const [colorBase,      setColorBase]      = useState<ColorPVC>(PALETA[5])
  const [logoSrc,        setLogoSrc]        = useState<string | null>(null)
  const [logoFile,       setLogoFile]       = useState<File | null>(null)
  const [logoProcesado,  setLogoProcesado]  = useState<LogoProcesado | null>(null)
  const [tolerancia,     setTolerancia]     = useState(35)
  const [escalaLogo,     setEscalaLogo]     = useState(55)
  const [modoMonocromo,  setModoMonocromo]  = useState(false)
  const [colorMonocromo, setColorMonocromo] = useState<ColorPVC>(PALETA[14])
  const [procesando,     setProcesando]     = useState(false)
  const [error,          setError]          = useState<string | null>(null)

  const [modalAbierto, setModalAbierto] = useState(false)
  const [enviando,     setEnviando]     = useState(false)
  const [enviado,      setEnviado]      = useState(false)
  const [errorForm,    setErrorForm]    = useState<string | null>(null)
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', empresa: '',
    medidas: '', mensaje: '',
    website: '', // honeypot
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const svgRef       = useRef<SVGSVGElement>(null)

  // ── procesarLogo: chroma key + bounding box + mapeo a paleta PVC ─
  const procesarLogo = (
    src: string, tol: number, monocromo: boolean, colorMono: ColorPVC
  ): Promise<LogoProcesado> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxDim = 800
        const scale  = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight))
        canvas.width  = Math.round(img.naturalWidth  * scale)
        canvas.height = Math.round(img.naturalHeight * scale)
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        let imageData: ImageData
        try { imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) }
        catch (e) { reject(e); return }

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

        if (minX >= maxX || minY >= maxY) { reject(new Error('No se detectó contenido en la imagen')); return }

        ctx.putImageData(imageData, 0, 0)
        const pad = 8
        const cropX = Math.max(0, minX - pad)
        const cropY = Math.max(0, minY - pad)
        const cropW = Math.min(canvas.width  - cropX, maxX - minX + pad * 2)
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
      .then((r) => { if (!cancelled) { setLogoProcesado(r); setProcesando(false) } })
      .catch((e: Error) => { if (!cancelled) { setError(e.message); setProcesando(false); setLogoProcesado(null) } })
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

  // ── generarPNG: XMLSerializer + canvas.toBlob para preview 2400×1400 ─
  // Los SVG filters (feTurbulence) no se resuelven en canvas — se eliminan del clon.
  const generarPNG = (): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const svg = svgRef.current
      if (!svg) { reject(new Error('No hay preview')); return }
      const clone = svg.cloneNode(true) as SVGSVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      clone.style.transform = 'none'
      clone.style.filter    = 'none'
      clone.querySelectorAll('[filter]').forEach((el) => el.removeAttribute('filter'))
      const svgString = new XMLSerializer().serializeToString(clone)
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url  = URL.createObjectURL(blob)
      const img  = new Image()
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
      const url  = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href  = url
      link.download = `garbage-limpiapies-${colorBase.nombre.toLowerCase().replace(/\s/g, '-')}.png`
      link.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('Error al descargar: ' + (e as Error).message)
    }
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setTimeout(() => {
      setEnviado(false)
      setErrorForm(null)
      setForm({ nombre: '', email: '', telefono: '', empresa: '', medidas: '', mensaje: '', website: '' })
    }, 300)
  }

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true); setErrorForm(null)
    try {
      const previewBlob = await generarPNG()
      const fd = new FormData()
      fd.append('nombre',    form.nombre)
      fd.append('email',     form.email)
      fd.append('telefono',  form.telefono)
      fd.append('empresa',   form.empresa)
      fd.append('medidas',   form.medidas)
      fd.append('mensaje',   form.mensaje)
      fd.append('website',   form.website)
      fd.append('colorBase', colorBase.nombre)
      fd.append('logoTipo',  logoProcesado
        ? modoMonocromo ? `Monocromo (${colorMonocromo.nombre})` : 'Multicolor'
        : 'Sin logo')
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

  // ── bucles: array determinístico de ~110 círculos para pattern PVC ─
  const bucles: BucleDef[] = useMemo(() => {
    const rand = seededRandom(7)
    const tile = 90, count = 110
    const result: BucleDef[] = []
    for (let i = 0; i < count; i++) {
      result.push({
        cx: rand() * tile, cy: rand() * tile,
        r:  1.4 + rand() * 1.8,
        op: 0.08 + rand() * 0.22,
        bright: rand() > 0.78,
      })
    }
    return result
  }, [])

  // Cálculos de posición/tamaño del logo en el SVG
  const logoW = logoProcesado ? (Math.min(1000, 580 * logoProcesado.aspectRatio) * escalaLogo) / 100 : 0
  const logoH = logoProcesado ? (Math.min(560, 1000 / logoProcesado.aspectRatio) * escalaLogo) / 100 : 0
  const logoX = 600 - logoW / 2
  const logoY = 350 - logoH / 2

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div
      className="configurador-root"
      style={{
        minHeight: '100vh',
        backgroundColor: CREMA,
        fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
        paddingTop: 'var(--navbar-height, 108px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>

        {/* Header compacto */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Playfair Display, serif',
            fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            color: NAVY, marginBottom: 6, lineHeight: 1.15,
          }}>
            Configurador de Limpiapiés
          </h1>
          <p style={{ fontSize: 15, color: '#57534e', margin: 0 }}>
            Diseña tu limpiapiés. Descarga el preview o envíalo directamente a cotización.
          </p>
        </div>

        {/* Grid principal: controles (izq) + preview (der) */}
        <div
          className="config-grid"
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 380px) 1fr', gap: 24 }}
        >

          {/* ── Panel de controles ── */}
          <div style={{
            backgroundColor: 'white', borderRadius: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e8e5e0',
            padding: 20, display: 'flex', flexDirection: 'column', gap: 24, height: 'fit-content',
          }}>

            {/* Upload logo */}
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
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              {error && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 8 }}>{error}</p>}
              <p style={{ fontSize: 12, color: '#78716c', marginTop: 8, lineHeight: 1.5 }}>
                Recorte automático de fondo + mapeo a los 22 colores de PVC.
              </p>
            </div>

            {/* Controles solo cuando hay logo */}
            {logoSrc && (
              <>
                {/* Sensibilidad de recorte */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Sensibilidad de recorte</label>
                    <span style={{ fontSize: 12, color: '#78716c' }}>{tolerancia}</span>
                  </div>
                  <input type="range" min="5" max="120" value={tolerancia}
                    onChange={(e) => setTolerancia(Number(e.target.value))}
                    style={{ width: '100%', accentColor: DORADO }} />
                </div>

                {/* Monocromo toggle */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={modoMonocromo}
                      onChange={(e) => setModoMonocromo(e.target.checked)}
                      style={{ marginTop: 2, accentColor: DORADO }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Convertir todo a un solo color</div>
                      <div style={{ fontSize: 12, color: '#78716c' }}>Por defecto se respetan los colores de tu logo.</div>
                    </div>
                  </label>
                  {modoMonocromo && (
                    <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
                      {PALETA.map((c) => (
                        <button key={c.hex} onClick={() => setColorMonocromo(c)} title={c.nombre}
                          style={{
                            aspectRatio: '1', borderRadius: 6,
                            border: colorMonocromo.hex === c.hex ? `2px solid ${DORADO}` : '2px solid #e8e5e0',
                            backgroundColor: c.hex, cursor: 'pointer',
                            transform: colorMonocromo.hex === c.hex ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.15s',
                          }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Tamaño del logo */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Tamaño del logo</label>
                    <span style={{ fontSize: 12, color: '#78716c' }}>{escalaLogo}%</span>
                  </div>
                  <input type="range" min="20" max="90" value={escalaLogo}
                    onChange={(e) => setEscalaLogo(Number(e.target.value))}
                    style={{ width: '100%', accentColor: DORADO }} />
                </div>
              </>
            )}

            {/* Paleta de colores */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>
                Color de la alfombra
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
                {PALETA.map((c) => (
                  <button key={c.hex} onClick={() => setColorBase(c)} title={c.nombre}
                    style={{
                      aspectRatio: '1', borderRadius: 6,
                      border: colorBase.hex === c.hex ? `2px solid ${DORADO}` : '2px solid #e8e5e0',
                      backgroundColor: c.hex, cursor: 'pointer',
                      transform: colorBase.hex === c.hex ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.15s',
                    }} />
                ))}
              </div>
              <p style={{ fontSize: 12, color: '#78716c', marginTop: 8 }}>
                Seleccionado: <span style={{ fontWeight: 500, color: NAVY }}>{colorBase.nombre}</span>
              </p>
            </div>

            {/* CTAs */}
            <div style={{ paddingTop: 16, borderTop: '1px solid #e8e5e0', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => setModalAbierto(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 16px', backgroundColor: DORADO, color: NAVY,
                  borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer',
                }}
              >
                <Send style={{ width: 16, height: 16 }} />
                Enviar a cotización
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
                Descargar mi diseño (PNG)
              </button>
            </div>
          </div>

          {/* ── Preview SVG ── */}
          <div style={{
            backgroundColor: 'white', borderRadius: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e8e5e0',
            padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 500, position: 'relative', overflow: 'hidden',
          }}>
            {/* Fondo simulando piso (cuadrícula) */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, #e8e4df 0%, #b8b4af 80%)' }} />
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.15,
              backgroundImage: 'linear-gradient(0deg, transparent 49.7%, rgba(0,0,0,0.4) 50%, transparent 50.3%), linear-gradient(90deg, transparent 49.7%, rgba(0,0,0,0.3) 50%, transparent 50.3%)',
              backgroundSize: '180px 180px',
            }} />

            {procesando && (
              <div style={{
                position: 'absolute', top: 16, right: 16, zIndex: 10,
                backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
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
                        opacity={b.op + 0.3} />
                    </g>
                  ))}
                </pattern>
                <filter id="noise-fino">
                  <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="2" seed="11" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 -0.15" />
                </filter>
                <radialGradient id="luz-cenital" cx="50%" cy="35%" r="80%">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="55%"  stopColor="rgba(255,255,255,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                </radialGradient>
                <linearGradient id="sombra-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(0,0,0,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
                <linearGradient id="sombra-bottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
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
              <rect x="20" y="20" width="1160" height="20"  rx="14" fill="rgba(255,255,255,0.12)" />
              <rect x="20" y="660" width="1160" height="20"        fill="rgba(0,0,0,0.2)" />

              {/* Área central rizada */}
              <g clipPath="url(#rect-clip)">
                <rect x="40" y="40" width="1120" height="620" fill={colorBase.hex} />
                <rect x="40" y="40" width="1120" height="620" fill="url(#bucles)" />
                <rect x="40" y="40" width="1120" height="620" fill={colorBase.hex} filter="url(#noise-fino)" opacity="0.5" />

                {logoProcesado && (
                  <g>
                    <image href={logoProcesado.src} x={logoX} y={logoY} width={logoW} height={logoH} preserveAspectRatio="xMidYMid meet" />
                    <rect x={logoX} y={logoY} width={logoW} height={logoH} fill="url(#bucles)" opacity="0.55" style={{ mixBlendMode: 'multiply' }} />
                  </g>
                )}

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

                <rect x="40" y="40"  width="1120" height="620" fill="url(#luz-cenital)" />
                <rect x="40" y="40"  width="1120" height="40"  fill="url(#sombra-top)" />
                <rect x="40" y="620" width="1120" height="40"  fill="url(#sombra-bottom)" />
              </g>

              {/* Bordes externo e interno (highlight) */}
              <rect x="20" y="20" width="1160" height="660" rx="14" fill="none" stroke="rgba(0,0,0,0.35)"    strokeWidth="2.5" />
              <rect x="22" y="22" width="1156" height="656" rx="13" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
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

      {/* ── Modal de cotización ── */}
      {modalAbierto && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, overflowY: 'auto',
          }}
          onClick={cerrarModal}
        >
          <div
            style={{
              backgroundColor: 'white', borderRadius: 16,
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              width: '100%', maxWidth: 520, margin: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {!enviado ? (
              <form onSubmit={handleEnviar}>
                {/* Header modal */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 20px 16px', borderBottom: '1px solid #e8e5e0',
                }}>
                  <h2 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: 18, color: NAVY, margin: 0 }}>
                    Cotizar este diseño
                  </h2>
                  <button
                    type="button" onClick={cerrarModal}
                    style={{ padding: 6, backgroundColor: '#f5f5f4', border: 'none', borderRadius: 8, cursor: 'pointer', lineHeight: 0 }}
                  >
                    <X style={{ width: 18, height: 18, color: '#57534e' }} />
                  </button>
                </div>

                {/* Campos */}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, maxHeight: '65vh', overflowY: 'auto' }}>
                  {/* Banner info */}
                  <div style={{
                    backgroundColor: `${DORADO}18`, border: `1px solid ${DORADO}44`,
                    borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#78716c',
                  }}>
                    Tu diseño se adjunta automáticamente como PNG al correo de cotización.
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text" name="website" tabIndex={-1} autoComplete="off"
                    value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                    style={{ position: 'absolute', left: -9999, opacity: 0, pointerEvents: 'none' }}
                    aria-hidden="true"
                  />

                  {/* Nombre + Empresa */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 5 }}>Nombre *</label>
                      <input required type="text" value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 5 }}>Empresa</label>
                      <input type="text" value={form.empresa}
                        onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                        style={inputStyle} />
                    </div>
                  </div>

                  {/* Email + Teléfono */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 5 }}>Email *</label>
                      <input required type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 5 }}>Teléfono</label>
                      <input type="tel" placeholder="+56 9..." value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        style={inputStyle} />
                    </div>
                  </div>

                  {/* Medidas */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 5 }}>Medidas (alto × ancho)</label>
                    <input type="text" placeholder="Ej: 80 cm × 120 cm" value={form.medidas}
                      onChange={(e) => setForm({ ...form, medidas: e.target.value })}
                      style={inputStyle} />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 5 }}>Comentarios</label>
                    <textarea
                      rows={3}
                      placeholder="Cantidad, fecha de entrega, observaciones..."
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  {/* Resumen del diseño */}
                  <div style={{
                    backgroundColor: '#fafaf9', borderRadius: 8, padding: '10px 14px',
                    fontSize: 12, color: '#78716c', border: '1px solid #e8e5e0',
                  }}>
                    Configuración: <strong style={{ color: NAVY }}>{colorBase.nombre}</strong>
                    {logoProcesado && (
                      <span> · logo {modoMonocromo ? `monocromo (${colorMonocromo.nombre})` : 'multicolor'}</span>
                    )}
                  </div>

                  {errorForm && (
                    <p style={{ fontSize: 13, color: '#dc2626', textAlign: 'center', margin: 0 }}>{errorForm}</p>
                  )}
                </div>

                {/* Footer modal */}
                <div style={{
                  display: 'flex', gap: 8, padding: 20,
                  borderTop: '1px solid #e8e5e0',
                }}>
                  <button
                    type="button" onClick={cerrarModal}
                    style={{
                      padding: '10px 16px', backgroundColor: '#f5f5f4', color: '#57534e',
                      borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit" disabled={enviando}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '10px 16px', backgroundColor: DORADO, color: NAVY,
                      borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none',
                      cursor: enviando ? 'not-allowed' : 'pointer', opacity: enviando ? 0.6 : 1,
                    }}
                  >
                    {enviando ? (
                      <><Loader2 style={{ width: 16, height: 16 }} className="spin" /> Enviando...</>
                    ) : (
                      <><Send style={{ width: 16, height: 16 }} /> Enviar cotización</>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Estado de éxito */
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72, margin: '0 auto 20px', borderRadius: '50%',
                  backgroundColor: `${DORADO}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle2 style={{ width: 40, height: 40, color: DORADO }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.5rem', color: NAVY, marginBottom: 10 }}>
                  Cotización enviada
                </h2>
                <p style={{ fontSize: 14, color: '#57534e', maxWidth: 380, margin: '0 auto 28px', lineHeight: 1.6 }}>
                  Recibimos tu solicitud junto con el diseño. Te respondemos en menos de 24 horas hábiles a{' '}
                  <strong>{form.email}</strong>.
                </p>
                <button
                  onClick={cerrarModal}
                  style={{
                    padding: '10px 24px', backgroundColor: NAVY, color: 'white',
                    borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
                  }}
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .config-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .configurador-root { padding-top: 64px !important; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
