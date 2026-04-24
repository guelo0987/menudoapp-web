export type RouteKey =
  | '/'
  | '/privacy-policy'
  | '/terms'
  | '/support'
  | '/privacy-choices'
  | '/auth/confirm'
  | '/auth/reset-password';

export type Language = 'es' | 'en';

type NavItem = {
  label: string;
  href: RouteKey;
};

type BenefitCard = {
  title: string;
  body: string;
  image: string;
};

type InfoSection = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  items: string[];
  imagePosition: 'left' | 'right';
};

type LegalSection = {
  title: string;
  body: string;
};

export const siteContent = {
  brand: {
    name: 'Menudo',
    tag: '',
    logoMark: '/brand/menudo-logo.png',
    qrCode: '/placeholders/qr-mock.svg',
    supportEmail: 'info@garauyan.resend.app',
    supportPhone: '',
    supportAddress: '',
  },
  heroShared: {
    spotlightLabel: 'Dashboard',
    spotlightImage: '/placeholders/nuevobannerok.png',
  },
  es: {
    nav: [
      { label: 'Inicio', href: '/' },
      { label: 'Privacidad', href: '/privacy-policy' },
      { label: 'Términos', href: '/terms' },
      { label: 'Soporte', href: '/support' },
    ] satisfies NavItem[],
    hero: {
      eyebrow: 'Menudo App',
      title: 'Mira tus gastos con claridad. Sin esfuerzo.',
      body: 'Escribe, habla o automatiza: Menudo organiza tus finanzas para que tú no tengas que pensar en ello.',
      chips: ['Gratis', 'Fácil', 'Moderno'],
      primaryCta: 'Descargar ahora',
      secondaryCta: 'Saber más',
    },
    benefits: [
      {
        title: 'Registra sin fricción',
        body: 'Escribe una nota, habla naturalmente o deja que las automatizaciones lo hagan por ti.',
        image: '/Gemini_Generated_Image_i689bii689bii689.png',
      },
      {
        title: 'Crea el hábito',
        body: 'Cuando registrar toma segundos, realmente lo haces. La consistencia se vuelve natural.',
        image: '/Gemini_Generated_Image_f7axcpf7axcpf7ax.png',
      },
      {
        title: 'Visión completa',
        body: 'Entiende tus patrones con gráficos automáticos que te dicen la verdad de tu dinero.',
        image: '/Gemini_Generated_Image_xvlbkjxvlbkjxvlb.png',
      },
    ] satisfies BenefitCard[],
    infoSections: [
      {
        eyebrow: 'Automatización',
        title: 'Paga con Apple Pay. Registra solo.',
        body: 'Cada vez que usas Apple Pay, Menudo registra el gasto automáticamente mediante Atajos de iOS.',
        image: '/placeholders/feature-home.svg',
        imagePosition: 'right',
        items: ['Post-pago instantáneo', 'Cero esfuerzo', 'Atajos de Apple™'],
      },
      {
        eyebrow: 'Reportes Detallados',
        title: 'Tus finanzas contadas con gráficos.',
        body: 'Visualiza a dónde va cada centavo con reportes automáticos generados por tu backend.',
        image: '/Gemini_Generated_Image_a3ycc6a3ycc6a3yc.png',
        imagePosition: 'left',
        items: ['Gráficos de barras', 'Categorización mensual', 'Balance en tiempo real'],
      },
    ] satisfies InfoSection[],
    checklist: {
      title: 'Todo lo que necesitas',
      body: 'Sin saltar entre herramientas o hojas de cálculo.',
      items: ['Soporte multi-idioma', 'Atajos nativos', 'Sincronización segura', 'Categorías personalizadas'],
    },
    footer: {
      legalTitle: 'Legal',
      contactTitle: 'Contacto',
      downloadTitle: 'Descarga',
      rights: '© 2024 Menudo App. Todos los derechos reservados.',
    },
    privacyPolicy: {
      title: 'Privacidad de Menudo',
      intro: 'Nosotros también odiamos los textos legales largos. Aquí te explicamos de forma humana cómo cuidamos tu información.',
      sections: [
        { title: '1. Qué sabemos de ti', body: 'Solo lo necesario para que la app funcione.' },
        { title: '2. Tu dinero es tuyo', body: 'No vendemos tus datos a nadie.' },
      ]
    }
  },
  en: {
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Privacy', href: '/privacy-policy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Support', href: '/support' },
    ] satisfies NavItem[],
    hero: {
      eyebrow: 'Menudo App',
      title: 'See your spending clearly. Effortlessly.',
      body: 'Type, speak, or automate: Menudo organizes your finances so you don’t have to think about it.',
      chips: ['Free to try', 'Easy to use', 'Modern design'],
      primaryCta: 'Download now',
      secondaryCta: 'Learn more',
    },
    benefits: [
      {
        title: 'Frictionless Logging',
        body: 'Type a note, speak naturally, or let automations do it for you.',
        image: '/Gemini_Generated_Image_i689bii689bii689.png',
      },
      {
        title: 'Build the habit',
        body: 'When tracking takes seconds, you actually do it. Consistency becomes natural.',
        image: '/Gemini_Generated_Image_f7axcpf7axcpf7ax.png',
      },
      {
        title: 'See the full picture',
        body: 'Understand your patterns with automatic charts that tell you the truth about your money.',
        image: '/Gemini_Generated_Image_xvlbkjxvlbkjxvlb.png',
      },
    ] satisfies BenefitCard[],
    infoSections: [
      {
        eyebrow: 'Automation',
        title: 'Pay with Apple Pay. Log automatically.',
        body: 'Every time you tap to pay, Menudo automatically logs your expense via iOS Shortcuts.',
        image: '/placeholders/feature-home.svg',
        imagePosition: 'right',
        items: ['Instant post-payment', 'Zero effort tracking', 'Works with Apple Shortcuts™'],
      },
      {
        eyebrow: 'Detailed Reports',
        title: 'Your finances, told with charts.',
        body: 'Visualize where every cent goes with automatic reports generated by your backend.',
        image: '/Gemini_Generated_Image_a3ycc6a3ycc6a3yc.png',
        imagePosition: 'left',
        items: ['Bar charts', 'Monthly categorization', 'Real-time balance'],
      },
    ] satisfies InfoSection[],
    checklist: {
      title: 'Everything you need',
      body: 'No jumping between tools or spreadsheets.',
      items: ['Multi-language support', 'Native Shortcuts', 'Secure sync', 'Custom categories'],
    },
    footer: {
      legalTitle: 'Legal',
      contactTitle: 'Contact',
      downloadTitle: 'Download',
      rights: '© 2024 Menudo App. All rights reserved.',
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      intro: 'We hate long legal texts too. Here is a human explanation of how we protect your data.',
      sections: [
        { title: '1. What we know', body: 'Only what is necessary for the app to work.' },
        { title: '2. Your money is yours', body: 'We do not sell your data to anyone.' },
      ]
    }
  }
} as const;

