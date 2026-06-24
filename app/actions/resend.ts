"use server"

import { Resend } from "resend"

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Correo electrónico no válido" }
  }

  const senderName = "Soporte Menudo"
  const senderEmail = process.env.SENDER_EMAIL || "soporte@menudoapp.com"
  const admin = process.env.ADMIN_EMAIL || "miguelcruzmatias@icloud.com"
  const audienceId = process.env.RESEND_AUDIENCE_ID

  try {
    if (audienceId) {
      // If an audience is configured, add to contacts
      const { data, error } = await resend.contacts.create({
        email: email,
        audienceId: audienceId,
      })
      if (error) {
        console.error("Resend contacts error:", error)
        return { success: false, error: error.message }
      }
    }

    // Send a beautiful welcome HTML email directly to the subscriber
    const welcomeResult = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: email,
      subject: "Gracias por unirte a Menudo",
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a Menudo</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #fafafa;
      color: #18181b;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #fafafa;
      padding: 32px 0;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }
    .header {
      background-color: #ffffff;
      padding: 32px 24px 16px 24px;
      text-align: center;
    }
    .logo-img {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: inline-block;
    }
    .avocado-divider {
      font-size: 40px;
      text-align: center;
      margin: 12px 0;
      line-height: 1;
    }
    .content {
      padding: 0 32px 32px 32px;
    }
    .headline {
      font-size: 20px;
      font-weight: 800;
      color: #09090b;
      margin-top: 8px;
      margin-bottom: 20px;
      text-align: center;
      letter-spacing: -0.02em;
    }
    .paragraph {
      font-size: 14px;
      line-height: 1.55;
      color: #3f3f46;
      margin-bottom: 16px;
    }
    .features-list {
      background-color: #fafafa;
      border: 1px solid #f4f4f5;
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
      list-style-type: none;
    }
    .feature-item {
      font-size: 13px;
      line-height: 1.6;
      color: #27272a;
      margin-bottom: 12px;
    }
    .feature-item:last-child {
      margin-bottom: 0;
    }
    .footer {
      background-color: #fafafa;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #f4f4f5;
      font-size: 11px;
      color: #a1a1aa;
      line-height: 1.5;
    }
    .footer a {
      color: #71717a;
      text-decoration: underline;
    }
    .ps {
      margin-top: 24px;
      font-size: 12px;
      color: #71717a;
      font-style: italic;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="https://menudoapp.com/brand/menudo-logo.png" alt="Menudo Logo" class="logo-img" />
        <div class="avocado-divider">🥑</div>
      </div>
      <div class="content">
        <h1 class="headline">¡Ey! Qué bueno tenerte en la lista de Menudo</h1>
        
        <p class="paragraph">La verdad es que nos cansamos de las apps de finanzas lentas y complejas, así que decidimos crear algo rápido, inteligente y que sirva de verdad en el día a día.</p>
        
        <p class="paragraph">Te avisaremos de inmediato por este correo en cuanto la aplicación esté disponible en la App Store para que la descargues antes que nadie.</p>
        
        <p class="paragraph">Mientras tanto, aquí te dejo las principales cosas que estamos preparando para ti:</p>
        
        <div class="features-list">
          <div class="feature-item">
            <strong>📊 Presupuestos Compartidos:</strong> Lleva las cuentas con tu pareja o familia en tiempo real sin tener que preguntar quién pagó qué.
          </div>
          <div class="feature-item">
            <strong>⚡ Atajos de Apple (Shortcuts):</strong> Registra gastos al instante mediante widgets o automatizaciones de iOS.
          </div>
          <div class="feature-item">
            <strong>🧠 Registro con IA:</strong> Escribe o habla de forma natural (ej. "gasolina por 350 pesos") y la IA lo organiza al segundo.
          </div>
          <div class="feature-item">
            <strong>🔄 Suscripciones y Recurrentes:</strong> Tus gastos fijos (renta, Netflix, Spotify) se registran solos.
          </div>
          <div class="feature-item">
            <strong>📡 Offline-First & Idempotencia:</strong> Registra gastos incluso sin señal. Se sincroniza al recuperar internet de forma segura para evitar cobros dobles.
          </div>
        </div>
        
        <p class="paragraph" style="margin-top: 24px;">Y muchísimas cosas más que ya verás cuando la app esté disponible en el App Store. Registrar y llevar tus finanzas compartidas va a ser de verdad divertido y sin dolores de cabeza.</p>
        
        <p class="paragraph">Si tienes alguna sugerencia o quieres decirnos algo sobre lo que esperas de la app, solo responde directamente a este correo. Nos encantaría escucharte.</p>
        
        <p class="paragraph" style="margin-bottom: 0; font-weight: 700; color: #18181b;">— El equipo de Menudo</p>
        
        <p class="ps">P.D. Si este correo te llegó a la pestaña de Promociones, arrástralo a tu bandeja Principal. Así Gmail sabrá que quieres recibir nuestras alertas en tu bandeja de entrada principal.</p>
      </div>
      <div class="footer">
        <p style="margin-top: 0; margin-bottom: 8px;">Recibiste este correo porque te registraste en la lista de espera de <a href="https://menudoapp.com" target="_blank">menudoapp.com</a>.</p>
        <p style="margin-bottom: 0;">© 2026 Menudo App. Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    })

    if (welcomeResult.error) {
      console.error("Resend welcome email error:", welcomeResult.error)
    }

    // Also send email notification to admin so they stay informed
    await resend.emails.send({
      from: `Boletín Menudo <${senderEmail}>`,
      to: admin,
      subject: "Nuevo Suscriptor - Newsletter Menudo",
      text: `Se ha registrado un nuevo correo para el boletín informativo:\n\nCorreo: ${email}\nFecha: ${new Date().toLocaleString()}`,
    })

    return { success: true }
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error)
    return { 
      success: false, 
      error: error.message || "No se pudo completar la suscripción. Intente más tarde." 
    }
  }
}


export async function sendSupportMessage(formData: { name: string; email: string; message: string }) {
  const { name, email, message } = formData
  
  if (!name || !email || !message) {
    return { success: false, error: "Todos los campos son obligatorios" }
  }

  const sender = process.env.SENDER_EMAIL || "noreply@menudoapp.com"
  const admin = process.env.ADMIN_EMAIL || "miguelcruzmatias@icloud.com"

  try {
    const { data, error } = await resend.emails.send({
      from: `Soporte Menudo <${sender}>`,
      to: admin,
      replyTo: email, // Direct reply to the user's email
      subject: `Soporte Menudo: Mensaje de ${name}`,
      text: `Has recibido un nuevo mensaje de soporte técnico:\n\nNombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}\n\nFecha: ${new Date().toLocaleString()}`,
    })
    if (error) {
      console.error("Resend support email error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Error sending support message:", error)
    return { 
      success: false, 
      error: error.message || "Hubo un error al enviar el mensaje. Intente más tarde." 
    }
  }
}
