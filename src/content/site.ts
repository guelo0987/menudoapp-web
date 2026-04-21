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
    tag: '',
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
    title: 'La app de finanzas que da gusto usar.',
    body:
      'Dile hola a una nueva forma de ver tu dinero. Menudo trae claridad y paz mental a tus gastos diarios para que tú solo te preocupes de disfrutar.',
    chips: ['Gratis para probar', 'Fácil de usar', 'Diseño moderno'],
    primaryCta: { label: 'Descargar ahora', href: '/support' as RouteKey },
    secondaryCta: {
      label: 'Saber más',
      href: '/privacy-policy' as RouteKey,
    },
    spotlightLabel: 'Dashboard',
    spotlightImage: '/placeholders/nuevobannerok.png',
  },
  featureCards: [
    {
      eyebrow: 'Ahorro',
      title: 'Mira cómo crecen tus ahorros',
      body:
        'Sigue tus metas y mira cómo se acumula tu dinero. Es como un juego, pero con resultados reales en tu cuenta.',
      image: '/placeholders/Gemini_Generated_Image_xvlbkjxvlbkjxvlb.png',
      accent: 'cream',
    },
    {
      eyebrow: 'Simplicidad',
      title: 'Arma tu presupuesto en segundos',
      body:
        'Sin hojas de cálculo infinitas. Divide tus gastos por categorías y mantén el control sin esfuerzo.',
      image: '/placeholders/Gemini_Generated_Image_i689bii689bii689.png',
      accent: 'emerald',
    },
    {
      eyebrow: 'Tranquilidad',
      title: 'Adiós a las suscripciones olvidadas',
      body:
        'Menudo te avisa de esos pagos automáticos que ya no usas. Cancela lo que no necesitas con un toque.',
      image: '/placeholders/Gemini_Generated_Image_f7axcpf7axcpf7ax.png',
      accent: 'orange',
    },
  ] satisfies FeatureCard[],
  supportHighlights: [
    'Ayuda real por personas reales',
    'Guías rápidas para empezar',
    'Privacidad total garantizada',
    'Soporte listo para Apple Store',
  ],
  privacyPolicy: {
    title: 'Privacidad de Menudo',
    intro:
      'Nosotros también odiamos los textos legales largos. Aquí te explicamos de forma humana cómo cuidamos tu información.',
    sections: [
      {
        title: '1. Qué sabemos de ti',
        body:
          'Solo lo necesario para que la app funcione: tu correo para la cuenta y los movimientos que tú decidas registrar o sincronizar. Nada más.',
      },
      {
        title: '2. Tu dinero es tuyo',
        body:
          'No vendemos tus datos a nadie. Punto. Usamos tu información solo para mostrarte tus gráficos y ayudarte a ahorrar.',
      },
      {
        title: '3. Tú tienes el control',
        body:
          'En cualquier momento puedes borrar tus datos o cerrar tu cuenta directamente desde los ajustes de la app. Tú decides.',
      },
    ] satisfies LegalSection[],
  },
  terms: {
    title: 'Términos de Uso',
    intro:
      'Al usar Menudo, aceptamos ser buenos vecinos. Aquí están las reglas básicas para que todo funcione bien.',
    sections: [
      {
        title: '1. Uso Responsable',
        body:
          'Menudo es una herramienta para ayudarte. La información que pones es tu responsabilidad y nosotros nos encargamos de que la app siempre esté lista para ti.',
      },
      {
        title: '2. Suscripciones',
        body:
          'Si eliges un plan Pro, Apple o Google gestionan el cobro de forma segura. Puedes cancelar cuando quieras sin preguntas.',
      },
    ] satisfies LegalSection[],
  },
  support: {
    title: 'Centro de Ayuda',
    intro:
      '¿Algo no funciona como esperabas? No te preocupes, estamos aquí para echarte una mano.',
    sections: [
      {
        title: 'Dudas con tu cuenta',
        body:
          'Si tienes problemas para entrar o quieres cambiar algo de tu perfil, escríbenos y lo resolvemos en un momento.',
      },
      {
        title: 'Sugerencias',
        body:
          '¿Falta algo en Menudo? Cuéntanos qué te gustaría ver. Construimos esta app escuchando a la comunidad.',
      },
    ] satisfies LegalSection[],
  },
  privacyChoices: {
    title: 'Tu Cuenta, Tu Privacidad',
    intro:
      'Gestiona tus datos y tu cuenta de forma sencilla y transparente.',
    sections: [
      {
        title: 'Eliminar mis datos',
        body:
          'Puedes solicitar el borrado completo de tu historial financiero desde Ajustes > Privacidad. Sin complicaciones.',
      },
      {
        title: 'Sincronización segura',
        body:
          'Si conectas tu banco, recuerda que puedes desconectarlo cuando quieras. Nosotros solo leemos la información para organizarla por ti.',
      },
    ] satisfies LegalSection[],
  },
  footer: {
    legalLinks: [
      { label: 'Privacidad', href: '/privacy-policy' as RouteKey },
      { label: 'Términos', href: '/terms' as RouteKey },
      { label: 'Opciones de Cuenta', href: '/privacy-choices' as RouteKey },
    ],
  },
} as const;

export const pageMetadata: Record<RouteKey, { title: string; description: string }> =
{
  '/': {
    title: 'Menudo — Finanzas Claros',
    description:
      'Toma el control de tu dinero con Menudo. La app de finanzas personales diseñada para darte claridad y paz mental.',
  },
  '/privacy-policy': {
    title: 'Política de Privacidad',
    description:
      'Conoce cómo protegemos tus datos y respetamos tu privacidad en Menudo.',
  },
  '/terms': {
    title: 'Términos de Servicio',
    description:
      'Condiciones de uso y acuerdo legal para los servicios de Menudo.',
  },
  '/support': {
    title: 'Soporte Menudo',
    description:
      '¿Necesitas ayuda con Menudo? Encuentra respuestas y contacta con nuestro equipo de soporte.',
  },
  '/privacy-choices': {
    title: 'Opciones de Privacidad',
    description:
      'Gestiona tu cuenta, tus datos y tus preferencias de privacidad en Menudo.',
  },
};

