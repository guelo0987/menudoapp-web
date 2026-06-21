"use server"

import { Resend } from "resend"

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Correo electrónico no válido" }
  }

  const sender = process.env.SENDER_EMAIL || "noreply@menudoapp.com"
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
    } else {
      // Fallback: Send email notification to admin
      const { data, error } = await resend.emails.send({
        from: `Boletín Menudo <${sender}>`,
        to: admin,
        subject: "Nuevo Suscriptor - Newsletter Menudo",
        text: `Se ha registrado un nuevo correo para el boletín informativo:\n\nCorreo: ${email}\nFecha: ${new Date().toLocaleString()}`,
      })
      if (error) {
        console.error("Resend email error:", error)
        return { success: false, error: error.message }
      }
    }

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
