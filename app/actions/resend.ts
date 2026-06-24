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
      subject: "¡Ya estás en la lista de espera de Menudo! 🚀",
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
      background-color: #f4f4f5;
      color: #18181b;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f4f4f5;
      padding: 32px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #ffffff;
      padding: 32px 24px;
      text-align: center;
      border-bottom: 1px solid #f4f4f5;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #10b981;
      letter-spacing: -0.05em;
    }
    .content {
      padding: 40px 32px;
    }
    .headline {
      font-size: 20px;
      font-weight: 700;
      color: #09090b;
      margin-top: 0;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: #52525b;
      margin-bottom: 24px;
    }
    .features-list {
      margin-bottom: 32px;
      padding-left: 0;
      list-style-type: none;
    }
    .feature-item {
      font-size: 14px;
      line-height: 1.5;
      color: #3f3f46;
      margin-bottom: 16px;
      display: flex;
      align-items: flex-start;
    }
    .feature-icon {
      color: #10b981;
      font-weight: bold;
      margin-right: 8px;
    }
    .cta-container {
      text-align: center;
      margin-bottom: 32px;
      margin-top: 24px;
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
    }
    .footer {
      background-color: #fafafa;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #f4f4f5;
      font-size: 12px;
      color: #a1a1aa;
    }
    .footer a {
      color: #71717a;
      text-decoration: underline;
    }
    
    /* Avocado Animation styling */
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .avocado-box {
      text-align: center;
      padding: 10px 0 20px 0;
    }
    .avocado-animated {
      display: inline-block;
      font-size: 54px;
      animation: float 2.5s ease-in-out infinite;
      cursor: default;
      user-select: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">Menudo</div>
      </div>
      <div class="content">
        <div class="avocado-box">
          <span class="avocado-animated">🥑</span>
        </div>
        <h1 class="headline">¡Ya estás en la lista de espera de Menudo! 🥑🚀</h1>
        <p class="paragraph">Hola,</p>
        <p class="paragraph">Gracias por registrarte para recibir novedades sobre el lanzamiento de Menudo. Estamos trabajando arduamente para crear la herramienta de finanzas compartidas más rápida, inteligente y fluida del mercado.</p>
        
        <p class="paragraph"><strong>¿Qué hace a Menudo diferente?</strong></p>
        <ul class="features-list">
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <div><strong>Control Compartido:</strong> Comparte presupuestos en tiempo real con tu pareja, roomies o familia sin fricciones ni malentendidos.</div>
          </li>
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <div><strong>Registro Inteligente con IA:</strong> Escribe o habla con lenguaje natural (ej. "pagamos la pizza de anoche por 450 pesos") y nuestra IA organiza el gasto al instante.</div>
          </li>
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <div><strong>Arquitectura Offline-First:</strong> Registra tus gastos estés donde estés (incluso sin internet en el súper), la app sincronizará todo de manera segura al recuperar señal.</div>
          </li>
        </ul>
        
        <div class="cta-container">
          <a href="https://menudoapp.com" class="cta-button" target="_blank">Visitar Sitio Web</a>
        </div>
        
        <p class="paragraph">Si tienes alguna pregunta, sugerencia o simplemente quieres darnos feedback de lo que esperas de la app, puedes responder directamente a este correo o escribirnos a <a href="mailto:soporte@menudoapp.com" style="color: #10b981; text-decoration: none;">soporte@menudoapp.com</a>.</p>
        
        <p class="paragraph" style="margin-bottom: 0;">— El equipo de Menudo</p>
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
