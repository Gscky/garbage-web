import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations'

// ─── Rate limiting (en memoria — simple, sin Redis) ───────────────────────

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const RATE_LIMIT_MAX = 5           // requests máximos por ventana
const RATE_LIMIT_WINDOW = 60 * 60 * 1000  // 1 hora en ms

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  entry.count += 1
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count }
}

// ─── Limpiar entradas vencidas periodicamente ─────────────────────────────

function purgeExpiredEntries() {
  const now = Date.now()
  for (const [key, entry] of Array.from(rateLimitMap.entries())) {
    if (now >= entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}

// ─── Resend client ────────────────────────────────────────────────────────



// ─── Handler POST ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Verificar RESEND_API_KEY
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact/route] RESEND_API_KEY no esta configurado.")
    return NextResponse.json(
      { success: false, message: "Error de configuracion." },
      { status: 500 }
    )
  }
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Purgar entradas vencidas cada request (bajo overhead)
  purgeExpiredEntries()

  // Obtener IP del request
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  // Verificar rate limit
  const { allowed, remaining } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Demasiados intentos. Esperá un momento antes de intentar de nuevo.',
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  // Parsear body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'El cuerpo del request no es válido.' },
      { status: 400 }
    )
  }

  // Validación server-side con Zod
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Datos inválidos.'
    return NextResponse.json(
      { success: false, message: firstError },
      { status: 422 }
    )
  }

  const { nombre, empresa, email, telefono, producto, mensaje } = parsed.data
  const color = (body as Record<string, unknown>)['color'] as string | undefined

  // Verificar variable de entorno
  const destinatario = process.env.CONTACT_EMAIL
  if (!destinatario) {
    console.error('[contact/route] CONTACT_EMAIL no está configurado.')
    return NextResponse.json(
      { success: false, message: 'Error de configuración del servidor. Llamanos al +56 2 2683 6012.' },
      { status: 500 }
    )
  }

  // Enviar email con Resend
  try {
    const { error } = await resend.emails.send({
      from: 'Garbage Web <noreply@garbage.cl>',
      to: [destinatario],
      replyTo: email,
      subject: `Nueva cotización: ${producto} — ${empresa}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
          <div style="background: #E63000; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nueva solicitud de cotización</h1>
          </div>
          <div style="padding: 32px; background: #ffffff; border: 1px solid #E5E5E5; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600; width: 140px;">Nombre</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">
                  <a href="mailto:${email}" style="color: #E63000;">${email}</a>
                </td>
              </tr>
              ${
                telefono
                  ? `<tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Teléfono</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${telefono}</td>
                    </tr>`
                  : ''
              }
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Producto</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${producto}</td>
              </tr>
              ${color ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Color</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${color}</td>
              </tr>` : ''}
              ${empresa ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0; font-weight: 600;">Empresa</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F0;">${empresa}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px;">
              <p style="font-weight: 600; margin-bottom: 8px;">Mensaje:</p>
              <p style="background: #F5F5F5; padding: 16px; border-radius: 6px; white-space: pre-line; margin: 0;">${mensaje}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #F5F5F5; text-align: center; font-size: 12px; color: #9CA3AF;">
            Garbage — Limpiapiés Personalizados | La Raza #1695, Santiago, Chile
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[contact/route] Error de Resend:', error)
      return NextResponse.json(
        { success: false, message: 'Algo falló al enviar. Intenta de nuevo o llámanos al +56 2 2683 6012.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: '¡Mensaje enviado! Te respondemos en menos de 24 horas.' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    )
  } catch (err) {
    console.error('[contact/route] Error inesperado:', err)
    return NextResponse.json(
      { success: false, message: 'Algo falló al enviar. Intenta de nuevo o llámanos al +56 2 2683 6012.' },
      { status: 500 }
    )
  }
}
