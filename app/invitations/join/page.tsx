import type { Metadata } from 'next'
import InvitationJoinPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — Te han invitado a una lista compartida | Shared List Invitation',
  description: 'Únete a la lista de gastos compartida en Menudo. Empieza a registrar transacciones familiares o de pareja de forma sincronizada y segura.',
  alternates: {
    canonical: 'https://menudoapp.com/invitations/join',
  }
}

export default function InvitationJoinPage() {
  return <InvitationJoinPageClient />
}
