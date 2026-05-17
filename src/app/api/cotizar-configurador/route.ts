import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { z } from 'zod'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'garbage_configurador',
})

const schema = z.object({
  nombre:    z.string().min(2, 'Nombre requerido').max(100),
  email:     z.string().email('Email inválido'),
  telefono:  z.string().max(30).optional(),
  empresa:   z.string().max(100).optional(),
  medidas:   z.string().max(200).optional(),
  mensaje:   z.string().max(2000).optional(),
  colorBase: z.string().max(50).optional(),
  logoTipo:  z.string().max(100).optional(),
  tamanoLogo: z.string().max(10).optional(),
  website:   z.string().max(0, 'Bot detectado').optional(),
})

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Error de configuración.' }, { status: 500 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const { success: allowed, remaining } = await ratelimit.limit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera un momento.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 })
  }

  const raw = {
    nombre:     formData.get('nombre'),
    email:      formData.get('email'),
    telefono:   formData.get('telefono') || undefined,
    empresa:    formData.get('empresa') || undefined,
    medidas:    formData.get('medidas') || undefined,
    mensaje:    formData.get('mensaje') || undefined,
    colorBase:  formData.get('colorBase') || undefined,
    logoTipo:   formData.get('logoTipo') || undefined,
    tamanoLogo: formData.get('tamanoLogo') || undefined,
    website:    formData.get('website') || undefined,
  }

  // Honeypot
  if (raw.website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' },
      { status: 422 }
    )
  }

  const { nombre, email, telefono, empresa, medidas, mensaje, colorBase, logoTipo, tamanoLogo } = parsed.data

  const destinatario = process.env.CONTACT_EMAIL
  if (!destinatario) {
    return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 })
  }

  type Attachment = { filename: string; content: Buffer }
  const attachments: Attachment[] = []

  const previewFile = formData.get('preview')
  if (previewFile instanceof File && previewFile.size > 0) {
    attachments.push({
      filename: 'preview-diseno.png',
      content: Buffer.from(await previewFile.arrayBuffer()),
    })
  }

  const logoOriginal = formData.get('logoOriginal')
  if (logoOriginal instanceof File && logoOriginal.size > 0) {
    attachments.push({
      filename: logoOriginal.name,
      content: Buffer.from(await logoOriginal.arrayBuffer()),
    })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'Garbage Web <onboarding@resend.dev>'

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: [destinatario],
    replyTo: email,
    subject: `Cotización configurador — ${colorBase ?? 'sin color'} · ${empresa || nombre}`,
    attachments,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
        <div style="background: #0A1628; padding: 24px 32px;">
          <h1 style="color: #C8A96E; margin: 0; font-size: 20px;">Nueva cotización — Configurador</h1>
        </div>
        <div style="padding: 32px; background: #ffffff; border: 1px solid #E5E5E5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600; width: 140px;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${nombre}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;"><a href="mailto:${email}" style="color: #0A1628;">${email}</a></td></tr>
            ${telefono ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Teléfono</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${telefono}</td></tr>` : ''}
            ${empresa ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Empresa</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${empresa}</td></tr>` : ''}
            ${medidas ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Medidas</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${medidas}</td></tr>` : ''}
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Color base</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${colorBase ?? '—'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Logo</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${logoTipo ?? '—'} ${tamanoLogo ? `· ${tamanoLogo}%` : ''}</td></tr>
            ${attachments.length > 0 ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Adjuntos</td><td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${attachments.map(a => a.filename).join(', ')}</td></tr>` : ''}
          </table>
          ${mensaje ? `<div style="margin-top: 24px;"><p style="font-weight: 600; margin-bottom: 8px;">Comentarios:</p><p style="background: #F5F5F5; padding: 16px; border-radius: 6px; white-space: pre-line; margin: 0;">${mensaje}</p></div>` : ''}
        </div>
        <div style="padding: 16px 32px; background: #F5F5F5; text-align: center; font-size: 12px; color: #9CA3AF;">
          Garbage — Configurador | La Raza #1695, Santiago, Chile
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('[cotizar-configurador] Resend error:', error)
    return NextResponse.json(
      { error: 'Error al enviar. Llámanos al +56 2 2683 6012.' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
