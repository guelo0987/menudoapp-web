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
      subject: "¡Ey! Qué bueno tenerte en la lista de Menudo 🥑",
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
      max-width: 500px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
    }
    .content {
      padding: 32px 24px;
    }
    .headline {
      font-size: 20px;
      font-weight: 800;
      color: #09090b;
      margin-top: 16px;
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
      border-radius: 12px;
      padding: 16px;
      margin: 20px 0;
      list-style-type: none;
    }
    .feature-item {
      font-size: 13px;
      line-height: 1.5;
      color: #27272a;
      margin-bottom: 12px;
    }
    .feature-item:last-child {
      margin-bottom: 0;
    }
    .footer {
      background-color: #fafafa;
      padding: 20px 24px;
      text-align: center;
      border-top: 1px solid #f4f4f5;
      font-size: 11px;
      color: #a1a1aa;
    }
    .logo-container {
      text-align: center;
      margin: 10px 0;
    }
    .logo-img {
      width: 60px;
      height: 60px;
      border-radius: 14px;
      display: inline-block;
    }
    
    /* Avocado video container */
    .video-container {
      text-align: center;
      margin: 15px auto;
      width: 120px;
      height: 120px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="content">
        <div class="logo-container">
          <img src="https://menudoapp.com/brand/menudo-logo.png" alt="Menudo Logo" class="logo-img" />
        </div>
        
        <div class="video-container">
          <video autoplay loop muted playsinline width="120" height="120" style="display: block; border-radius: 20px; outline: none;">
            <source src="https://menudoapp.com/videos/animation4.mov" type="video/quicktime">
            <div style="font-size: 54px; line-height: 120px; text-align: center;">🥑</div>
          </video>
        </div>
        
        <h1 class="headline">¡Ey! Qué bueno tenerte en la lista de Menudo 🥑</h1>
        
        <p class="paragraph">La verdad es que nos cansamos de las apps de finanzas lentas y complejas, así que decidimos crear algo rápido, inteligente y que sirva de verdad en el día a día.</p>
        
        <p class="paragraph">Te avisaremos de inmediato en cuanto la aplicación esté publicada en la App Store para que la descargues antes que nadie.</p>
        
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
        
        <p class="paragraph" style="margin-top: 24px;">Si tienes alguna sugerencia o quieres decirnos algo sobre lo que esperas de la app, solo responde directamente a este correo. Nos encantaría escucharte.</p>
        
        <p class="paragraph" style="margin-bottom: 0; font-weight: 700; color: #18181b;">— El equipo de Menudo</p>
      </div>
      <div class="footer">
        <p style="margin-top: 0;">Recibiste este correo porque te registraste en menudoapp.com.</p>
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
