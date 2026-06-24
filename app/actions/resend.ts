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
  <title>Bienvenido a Menudo</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #1c1917;
      max-width: 550px;
      margin: 0 auto;
      padding: 20px;
    }
    p {
      margin-bottom: 16px;
    }
    ul {
      padding-left: 20px;
      margin-bottom: 16px;
    }
    li {
      margin-bottom: 8px;
    }
    .signature {
      margin-top: 24px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <p>¡Ey! Qué bueno tenerte en la lista de espera de Menudo 🥑</p>
  
  <p>La verdad es que nos cansamos de las apps de finanzas lentas y complejas, así que decidimos crear algo rápido, inteligente y que sirva de verdad en el día a día.</p>
  
  <p>Te avisaremos de inmediato por este correo en cuanto la aplicación esté disponible en la App Store para descargar.</p>
  
  <p>Mientras tanto, te cuento algunas de las cosas que estamos preparando para ti:</p>
  
  <ul>
    <li><strong>Presupuestos Compartidos:</strong> Lleva las cuentas con tu pareja o familia en tiempo real y sin fricciones.</li>
    <li><strong>Atajos de Apple (Shortcuts):</strong> Registra tus gastos al instante mediante widgets o automatizaciones de iOS.</li>
    <li><strong>Registro con IA:</strong> Habla o escribe de forma natural (ej. "pizza por 400 pesos") y la IA lo organiza al segundo.</li>
    <li><strong>Suscripciones y Recurrentes:</strong> Tus gastos fijos (renta, Netflix, Spotify) se registran solos.</li>
    <li><strong>Offline-First:</strong> Registra tus gastos aunque no tengas señal. Sincroniza al recuperar internet de forma segura para evitar cobros dobles.</li>
  </ul>
  
  <p>Y muchísimas cosas más que ya verás cuando la app esté disponible en el App Store. Registrar y llevar tus finanzas compartidas va a ser de verdad divertido y sin dolores de cabeza.</p>
  
  <p>Si tienes alguna sugerencia o quieres decirnos algo sobre lo que esperas de la app, solo responde directamente a este correo. Nos encantaría leerte.</p>
  
  <p class="signature">— El equipo de Menudo</p>
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
