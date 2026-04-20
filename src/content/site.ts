export type RouteKey =
  | '/'
  | '/privacy-policy'
  | '/terms'
  | '/support'
  | '/privacy-choices';

type NavItem = {
  label: string;
  href: RouteKey;
};

type FeatureCard = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  accent: 'emerald' | 'orange' | 'cream';
};

type LegalSection = {
  title: string;
  body: string;
};

const siteUrl =
  import.meta.env.VITE_SITE_URL?.trim() || 'https://menudoapp.com';

const supportEmail =
  import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'hola@menudoapp.com';

const supportPhone = import.meta.env.VITE_SUPPORT_PHONE?.trim() || '';
const supportAddress = import.meta.env.VITE_SUPPORT_ADDRESS?.trim() || '';
const appStoreUrl = import.meta.env.VITE_APP_STORE_URL?.trim() || '';
const playStoreUrl = import.meta.env.VITE_PLAY_STORE_URL?.trim() || '';
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL?.trim() || '';
const tiktokUrl = import.meta.env.VITE_TIKTOK_URL?.trim() || '';

export const siteContent = {
  brand: {
    name: 'Menudo',
    tag: 'Finanzas personales con claridad',
    siteUrl,
    supportEmail,
    supportPhone,
    supportAddress,
    logoMark: '/brand/menudo-logo.png',
    wordmark: '/brand/menudo-logo.png',
  },
  stores: {
    appStoreUrl,
    playStoreUrl,
  },
  social: {
    instagramUrl,
    tiktokUrl,
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Privacidad', href: '/privacy-policy' },
    { label: 'Términos', href: '/terms' },
    { label: 'Soporte', href: '/support' },
  ] satisfies NavItem[],
  hero: {
    eyebrow: 'Menudo App',
    title: 'Tu dinero, más claro y menos pesado.',
    body:
      'Una web limpia para presentar Menudo, centralizar soporte y publicar tus políticas sin mezclar branding, legal y ayuda dentro del backend.',
    chips: ['Presupuestos claros', 'Metas con contexto', 'Soporte serio'],
    primaryCta: { label: 'Ir a soporte', href: '/support' as RouteKey },
    secondaryCta: {
      label: 'Leer privacidad',
      href: '/privacy-policy' as RouteKey,
    },
    spotlightLabel: 'Mockup principal',
    spotlightImage: '/placeholders/hero-device.svg',
  },
  featureCards: [
    {
      eyebrow: 'Simple',
      title: 'Una home ligera y moderna',
      body:
        'Presenta Menudo sin ruido visual, con jerarquía limpia, llamadas claras y una dirección visual consistente con tu app.',
      image: '/placeholders/feature-home.svg',
      accent: 'cream',
    },
    {
      eyebrow: 'Legal',
      title: 'Privacidad y términos listos para publicar',
      body:
        'Páginas separadas, fáciles de editar, con copy centralizado y preparadas para enlazarse desde App Store Connect y el paywall.',
      image: '/placeholders/feature-legal.svg',
      accent: 'emerald',
    },
    {
      eyebrow: 'Soporte',
      title: 'Un punto serio para ayuda real',
      body:
        'Soporte, privacidad de cuenta y datos de contacto en una misma arquitectura limpia, sin meter HTML improvisado dentro del backend.',
      image: '/placeholders/feature-support.svg',
      accent: 'orange',
    },
  ] satisfies FeatureCard[],
  supportHighlights: [
    'Correo de soporte visible',
    'Espacio para dirección legal y teléfono',
    'Enlaces listos para App Store Connect',
    'Páginas preparadas para screenshots y logos reales',
  ],
  privacyPolicy: {
    title: 'Política de privacidad',
    intro:
      'Este texto está pensado como base editorial limpia. Sustituye los detalles legales finales de tu empresa, retención y terceros antes de publicar.',
    sections: [
      {
        title: '1. Qué datos usamos',
        body:
          'Menudo puede procesar información de cuenta, perfil, carteras, presupuestos, transacciones, categorías, alertas e información de suscripción para operar la experiencia principal de la app.',
      },
      {
        title: '2. Para qué los usamos',
        body:
          'Usamos esos datos para autenticarte, guardar tu progreso, mostrar tus finanzas, habilitar presupuestos compartidos y responder solicitudes de soporte.',
      },
      {
        title: '3. Conservación y control',
        body:
          'Puedes corregir datos desde la app y solicitar la eliminación de tu cuenta. Algunos registros pueden conservarse por el tiempo que exijan obligaciones legales, fiscales o de seguridad.',
      },
      {
        title: '4. Contacto',
        body:
          'Si tienes preguntas sobre privacidad, escríbenos al correo de soporte publicado en esta web.',
      },
    ] satisfies LegalSection[],
  },
  terms: {
    title: 'Términos de servicio',
    intro:
      'Esta base resume el uso responsable de Menudo. Antes de publicar, complétala con tu entidad legal, jurisdicción y cualquier política particular de suscripciones o contenido.',
    sections: [
      {
        title: '1. Uso de la cuenta',
        body:
          'Eres responsable de mantener seguro tu acceso y de revisar la información financiera que registras o compartes dentro de Menudo.',
      },
      {
        title: '2. Suscripciones y cobros',
        body:
          'Los planes pagos y renovaciones se gestionan por Apple u otros proveedores de compra en la plataforma correspondiente. Cancelar una suscripción no borra automáticamente la cuenta.',
      },
      {
        title: '3. Disponibilidad del servicio',
        body:
          'Podemos actualizar, mejorar o retirar funciones para mantener Menudo usable, segura y alineada con el producto.',
      },
      {
        title: '4. Soporte',
        body:
          'Si necesitas ayuda, soporte o aclaraciones sobre el servicio, usa los datos visibles en la página de soporte.',
      },
    ] satisfies LegalSection[],
  },
  support: {
    title: 'Centro de soporte',
    intro:
      'Este espacio sirve como Support URL real para App Store Connect y como punto público para ayuda, contacto y solicitudes generales.',
    sections: [
      {
        title: 'Ayuda con acceso',
        body:
          'Si no puedes entrar, primero prueba el flujo de recuperación dentro de Menudo. Si el enlace no llega o falla, escríbenos con el correo de tu cuenta.',
      },
      {
        title: 'Bugs y mejoras',
        body:
          'Incluye capturas, una descripción breve y el dispositivo donde pasó. Eso acelera mucho la respuesta.',
      },
      {
        title: 'Suscripciones',
        body:
          'Si tienes un plan activo, revisa primero la gestión de suscripciones de Apple. Para dudas puntuales, contáctanos y añade la fecha o el plan afectado.',
      },
    ] satisfies LegalSection[],
  },
  privacyChoices: {
    title: 'Privacidad y control de cuenta',
    intro:
      'Esta página explica cómo gestionar tu cuenta, cambiar contraseña y pedir eliminación desde la app.',
    sections: [
      {
        title: 'Eliminar cuenta',
        body:
          'Desde Menudo puedes ir a Ajustes > Mi perfil > Eliminar cuenta. Si tienes una suscripción activa, cancélala primero desde Apple si no quieres cargos futuros.',
      },
      {
        title: 'Cambiar contraseña',
        body:
          'Si usas correo y contraseña, puedes pedir un enlace de recuperación desde el login o desde la sección de seguridad dentro de tu perfil.',
      },
      {
        title: 'Soporte y privacidad',
        body:
          'Usa el correo de soporte público si necesitas ayuda adicional con tu cuenta, tus datos o cualquier solicitud operativa.',
      },
    ] satisfies LegalSection[],
  },
  footer: {
    legalLinks: [
      { label: 'Privacidad', href: '/privacy-policy' as RouteKey },
      { label: 'Términos', href: '/terms' as RouteKey },
      { label: 'Cuenta y privacidad', href: '/privacy-choices' as RouteKey },
    ],
  },
} as const;

export const pageMetadata: Record<RouteKey, { title: string; description: string }> =
  {
    '/': {
      title: 'Menudo',
      description:
        'Menudo organiza soporte, marca y páginas legales en una web simple y moderna.',
    },
    '/privacy-policy': {
      title: 'Política de privacidad',
      description:
        'Política de privacidad pública para Menudo, lista para enlazarse desde App Store Connect.',
    },
    '/terms': {
      title: 'Términos de servicio',
      description:
        'Términos de servicio públicos para Menudo, con estructura limpia y editable.',
    },
    '/support': {
      title: 'Centro de soporte',
      description:
        'Soporte público para Menudo con correo, contacto y estructura para App Store Connect.',
    },
    '/privacy-choices': {
      title: 'Privacidad y cuenta',
      description:
        'Explicación pública de cómo gestionar privacidad, contraseña y eliminación de cuenta en Menudo.',
    },
  };
