export type RouteKey =
  | '/'
  | '/privacy-policy'
  | '/terms'
  | '/support'
  | '/privacy-choices'
  | '/auth/confirm'
  | '/auth/reset-password'
  | '/invitations/join';

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
      title: 'Política de Privacidad',
      intro: 'Valoramos su privacidad. A continuación detallamos de forma clara y transparente cómo tratamos y protegemos la información personal en Menudo.',
      sections: [
        {
          title: '1. Responsable del Tratamiento',
          body: 'Menudo App es desarrollada y operada por Garauyan, con domicilio en la República Dominicana. Nos comprometemos a proteger su privacidad y a tratar sus datos personales de conformidad con los más altos estándares de transparencia y seguridad. Para cualquier consulta sobre este documento, puede contactarnos en: info@garauyan.resend.app.'
        },
        {
          title: '2. Información que Recopilamos',
          body: 'Para ofrecer nuestro servicio de control de gastos personales y compartidos, procesamos:\n• Datos de Cuenta: Correo electrónico, ID único de usuario, nombre de perfil y foto de perfil opcional proporcionados al registrarse.\n• Datos Financieros: Detalles de las transacciones que registra de manera manual o automatizada (monto, concepto/descripción, categoría, fecha, moneda e identificador de idempotencia).\n• Datos de Colaboración: Correos electrónicos de los usuarios que invita a sus listas compartidas de gastos.'
        },
        {
          title: '3. Procesamiento de IA y Categorización',
          body: 'Cuando registra una transacción por voz, texto o atajo, la descripción del gasto junto con el catálogo de sus categorías personalizadas se procesa utilizando los procesadores LPU de Groq y el modelo Llama 3 para categorizar el gasto de forma automática. No enviamos datos personales que puedan identificarlo directamente (como su nombre o correo) a los servicios de IA de Groq.'
        },
        {
          title: '4. Proveedores y Almacenamiento',
          body: 'Sus datos se guardan y procesan utilizando proveedores tecnológicos líderes de la industria:\n• Supabase: Infraestructura de base de datos cifrada, autenticación de usuarios y almacenamiento en la nube.\n• RevenueCat y Apple App Store: Gestión segura del estado de suscripción y facturación premium. Nosotros no almacenamos detalles de sus tarjetas de crédito o débito.\n• Apple APNs: Envío de notificaciones push en tiempo real sobre la actividad en listas compartidas.'
        },
        {
          title: '5. Retención de Datos y Seguridad',
          body: '• Idempotencia Extrema: Cada transacción incluye un "idempotency_key" único generado por la app. Si la red falla y se envía el gasto varias veces, el backend previene cobros duplicados en su presupuesto.\n• Retención: Conservamos sus datos únicamente mientras su cuenta esté activa. Si decide eliminar su cuenta desde los ajustes de la aplicación, toda su información personal y de transacciones asociadas será eliminada de forma permanente e inmediata de nuestras bases de datos activas.'
        },
        {
          title: '6. Sus Derechos y Ley Aplicable',
          body: 'Usted tiene el derecho de acceder, rectificar, exportar o solicitar la eliminación total de sus datos en cualquier momento. Al ser operado por Garauyan, este acuerdo se rige por las leyes de la República Dominicana, ofreciendo además mecanismos de control global para cumplir con el estándar GDPR de protección de datos.'
        }
      ]
    },
    terms: {
      title: 'Términos y Condiciones de Uso',
      intro: 'Por favor, lea atentamente estos términos antes de usar Menudo App. Regulan el acceso y uso de la aplicación y de nuestros servicios asociados.',
      sections: [
        {
          title: '1. Aceptación de las Condiciones',
          body: 'Al descargar, instalar o utilizar Menudo App, usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar la aplicación ni nuestros servicios web.'
        },
        {
          title: '2. Registro de Cuenta y Uso de Pruebas',
          body: 'Para utilizar la aplicación, es necesario registrarse mediante un método de autenticación admitido. El usuario se compromete a proporcionar información verídica y a mantener la confidencialidad de sus credenciales. Queda estrictamente prohibido el uso no autorizado de cuentas ajenas.'
        },
        {
          title: '3. Sincronización Fuera de Línea y Conflictos',
          body: 'Menudo está diseñado con una arquitectura "Offline-First". Sus datos se guardan localmente en SQLite y se sincronizan con la nube cuando tiene conexión. En caso de conflicto de edición sobre presupuestos o categorías (por ejemplo, cambios simultáneos sin conexión), la base de datos aplicará la regla "La última escritura gana" (Last Write Wins) en base al timestamp UTC ajustado para resolver el conflicto de forma definitiva.'
        },
        {
          title: '4. Planes y Facturación',
          body: 'Ofrecemos suscripciones premium para desbloquear funciones avanzadas. Las transacciones financieras y la facturación son procesadas en su totalidad por Apple App Store a través del servicio RevenueCat. Las políticas de renovación, cancelación y reembolso se rigen de acuerdo con los términos de la App Store de Apple.'
        },
        {
          title: '5. Uso Aceptable y Automatizaciones',
          body: 'Usted se compromete a no utilizar la aplicación para actividades fraudulentas o ilícitas. La integración con Atajos de Siri y Apple Pay para automatizar registros debe ser configurada localmente en su dispositivo y es responsabilidad exclusiva del usuario cumplir con las normas de seguridad del sistema operativo.'
        },
        {
          title: '6. Limitación de Responsabilidad y Jurisdicción',
          body: 'La aplicación se proporciona "tal cual" sin garantías de ningún tipo. Garauyan no será responsable de pérdidas financieras derivadas del uso del estimador de presupuestos o fallos de red. Estos términos se rigen por las leyes de la República Dominicana, y cualquier disputa será sometida a la jurisdicción exclusiva de sus tribunales.'
        }
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
      intro: 'We value your privacy. Below is a clear and transparent explanation of how we handle and protect your personal information in Menudo.',
      sections: [
        {
          title: '1. Data Controller',
          body: 'Menudo App is developed and operated by Garauyan, based in the Dominican Republic. We are committed to protecting your privacy and treating your personal data in accordance with the highest standards of transparency and security. For any inquiries regarding this policy, please contact us at: info@garauyan.resend.app.'
        },
        {
          title: '2. Information We Collect',
          body: 'To provide our personal and shared expense tracking features, we process:\n• Account Data: Email, unique user ID, profile name, and optional profile picture provided during registration.\n• Financial Data: Transaction details you log manually or automatically (amount, concept/description, category, date, currency, and uniqueness/idempotency keys).\n• Collaboration Data: Emails of users you invite to your shared expense lists.'
        },
        {
          title: '3. AI Processing and Categorization',
          body: 'When you log a transaction via voice, text, or Siri Shortcut, the expense description and your custom category list are processed using Groq\'s LPU hardware and the Llama 3 model to automatically categorize the entry. We do not transmit personally identifiable information (such as your name or email) to Groq\'s AI services.'
        },
        {
          title: '4. Providers and Storage',
          body: 'Your data is stored and processed securely using industry-leading technology providers:\n• Supabase: For secure, encrypted database hosting, user authentication, and cloud storage.\n• RevenueCat & Apple App Store: For secure management of premium subscription status and billing. We never store or handle your credit/debit card details.\n• Apple APNs: For sending clean, real-time push notifications regarding collaborative list activities.'
        },
        {
          title: '5. Data Retention and Security',
          body: '• Extreme Idempotency: Every transaction contains a unique "idempotency_key" generated by the mobile client. If your connection drops and transmits multiple times, our backend prevents duplicate logs.\n• Retention: We keep your data only as long as your account remains active. If you choose to delete your account in the app settings, all your personal info and transaction history will be permanently and immediately deleted from our active databases.'
        },
        {
          title: '6. Your Rights and Governing Law',
          body: 'You retain the right to access, correct, export, or permanently delete your data at any time. Operated by Garauyan, this agreement is governed by the laws of the Dominican Republic, while incorporating global compliance standards (including GDPR rights) for all users.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      intro: 'Please read these terms carefully before using Menudo App. They govern your access to and use of the application and its associated services.',
      sections: [
        {
          title: '1. Agreement to Terms',
          body: 'By downloading, installing, or using Menudo App, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using the application and our web services.'
        },
        {
          title: '2. Accounts and Access',
          body: 'To use the application, you must register through our supported authentication methods. You agree to provide true and accurate information and maintain the security of your credentials. Unauthorized use of another user\'s account is strictly prohibited.'
        },
        {
          title: '3. Offline Sync and Conflicts',
          body: 'Menudo is built on an "Offline-First" architecture. Data is stored locally on SQLite and synced with the cloud. In case of conflicting edits on budgets or categories, the database resolves the dispute using the "Last Write Wins" (LWW) strategy based on server-synchronized UTC timestamps to determine the final state.'
        },
        {
          title: '4. Subscriptions and Billing',
          body: 'We offer premium subscription plans for advanced features. All billing, purchases, and subscriptions are managed exclusively through the Apple App Store and RevenueCat. Renewal, cancellation, and refund policies are subject to Apple\'s App Store terms and conditions.'
        },
        {
          title: '5. Acceptable Use and Shortcuts',
          body: 'You agree not to use the app for any fraudulent, abusive, or unlawful activities. The configuration of Siri Shortcuts and Apple Pay triggers for automatic expense logging is performed locally on your device, and you are solely responsible for compliance with iOS security guidelines.'
        },
        {
          title: '6. Limitation of Liability and Governing Law',
          body: 'The App is provided on an "as-is" basis without warranties of any kind. Garauyan shall not be liable for financial losses arising from budget estimate calculations or network outages. These Terms are governed by the laws of the Dominican Republic, and any disputes shall be resolved in its courts.'
        }
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
    '/invitations/join': { title: 'Invitación a lista compartida', description: 'Únete a una lista compartida en Menudo.' },
  },
  en: {
    '/': { title: 'Menudo — Clear Finance', description: 'Take control of your money.' },
    '/privacy-policy': { title: 'Privacy', description: 'How we protect your data.' },
    '/terms': { title: 'Terms', description: 'Terms of service.' },
    '/support': { title: 'Support', description: 'Help with Menudo.' },
    '/privacy-choices': { title: 'Privacy Choices', description: 'Manage your data.' },
    '/auth/confirm': { title: 'Email verified', description: 'Account confirmation for Menudo.' },
    '/auth/reset-password': { title: 'New password', description: 'Change your Menudo password.' },
    '/invitations/join': { title: 'Shared List Invitation', description: 'Join a shared list on Menudo.' },
  }
};
