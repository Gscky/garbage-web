'use client'

import { useState, useRef, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { useColor, COLORES_GARBAGE } from '@/context/ColorContext'
import { useTab } from '@/context/TabContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData, PRODUCTOS } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

// ─── Estado del formulario ────────────────────────────────────────────────

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─── Animaciones ──────────────────────────────────────────────────────────

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

// ─── Check animado ────────────────────────────────────────────────────────

function AnimatedCheck() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/10"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-8 w-8 text-[#22c55e]"
        aria-hidden="true"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  )
}

// ─── Select con estilos consistentes ─────────────────────────────────────

interface SelectFieldProps {
  label: string
  id: string
  error?: string
  disabled?: boolean
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLSelectElement>
  name?: string
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField({
  label,
  id,
  error,
  disabled,
  value,
  onChange,
  onBlur,
  name,
}, ref) {
  const hasError = Boolean(error)

  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#1A1A1A]">
        {label}
      </label>
      <select
        id={id}
        name={name}
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={cn(
          'w-full h-11 px-3',
          'rounded-md',
          'bg-white',
          'text-sm text-[#0A1628]',
          'border transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 focus:ring-offset-0',
          !hasError && 'border-[#E5E5E5] focus:border-[#0A1628]',
          hasError && 'border-red-400 focus:border-red-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'appearance-none',
          'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27M6%208l4%204%204-4%27%2F%3E%3C%2Fsvg%3E")]',
          'bg-no-repeat bg-[right_12px_center] bg-[length:20px_20px]',
          'pr-10'
        )}
      >
        <option value="" disabled>
          Seleccioná un producto
        </option>
        {PRODUCTOS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

// ─── Componente principal ─────────────────────────────────────────────────

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState<string>('')
  const [colorOpen, setColorOpen] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoDragOver, setLogoDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { selectedColor, setSelectedColor } = useColor()
  const { prefill, setPrefill } = useTab()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      nombre: prefill.nombre || '',
      empresa: '',
      email: prefill.email || '',
      telefono: '',
      producto: '',
      mensaje: '',
    },
  })

  const isLoading = status === 'loading'

  function handleLogoFile(file: File) {
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
    if (!allowed.includes(file.type) && !file.name.match(/\.(ai|eps)$/i)) return
    setLogoFile(file)
  }

  async function onSubmit(data: ContactFormData) {
    setStatus('loading')
    setServerError('')

    try {
      const fd = new FormData()
      fd.append('nombre', data.nombre)
      fd.append('empresa', data.empresa ?? '')
      fd.append('email', data.email)
      fd.append('telefono', data.telefono ?? '')
      fd.append('producto', data.producto)
      fd.append('mensaje', data.mensaje)
      fd.append('color', selectedColor?.nombre ?? 'No especificado')
      fd.append('website', data.website ?? '') // honeypot
      if (logoFile) fd.append('logo', logoFile)

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: fd,
        // Sin Content-Type: el browser lo pone con el boundary correcto
      })

      const json = (await res.json()) as { success: boolean; message: string }

      if (!res.ok || !json.success) {
        setServerError(
          json.message ?? 'Algo falló al enviar. Intenta de nuevo o llámanos al +56 2 2683 6012.'
        )
        setStatus('error')
        return
      }

      setStatus('success')
      setPrefill({ nombre: '', email: '' })
      reset()
      setLogoFile(null)
    } catch {
      setServerError('Algo falló al enviar. Intenta de nuevo o llámanos al +56 2 2683 6012.')
      setStatus('error')
    }
  }

  // ── Estado: éxito ──
  if (status === 'success') {
    return (
      <motion.div
        key="success"
        {...fadeIn}
        className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white px-8 py-16 text-center shadow-sm"
      >
        <AnimatedCheck />
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold text-[#1A1A1A]"
        >
          ¡Mensaje enviado!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-2 text-sm text-[#6B7280]"
        >
          Te respondemos en menos de 24 horas.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-[#0A1628] underline underline-offset-2 hover:text-[#1a2d4a] transition-colors"
        >
          Enviar otra consulta
        </motion.button>
      </motion.div>
    )
  }

  // ── Estado: formulario (idle | loading | error) ──
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm md:p-8"
    >
      {/* Honeypot — oculto para humanos, visible para bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
        {...register('website')}
      />

      <div className="space-y-5">
        {/* Nombre */}
        <Input
          label="Nombre *"
          placeholder="Juan Pérez"
          error={errors.nombre?.message}
          disabled={isLoading}
          {...register('nombre')}
        />

        {/* Fila: email + teléfono */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Email *"
            type="email"
            placeholder="juan@empresa.cl"
            error={errors.email?.message}
            disabled={isLoading}
            {...register('email')}
          />
          <Input
            label="Teléfono"
            type="tel"
            placeholder="+56 9 1234 5678"
            error={errors.telefono?.message}
            disabled={isLoading}
            {...register('telefono')}
          />
        </div>

        {/* Producto */}
        <SelectField
          id="producto"
          label="Producto que te interesa *"
          error={errors.producto?.message}
          disabled={isLoading}
          {...register('producto')}
        />

        {/* Color del limpiapiés — selector desplegable */}
        <div style={{ marginBottom: '0' }}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: '#0A1628',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-dm-sans)',
          }}>
            Color del limpiapiés (opcional)
          </label>

          {/* Trigger */}
          <div
            onClick={() => setColorOpen(!colorOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: '#FFFFFF',
              border: selectedColor
                ? '1px solid #0A1628'
                : '1px solid rgba(10,22,40,0.2)',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {selectedColor ? (
                <>
                  <div style={{
                    width: '18px', height: '18px',
                    borderRadius: '50%',
                    background: selectedColor.hex,
                    border: '1px solid rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.85rem', color: '#0A1628' }}>
                    {selectedColor.nombre}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: '0.85rem', color: 'rgba(10,22,40,0.4)' }}>
                  Selecciona un color
                </span>
              )}
            </div>
            <span style={{
              fontSize: '0.7rem',
              color: 'rgba(10,22,40,0.4)',
              transform: colorOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
              display: 'inline-block',
            }}>▼</span>
          </div>

          {/* Panel desplegable */}
          {colorOpen && (
            <div style={{
              marginTop: '8px',
              padding: '1rem',
              background: '#FFFFFF',
              border: '1px solid rgba(10,22,40,0.1)',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(10,22,40,0.1)',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '8px',
                marginBottom: '0.8rem',
              }}>
                {COLORES_GARBAGE.map((color) => (
                  <div
                    key={color.nombre}
                    onClick={() => {
                      setSelectedColor(color)
                      setColorOpen(false)
                    }}
                    title={color.nombre}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: selectedColor?.nombre === color.nombre
                        ? '2px solid #0A1628'
                        : '2px solid transparent',
                      outline: selectedColor?.nombre === color.nombre
                        ? '2px solid rgba(10,22,40,0.2)'
                        : 'none',
                      outlineOffset: '2px',
                      cursor: 'pointer',
                      transition: 'transform 0.15s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  />
                ))}
              </div>
              <p style={{
                fontSize: '0.65rem',
                color: 'rgba(10,22,40,0.35)',
                margin: 0,
                fontFamily: 'var(--font-dm-sans)',
              }}>
                Colores únicos de fábrica · Sin variedad Pantone
              </p>
            </div>
          )}
        </div>

        {/* Logo de la empresa */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: '#0A1628',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-dm-sans)',
          }}>
            Logo de tu empresa (opcional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf,.ai,.eps"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleLogoFile(file)
            }}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setLogoDragOver(true) }}
            onDragLeave={() => setLogoDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setLogoDragOver(false)
              const file = e.dataTransfer.files?.[0]
              if (file) handleLogoFile(file)
            }}
            style={{
              border: `2px dashed ${logoDragOver ? '#0A1628' : logoFile ? '#22c55e' : 'rgba(10,22,40,0.2)'}`,
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
              background: logoDragOver ? 'rgba(10,22,40,0.03)' : logoFile ? 'rgba(34,197,94,0.04)' : 'transparent',
            }}
          >
            {logoFile ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: '0.82rem', color: '#374151', fontFamily: 'var(--font-dm-sans)' }}>
                  {logoFile.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLogoFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(10,22,40,0.4)', fontSize: '0.75rem', padding: '0 4px' }}
                  aria-label="Quitar logo"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(10,22,40,0.3)" strokeWidth="1.5" style={{ width: '28px', height: '28px', margin: '0 auto 0.4rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p style={{ fontSize: '0.78rem', color: 'rgba(10,22,40,0.5)', margin: 0, fontFamily: 'var(--font-dm-sans)' }}>
                  Arrastrá o hacé click para subir
                </p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(10,22,40,0.35)', margin: '0.2rem 0 0', fontFamily: 'var(--font-dm-sans)' }}>
                  PNG, JPG, SVG, PDF, AI, EPS
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje */}
        <Textarea
          label="Contanos sobre tu proyecto *"
          placeholder="Cantidad aproximada, uso previsto, si tienes logo o diseño, plazos, etc."
          error={errors.mensaje?.message}
          disabled={isLoading}
          rows={4}
          {...register('mensaje')}
        />

        {/* Error del servidor */}
        <AnimatePresence>
          {status === 'error' && serverError && (
            <motion.div
              key="server-error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Enviando...' : 'Enviar cotización'}
        </Button>

        <p className="text-center text-xs text-[#9CA3AF]">
          * Campos obligatorios
        </p>
      </div>
    </form>
  )
}