export const pageMetadata = {
  es: {
    '/': { title: 'Menudo — Finanzas Claros', description: 'Toma el control de tu dinero.' },
    '/privacy-policy': { title: 'Privacidad', description: 'Cómo protegemos tus datos.' },
    '/terms': { title: 'Términos', description: 'Condiciones de uso.' },
    '/support': { title: 'Soporte', description: 'Ayuda con Menudo.' },
    '/privacy-choices': { title: 'Opciones de Privacidad', description: 'Gestiona tus datos.' },
    '/auth/confirm': { title: 'Correo verificado', description: 'Confirmación de cuenta en Menudo.' },
    '/auth/reset-password': { title: 'Nueva contraseña', description: 'Cambia tu contraseña de Menudo.' },
  },
  en: {
    '/': { title: 'Menudo — Clear Finance', description: 'Take control of your money.' },
    '/privacy-policy': { title: 'Privacy', description: 'How we protect your data.' },
    '/terms': { title: 'Terms', description: 'Terms of service.' },
    '/support': { title: 'Support', description: 'Help with Menudo.' },
    '/privacy-choices': { title: 'Privacy Choices', description: 'Manage your data.' },
    '/auth/confirm': { title: 'Email verified', description: 'Account confirmation for Menudo.' },
    '/auth/reset-password': { title: 'New password', description: 'Change your Menudo password.' },
  }
};
