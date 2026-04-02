'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

function SelectField({
  label,
  id,
  error,
  disabled,
  value,
  onChange,
  onBlur,
  name,
}: SelectFieldProps) {
  const hasError = Boolean(error)

  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#1A1A1A]">
        {label}
      </label>
      <select
        id={id}
        name={name}
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
          'text-sm text-[#1A1A1A]',
          'border transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[#E63000] focus:ring-offset-0',
          !hasError && 'border-[#E5E5E5] focus:border-[#E63000]',
          hasError && 'border-[#E63000] focus:border-[#E63000]',
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
        <p id={`${id}-error`} className="text-xs text-[#E63000]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      empresa: '',
      email: '',
      telefono: '',
      producto: '',
      mensaje: '',
    },
  })

  const isLoading = status === 'loading'

  async function onSubmit(data: ContactFormData) {
    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = (await res.json()) as { success: boolean; message: string }

      if (!res.ok || !json.success) {
        setServerError(
          json.message ?? 'Algo falló al enviar. Intentá de nuevo o llamanos al +56 2 2683 6012.'
        )
        setStatus('error')
        return
      }

      setStatus('success')
      reset()
    } catch {
      setServerError('Algo falló al enviar. Intentá de nuevo o llamanos al +56 2 2683 6012.')
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
          className="mt-6 text-sm text-[#E63000] underline underline-offset-2 hover:text-[#C42800] transition-colors"
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
      <div className="space-y-5">
        {/* Fila: nombre + empresa */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Nombre *"
            placeholder="Juan Pérez"
            error={errors.nombre?.message}
            disabled={isLoading}
            {...register('nombre')}
          />
          <Input
            label="Empresa *"
            placeholder="Empresa S.A."
            error={errors.empresa?.message}
            disabled={isLoading}
            {...register('empresa')}
          />
        </div>

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

        {/* Mensaje */}
        <Textarea
          label="Contanos sobre tu proyecto *"
          placeholder="Cantidad aproximada, uso previsto, si tenés logo o diseño, plazos, etc."
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
              <div className="rounded-md border border-[#E63000]/30 bg-[#E63000]/5 px-4 py-3 text-sm text-[#E63000]">
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
