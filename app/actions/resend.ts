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
      subject: "¡Ey! Gracias por sumarte a Menudo 🥑",
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
      padding: 40px 0;
    }
    .container {
      max-width: 540px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
    }
    .content {
      padding: 40px 32px;
    }
    .headline {
      font-size: 22px;
      font-weight: 800;
      color: #09090b;
      margin-top: 20px;
      margin-bottom: 24px;
      text-align: center;
      letter-spacing: -0.02em;
    }
    .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: #3f3f46;
      margin-bottom: 20px;
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
      font-size: 14px;
      line-height: 1.6;
      color: #27272a;
      margin-bottom: 14px;
    }
    .feature-item:last-child {
      margin-bottom: 0;
    }
    .cta-container {
      text-align: center;
      margin: 32px 0 20px 0;
    }
    .cta-button {
      background-color: #10b981;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 9999px;
      display: inline-block;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    }
    .footer {
      background-color: #fafafa;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #f4f4f5;
      font-size: 12px;
      color: #a1a1aa;
    }
    
    /* Avocado video container */
    .video-container {
      text-align: center;
      margin: 10px auto;
      width: 150px;
      height: 150px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="content">
        <div class="video-container">
          <video autoplay loop muted playsinline width="150" height="150" style="display: block; border-radius: 24px; outline: none;">
            <source src="https://menudoapp.com/videos/animation4.mov" type="video/quicktime">
            <div style="font-size: 64px; line-height: 150px; text-align: center;">🥑</div>
          </video>
        </div>
        
        <h1 class="headline">¡Ey! Gracias por sumarte a Menudo 🥑</h1>
        
        <p class="paragraph">La verdad es que nos cansamos de las apps de finanzas lentas o súper complejas, y por eso estamos creando Menudo. Queremos algo rápido, inteligente y que de verdad sirva en el día a día.</p>
        
        <p class="paragraph">Aquí te dejo una probadita de lo que estamos armando:</p>
        
        <div class="features-list">
          <div class="feature-item">
            <strong>📊 Presupuestos Compartidos:</strong> Lleva las cuentas con tu pareja, roomies o familia en tiempo real y sin fricciones.
          </div>
          <div class="feature-item">
            <strong>⚡ Atajos de Apple (Shortcuts):</strong> Registra tus gastos al instante mediante widgets o automatizaciones de iOS.
          </div>
          <div class="feature-item">
            <strong>🧠 Registro inteligente con IA:</strong> Escribe o habla de forma natural (ej. "pizza por 400 pesos") y la IA lo categoriza al segundo.
          </div>
          <div class="feature-item">
            <strong>🔄 Suscripciones y Recurrentes:</strong> Configura tus gastos fijos (Netflix, renta, Spotify) para que se registren solos mientras duermes.
          </div>
          <div class="feature-item">
            <strong>📡 Offline-First & Idempotencia:</strong> Registra gastos incluso sin señal. Se sincroniza al recuperar internet de forma segura, evitando cobros dobles.
          </div>
        </div>
        
        <div class="cta-container">
          <a href="https://menudoapp.com" class="cta-button" target="_blank">Explorar Menudo</a>
        </div>
        
        <p class="paragraph" style="margin-top: 28px;">Te avisaremos en cuanto tengamos la beta lista para que seas de los primeros en probarla.</p>
        
        <p class="paragraph">Si tienes alguna sugerencia de lo que te gustaría ver en la app, respóndeme directamente a este correo.</p>
        
        <p class="paragraph" style="margin-bottom: 0; font-weight: 700; color: #18181b;">— El equipo de Menudo</p>
      </div>
      <div class="footer">
        <p style="margin-top: 0;">Recibiste este correo porque te registraste en la lista de espera de menudoapp.com.</p>
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
